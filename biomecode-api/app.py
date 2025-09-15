import os, json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import ee

load_dotenv()
SA_EMAIL   = os.getenv("EE_SA_EMAIL")
PROJECT_ID = os.getenv("EE_PROJECT_ID")
KEY_PATH   = os.getenv("EE_KEY_PATH")
CORS = os.getenv("CORS_ORIGINS", "*").split(",")

# EE init with service account
credentials = ee.ServiceAccountCredentials(SA_EMAIL, KEY_PATH)
ee.Initialize(credentials, project=PROJECT_ID)

app = FastAPI(title="BiomeCode API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS, allow_methods=["*"], allow_headers=["*"]
)

BANDS = [f"A{i:02d}" for i in range(64)]
EMBED_IC = "GOOGLE/SATELLITE_EMBEDDING/V1/ANNUAL"

def to_geom(body_geom):
    return ee.Geometry(body_geom if "type" in body_geom else body_geom["geometry"])

def load_year_image(year, geom):
    ic = ee.ImageCollection(EMBED_IC).filter(ee.Filter.calendarRange(year, year, 'year'))
    return ic.first().clip(geom).select(BANDS)

@app.get("/health")
def health():
    return {"ok": True, "ee": ee.Number(1).getInfo()}

@app.post("/kpi/change")
def kpi_change(body: dict):
    """ body: { geom, year_from, year_to, scale? } """
    geom = to_geom(body["geom"])
    y1, y2 = int(body["year_from"]), int(body["year_to"])
    scale = int(body.get("scale", 20))
    im1, im2 = load_year_image(y1, geom), load_year_image(y2, geom)
    cos_sim = im1.multiply(im2).reduce(ee.Reducer.sum()).rename("cosine_similarity")
    change  = cos_sim.multiply(-1).add(1).rename("change_severity")
    mean_change = change.reduceRegion(ee.Reducer.mean(), geom, scale=scale, maxPixels=1e13).get("change_severity")
    return {"kpi":"change_severity_mean","year_from":y1,"year_to":y2,"value":ee.Number(mean_change).getInfo()}

@app.post("/tiles/change")
def tiles_change(body: dict):
    """ body: { geom, year_from, year_to } returns {tileUrl} """
    geom = to_geom(body["geom"])
    y1, y2 = int(body["year_from"]), int(body["year_to"])
    im1, im2 = load_year_image(y1, geom), load_year_image(y2, geom)
    cos_sim = im1.multiply(im2).reduce(ee.Reducer.sum())
    change  = cos_sim.multiply(-1).add(1).visualize(min=0, max=1)
    m = change.updateMask(ee.Image(1)).getMapId()
    return {"tileUrl": f"https://earthengine.googleapis.com/map/{m['mapid']}/{{z}}/{{x}}/{{y}}?token={m['token']}"}

# --- Land cover (simple 5-class RF; expects you to add samples later) ---
# classes: 1 forest, 2 cropland, 3 urban, 4 other_veg, 5 water
@app.post("/kpi/landcover")
def kpi_landcover(body: dict):
    """
    body: { geom, year, scale?, training_asset? }
    If training_asset absent, returns 501 with instructions to add samples.
    """
    geom = to_geom(body["geom"])
    year = int(body["year"])
    scale = int(body.get("scale", 20))
    training_asset = body.get("training_asset")  # ee.FeatureCollection asset id

    if not training_asset:
        return {"status":501,"message":"Provide 'training_asset' (EE FeatureCollection) with columns: landcover, A00..A63. Use im.sampleRegions to create."}

    im = load_year_image(year, geom)
    training = ee.FeatureCollection(training_asset)
    classifier = ee.Classifier.smileRandomForest(100).train(
        features=training, classProperty='landcover', inputProperties=BANDS)
    classified = im.classify(classifier).clip(geom)

    areaHa = ee.Image.pixelArea().divide(1e4).addBands(classified.rename('lc'))
    groups = areaHa.reduceRegion(
        reducer=ee.Reducer.sum().group(groupField=1, groupName='lc'),
        geometry=geom, scale=scale, maxPixels=1e13
    ).get('groups')
    return {"year":year, "areas": ee.List(groups).getInfo()}

# --- Climate KPI (ERA5-Land monthly aggregates) ---
@app.post("/kpi/climate")
def kpi_climate(body: dict):
    """
    body: { geom, year, variables? }
    variables default: t2m, tp, u10, v10
    Returns annual means (or sums for precipitation).
    """
    geom = to_geom(body["geom"])
    year = int(body["year"])
    vars = body.get("variables", ["t2m","tp","u10","v10"])

    era = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY").filterDate(f"{year}-01-01", f"{year+1}-01-01").select(vars)
    # t2m is in Kelvin; convert to C for readability
    def fix(img):
        bands = img.bandNames()
        img2 = ee.Image().select()
        for b in bands.getInfo():
            band = img.select(b)
            if b == "t2m":
                band = band.subtract(273.15).rename(b)
            img2 = img2.addBands(band)
        return img2
    era = era.map(fix)

    # annual means; tp (precip) as sum (m) -> mm
    mean_img = era.mean()
    sum_img  = era.select(["tp"]).sum().multiply(1000).rename("tp")  # mm
    out = mean_img.addBands(sum_img)

    stats = out.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geom, scale=1000, maxPixels=1e13
    )
    return {"year":year, "units":{"t2m":"°C","tp":"mm","u10":"m/s","v10":"m/s"}, "values": stats.getInfo()}

# --- Soil KPI (SoilGrids 250m) ---
@app.post("/kpi/soil")
def kpi_soil(body: dict):
    """
    body: { geom, variables? }
    variables default: clay/silt/sand fractions at topsoil (0-5cm).
    """
    geom = to_geom(body["geom"])
    vars = body.get("variables", ["clay","silt","sand"])
    # SoilGrids: fractions in ‰ (permille). Convert to %
    sg = ee.Image("ISRIC/SoilGrids/2021").select([
        "clay_0-5cm_mean","silt_0-5cm_mean","sand_0-5cm_mean"
    ])
    sg_pct = sg.divide(10).rename(["clay","silt","sand"])  # permille->%
    stats = sg_pct.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geom, scale=250, maxPixels=1e13
    )
    return {"depth":"0-5cm","units":"%","values": stats.getInfo()}

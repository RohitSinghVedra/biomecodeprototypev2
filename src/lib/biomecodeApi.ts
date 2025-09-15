const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function changeKPI(geom: any, y1: number, y2: number) {
  const r = await fetch(`${BASE}/kpi/change`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ geom, year_from: y1, year_to: y2 })});
  if (!r.ok) throw new Error("changeKPI failed"); return r.json();
}

export async function changeTiles(geom: any, y1: number, y2: number) {
  const r = await fetch(`${BASE}/tiles/change`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ geom, year_from: y1, year_to: y2 })});
  if (!r.ok) throw new Error("changeTiles failed"); return r.json() as Promise<{tileUrl:string}>;
}

export async function climateKPI(geom: any, year: number) {
  const r = await fetch(`${BASE}/kpi/climate`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ geom, year })});
  if (!r.ok) throw new Error("climateKPI failed"); return r.json();
}

export async function soilKPI(geom: any) {
  const r = await fetch(`${BASE}/kpi/soil`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ geom })});
  if (!r.ok) throw new Error("soilKPI failed"); return r.json();
}

export async function landcoverAreas(geom: any, year: number, trainingAsset: string) {
  const r = await fetch(`${BASE}/kpi/landcover`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ geom, year, training_asset: trainingAsset })});
  return r.json();
}

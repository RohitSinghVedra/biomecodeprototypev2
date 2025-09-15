// Region data types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Region {
  id: string;
  name: string;
  type: 'circle' | 'polygon';
  center: Coordinates;
  radius?: number;
  coordinates?: Coordinates[];
  area: number;
  boundingBox: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

// Climate data types
export interface TemperatureData {
  current: {
    min: number;
    max: number;
    avg: number;
  };
  monthly: {
    month: string;
    avg: number;
  }[];
  yearly: {
    year: number;
    avg: number;
  };
}

export interface RainfallData {
  monthly: {
    month: string;
    amount: number;
  }[];
  currentMonth: {
    avg: number;
  };
  annual: {
    total: number;
  };
}

export interface CloudCoverageData {
  current: number;
  monthly: {
    month: string;
    coverage: number;
  }[];
  annual: {
    avg: number;
  };
}

export interface SunlightData {
  current: number;
  monthly: {
    month: string;
    hours: number;
    intensity: number;
  }[];
  annual: {
    avgHours: number;
    totalHours: number;
    avgIntensity: number;
  };
}

export interface ClimateData {
  temperature: TemperatureData;
  rainfall: RainfallData;
  uvIndex: {
    current: number;
    monthly: number;
  };
  humidity: number;
  windSpeed: number;
  solarRadiation: number;
  evapotranspiration: number;
  cloudCoverage: CloudCoverageData;
  sunlight: SunlightData;
}

export interface LandCoverData {
  forest: number;
  shrubland: number;
  cropland: number;
  urban: number;
  bareland: number;
  water: number;
  wetlands: number;
}

export interface SoilData {
  ph: number;
  clay: number;
  sand: number;
  nitrogen: number;
  organicCarbon: number;
  cec: number;
  bulkDensity: number;
  type: string;
  nutrientIndex: 'Low' | 'Medium' | 'High';
}

export interface WaterQuality {
  ph: number;
  tds: number;
  turbidity: number;
  dissolvedOxygen: number;
}

export interface SeasonalVariation {
  drySeasonLength: number;
  monthlyVariation: number;
}

export interface AnnualWaterPotential {
  rainfall: number;
  groundwater: number;
  surfaceWater: number;
}

export interface WaterAccessData {
  distanceToSurfaceWater: number;
  groundwaterDepth: number;
  rainfallClassification: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  recommendedWaterMethod: 'Rainfed' | 'Drip' | 'Greywater' | 'Mixed';
  evapotranspirationRate: number;
  accessRating: 'Low' | 'Medium' | 'High';
  annualWaterPotential: AnnualWaterPotential;
  waterQuality: WaterQuality;
  seasonalVariation: SeasonalVariation;
}

export type GreenProjectType = 'Agroforestry' | 'Native Rewilding' | 'Syntropic Forest' | 'Landscaping';

export interface PlantSpecies {
  name: string;
  scientific: string;
  type: string;
  waterNeed: 'Low' | 'Medium' | 'High';
  sunNeed: 'Low' | 'Medium' | 'High';
  soilTypes: string[];
  description: string;
  benefits: string[];
}

export interface SustainabilityMilestone {
  month: number;
  description: string;
  indicators: string[];
}

export interface HumanAssistance {
  taskType: string;
  hoursPerWeek: number;
  skillLevel: string;
  automationPotential: number;
}

export interface Phase {
  number: number;
  name: string;
  duration: number;
  objectives: string[];
  humanAssistance: HumanAssistance[];
  risks: string[];
  mitigations: string[];
  sustainabilityMilestones: SustainabilityMilestone[];
}

export interface Transition {
  fromPhase: number;
  toPhase: number;
  estimatedTiming: number;
  criteria: string[];
}

export interface ImplementationRoadmap {
  phases: Phase[];
  transitions: Transition[];
}

export interface SimulationSetup {
  projectType: GreenProjectType;
  implementationRoadmap?: ImplementationRoadmap;
  plantMix?: string[];
  treesPerHectare?: number;
  duration?: number;
  waterMethod?: string;
  interventionType?: string;
  speciesDensity?: string;
  waterResources?: WaterResourcePlan;
}

export interface RegionDataObject {
  region: Region;
  climate: ClimateData;
  landCover: LandCoverData;
  soil: SoilData;
  waterAccess: WaterAccessData;
  simulationSetup?: SimulationSetup;
}
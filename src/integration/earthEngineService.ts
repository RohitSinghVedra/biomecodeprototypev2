import { Region, ClimateData, LandCoverData, SoilData } from '../types';

// Track Earth Engine initialization status
let isEarthEngineInitialized = false;

// Initialize Earth Engine - Browser-compatible version
const initializeEarthEngine = async () => {
  try {
    // For browser environments, we'll use a different approach
    // Private key authentication is not allowed in browsers for security reasons
    console.log('Earth Engine browser mode: Using fallback data system');
    isEarthEngineInitialized = false;
    return false;
  } catch (error) {
    console.warn('Earth Engine initialization failed, using fallback mode:', error);
    isEarthEngineInitialized = false;
    return false;
  }
};

// Get climate data - Enhanced fallback system
export const getClimateData = async (region: Region): Promise<ClimateData> => {
  try {
    console.log('Generating climate data for region:', region.name);
    return generateFallbackClimateData(region);
  } catch (error) {
    console.error('Error generating climate data:', error);
    return generateFallbackClimateData(region);
  }
};

// Get land cover data - Enhanced fallback system
export const getLandCoverData = async (region: Region): Promise<LandCoverData> => {
  try {
    console.log('Generating land cover data for region:', region.name);
    return generateFallbackLandCoverData(region);
  } catch (error) {
    console.error('Error generating land cover data:', error);
    return generateFallbackLandCoverData(region);
  }
};

// Get soil data - Enhanced fallback system
export const getSoilData = async (region: Region): Promise<SoilData> => {
  try {
    console.log('Generating soil data for region:', region.name);
    return generateFallbackSoilData(region);
  } catch (error) {
    console.error('Error generating soil data:', error);
    return generateFallbackSoilData(region);
  }
};

// Fallback data generation functions
const generateFallbackClimateData = (region: Region): ClimateData => {
  const baseTemp = 20 + Math.sin(region.center.lat * Math.PI / 180) * 15; // Latitude-based temperature
  const basePrecip = 800 + Math.sin(region.center.lat * Math.PI / 180) * 400; // Latitude-based precipitation
  
  return {
    temperature: {
      current: {
        min: baseTemp - 10,
        max: baseTemp + 10,
        avg: baseTemp
      },
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2023, i).toLocaleString('default', { month: 'long' }),
        avg: baseTemp + Math.sin((i - 6) * Math.PI / 6) * 8
      })),
      yearly: {
        year: 2023,
        avg: baseTemp
      }
    },
    rainfall: {
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2023, i).toLocaleString('default', { month: 'long' }),
        amount: basePrecip / 12 + Math.sin((i - 6) * Math.PI / 6) * 50
      })),
      currentMonth: {
        avg: basePrecip / 12
      },
      annual: {
        total: basePrecip
      }
    },
    uvIndex: {
      current: 5,
      monthly: 5
    },
    humidity: 65,
    windSpeed: 3.5,
    solarRadiation: 200,
    evapotranspiration: 100,
    cloudCoverage: {
      current: 45,
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2023, i).toLocaleString('default', { month: 'long' }),
        coverage: 45 + Math.sin((i - 6) * Math.PI / 6) * 20
      })),
      annual: {
        avg: 45
      }
    },
    sunlight: {
      current: 8,
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2023, i).toLocaleString('default', { month: 'long' }),
        hours: 8 + Math.sin((i - 6) * Math.PI / 6) * 4,
        intensity: 200 + Math.sin((i - 6) * Math.PI / 6) * 100
      })),
      annual: {
        avgHours: 8,
        totalHours: 2920,
        avgIntensity: 200
      }
    }
  };
};

const generateFallbackLandCoverData = (region: Region): LandCoverData => {
  // Generate realistic land cover based on region characteristics
  const lat = region.center.lat;
  const area = region.area;
  
  // Simple latitude-based land cover distribution
  let forest = 0, cropland = 0, urban = 0, water = 0, bareland = 0, shrubland = 0, wetlands = 0;
  
  if (lat > 60 || lat < -60) {
    // Polar regions
    forest = 20;
    bareland = 60;
    water = 15;
    shrubland = 5;
  } else if (lat > 30 || lat < -30) {
    // Temperate regions
    forest = 40;
    cropland = 25;
    urban = 10;
    water = 10;
    shrubland = 10;
    wetlands = 5;
  } else {
    // Tropical regions
    forest = 60;
    cropland = 15;
    urban = 5;
    water = 10;
    shrubland = 5;
    wetlands = 5;
  }
  
  return {
    forest,
    shrubland,
    cropland,
    urban,
    bareland,
    water,
    wetlands
  };
};

const generateFallbackSoilData = (region: Region): SoilData => {
  const lat = region.center.lat;
  
  // Generate soil properties based on latitude and region characteristics
  let ph = 6.5, clay = 25, sand = 45, carbon = 2.5;
  
  if (lat > 50 || lat < -50) {
    // Cold regions - more acidic, less organic matter
    ph = 5.5;
    clay = 30;
    sand = 40;
    carbon = 1.5;
  } else if (lat > 20 && lat < 50) {
    // Temperate regions - balanced
    ph = 6.5;
    clay = 25;
    sand = 45;
    carbon = 2.5;
  } else {
    // Tropical regions - more clay, higher organic matter
    ph = 7.0;
    clay = 40;
    sand = 35;
    carbon = 3.5;
  }
  
  const silt = 100 - clay - sand;
  const nitrogen = carbon * 0.1;
  const cec = clay * 0.5 + silt * 0.2;
  const bulkDensity = 1.3 - (clay * 0.01);
  
  let soilType = 'Loam';
  if (clay > 40) soilType = 'Clay';
  else if (sand > 70) soilType = 'Sandy';
  else if (clay < 10 && sand > 50) soilType = 'Sandy Loam';
  
  let nutrientIndex: 'Low' | 'Medium' | 'High' = 'Medium';
  if (carbon < 1.5) nutrientIndex = 'Low';
  else if (carbon > 3.5) nutrientIndex = 'High';
  
  return {
    ph,
    clay,
    sand,
    nitrogen,
    organicCarbon: carbon,
    cec,
    bulkDensity,
    type: soilType,
    nutrientIndex
  };
};

// Initialize Earth Engine when the module is imported
initializeEarthEngine();

export { initializeEarthEngine };

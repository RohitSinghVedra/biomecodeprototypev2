import { WaterAccessData, ClimateData } from '../../types';

export const generateWaterAccessData = (climate: ClimateData): WaterAccessData => {
  const annualRainfall = climate.rainfall.annual.total;
  
  let rainfallClassification: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  if (annualRainfall < 250) rainfallClassification = 'Very Low';
  else if (annualRainfall < 500) rainfallClassification = 'Low';
  else if (annualRainfall < 1000) rainfallClassification = 'Medium';
  else if (annualRainfall < 2000) rainfallClassification = 'High';
  else rainfallClassification = 'Very High';
  
  let recommendedWaterMethod: 'Rainfed' | 'Drip' | 'Greywater' | 'Mixed';
  if (rainfallClassification === 'Very Low') recommendedWaterMethod = 'Drip';
  else if (rainfallClassification === 'Low') recommendedWaterMethod = 'Mixed';
  else if (rainfallClassification === 'Medium') recommendedWaterMethod = 'Mixed';
  else recommendedWaterMethod = 'Rainfed';
  
  let accessRating: 'Low' | 'Medium' | 'High';
  if (rainfallClassification === 'Very Low') accessRating = 'Low';
  else if (rainfallClassification === 'Low') accessRating = 'Low';
  else if (rainfallClassification === 'Medium') accessRating = 'Medium';
  else accessRating = 'High';
  
  return {
    distanceToSurfaceWater: 5,
    groundwaterDepth: 30,
    rainfallClassification,
    recommendedWaterMethod,
    evapotranspirationRate: climate.evapotranspiration,
    accessRating,
    annualWaterPotential: {
      rainfall: annualRainfall * 10,
      groundwater: 3000,
      surfaceWater: 2000,
    },
    waterQuality: {
      ph: 7.2,
      tds: 250,
      turbidity: 5,
      dissolvedOxygen: 8.5,
    },
    seasonalVariation: {
      drySeasonLength: 4,
      monthlyVariation: 30,
    },
  };
};
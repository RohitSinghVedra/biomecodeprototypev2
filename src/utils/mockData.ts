import { Region, RegionDataObject } from '../types';
import { mockRegions } from './mockData/regions';
import { generateClimateData } from './mockData/climate';
import { generateLandCoverData } from './mockData/landCover';
import { generateSoilData } from './mockData/soil';
import { generateWaterAccessData } from './mockData/water';
import { generateRoadmapData } from './mockData/roadmap';

export { mockRegions };

export const generateMockRegionData = (region: Region): RegionDataObject => {
  const climate = generateClimateData(region.id);
  const landCover = generateLandCoverData(region.id);
  const soil = generateSoilData(region.id);
  const waterAccess = generateWaterAccessData(climate);
  const implementationRoadmap = generateRoadmapData(region.id);

  return {
    region,
    climate,
    landCover,
    soil,
    waterAccess,
    simulationSetup: {
      projectType: 'Agroforestry',
      implementationRoadmap
    }
  };
};
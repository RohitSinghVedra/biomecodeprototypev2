import { Region, RegionDataObject } from '../../types';
import { mockRegions } from './regions';
import { generateClimateData } from './climate';
import { generateLandCoverData } from './landCover';
import { generateSoilData } from './soil';
import { generateWaterAccessData } from './water';
import { generateRoadmapData } from './roadmap';

export { mockRegions };

export const generateMockRegionData = (region: Region): RegionDataObject => {
  // Ensure we're using the correct region ID
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
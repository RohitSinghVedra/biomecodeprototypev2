import { LandCoverData } from '../../types';

export const generateLandCoverData = (regionId: string): LandCoverData => {
  switch (regionId) {
    case 'amazon':
      return {
        forest: 75,
        shrubland: 10,
        cropland: 5,
        urban: 2,
        bareland: 1,
        water: 5,
        wetlands: 2,
      };
    case 'sahara':
      return {
        forest: 0.1,
        shrubland: 3.9,
        cropland: 0.5,
        urban: 0.5,
        bareland: 92,
        water: 0.5,
        wetlands: 2.5,
      };
    case 'great-plains':
      return {
        forest: 15,
        shrubland: 20,
        cropland: 45,
        urban: 5,
        bareland: 10,
        water: 3,
        wetlands: 2,
      };
    default:
      return generateLandCoverData('great-plains');
  }
};
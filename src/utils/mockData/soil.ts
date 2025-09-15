import { SoilData } from '../../types';

export const generateSoilData = (regionId: string): SoilData => {
  switch (regionId) {
    case 'amazon':
      return {
        ph: 5.5,
        clay: 30,
        sand: 40,
        nitrogen: 0.3,
        organicCarbon: 3.5,
        cec: 25,
        bulkDensity: 1.2,
        type: 'Clay-Loam',
        nutrientIndex: 'High',
      };
    case 'sahara':
      return {
        ph: 8.2,
        clay: 10,
        sand: 85,
        nitrogen: 0.02,
        organicCarbon: 0.15,
        cec: 8,
        bulkDensity: 1.6,
        type: 'Sandy',
        nutrientIndex: 'Low',
      };
    case 'great-plains':
      return {
        ph: 6.8,
        clay: 25,
        sand: 35,
        nitrogen: 0.2,
        organicCarbon: 2.5,
        cec: 18,
        bulkDensity: 1.3,
        type: 'Loamy',
        nutrientIndex: 'Medium',
      };
    default:
      return generateSoilData('great-plains');
  }
};
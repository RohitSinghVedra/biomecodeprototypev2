import { Region } from '../../types';

export const mockRegions: Region[] = [
  {
    id: 'amazon',
    name: 'Amazon Rainforest',
    type: 'circle',
    center: { lat: -3.4653, lng: -62.2159 },
    radius: 500,
    area: 785398,
    boundingBox: {
      minLat: -8.4653,
      maxLat: 1.5347,
      minLng: -67.2159,
      maxLng: -57.2159
    }
  },
  {
    id: 'sahara',
    name: 'Sahara Desert',
    type: 'circle',
    center: { lat: 23.4162, lng: 25.6628 },
    radius: 300,
    area: 282743,
    boundingBox: {
      minLat: 20.4162,
      maxLat: 26.4162,
      minLng: 22.6628,
      maxLng: 28.6628
    }
  },
  {
    id: 'great-plains',
    name: 'Great Plains',
    type: 'circle',
    center: { lat: 41.5, lng: -99.5 },
    radius: 200,
    area: 125664,
    boundingBox: {
      minLat: 39.5,
      maxLat: 43.5,
      minLng: -101.5,
      maxLng: -97.5
    }
  }
];
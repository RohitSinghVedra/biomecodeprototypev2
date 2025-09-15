import { ClimateData } from '../../types';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const generateClimateData = (regionId: string): ClimateData => {
  switch (regionId) {
    case 'amazon':
      return {
        temperature: {
          current: {
            min: 23,
            max: 33,
            avg: 28,
          },
          monthly: months.map((month, i) => ({
            month,
            avg: 28 + Math.sin((i / 11) * Math.PI) * 2.5,
          })),
          yearly: {
            year: new Date().getFullYear(),
            avg: 28,
          },
        },
        rainfall: {
          monthly: months.map((month, i) => ({
            month,
            amount: 250 + Math.sin((i / 11) * Math.PI) * 150,
          })),
          currentMonth: {
            avg: 300,
          },
          annual: {
            total: 2800,
          },
        },
        uvIndex: {
          current: 11,
          monthly: 10,
        },
        humidity: 88,
        windSpeed: 2.5,
        solarRadiation: 4.8,
        evapotranspiration: 3.9,
        cloudCoverage: {
          current: 75,
          monthly: months.map((month, i) => ({
            month,
            coverage: 70 + Math.sin((i / 11) * Math.PI) * 15,
          })),
          annual: {
            avg: 75,
          },
        },
        sunlight: {
          current: 12,
          monthly: months.map((month, i) => ({
            month,
            hours: 12 + Math.sin((i / 11) * Math.PI) * 0.5,
            intensity: 4.8 + Math.sin((i / 11) * Math.PI) * 0.4,
          })),
          annual: {
            avgHours: 12,
            totalHours: 4380,
            avgIntensity: 4.8,
          },
        },
      };
    case 'sahara':
      return {
        temperature: {
          current: {
            min: 13,
            max: 47,
            avg: 30,
          },
          monthly: months.map((month, i) => ({
            month,
            avg: 30 + Math.sin((i / 11) * Math.PI) * 15,
          })),
          yearly: {
            year: new Date().getFullYear(),
            avg: 30,
          },
        },
        rainfall: {
          monthly: months.map((month) => ({
            month,
            amount: Math.random() * 2,
          })),
          currentMonth: {
            avg: 0.5,
          },
          annual: {
            total: 20,
          },
        },
        uvIndex: {
          current: 12,
          monthly: 11,
        },
        humidity: 25,
        windSpeed: 20,
        solarRadiation: 7.2,
        evapotranspiration: 6.5,
        cloudCoverage: {
          current: 10,
          monthly: months.map((month) => ({
            month,
            coverage: 5 + Math.random() * 10,
          })),
          annual: {
            avg: 10,
          },
        },
        sunlight: {
          current: 14,
          monthly: months.map((month, i) => ({
            month,
            hours: 14 + Math.sin((i / 11) * Math.PI),
            intensity: 7.2 + Math.sin((i / 11) * Math.PI) * 0.3,
          })),
          annual: {
            avgHours: 14,
            totalHours: 5110,
            avgIntensity: 7.2,
          },
        },
      };
    case 'great-plains':
      return {
        temperature: {
          current: {
            min: 5,
            max: 35,
            avg: 20,
          },
          monthly: months.map((month, i) => ({
            month,
            avg: 20 + Math.sin((i / 11) * Math.PI) * 15,
          })),
          yearly: {
            year: new Date().getFullYear(),
            avg: 20,
          },
        },
        rainfall: {
          monthly: months.map((month, i) => ({
            month,
            amount: 50 + Math.sin((i / 11) * Math.PI) * 30,
          })),
          currentMonth: {
            avg: 60,
          },
          annual: {
            total: 750,
          },
        },
        uvIndex: {
          current: 8,
          monthly: 7,
        },
        humidity: 45,
        windSpeed: 15,
        solarRadiation: 5.5,
        evapotranspiration: 4.5,
        cloudCoverage: {
          current: 40,
          monthly: months.map((month, i) => ({
            month,
            coverage: 40 + Math.sin((i / 11) * Math.PI) * 20,
          })),
          annual: {
            avg: 40,
          },
        },
        sunlight: {
          current: 13,
          monthly: months.map((month, i) => ({
            month,
            hours: 13 + Math.sin((i / 11) * Math.PI) * 2,
            intensity: 5.5 + Math.sin((i / 11) * Math.PI) * 0.5,
          })),
          annual: {
            avgHours: 13,
            totalHours: 4745,
            avgIntensity: 5.5,
          },
        },
      };
    default:
      return generateClimateData('great-plains');
  }
};
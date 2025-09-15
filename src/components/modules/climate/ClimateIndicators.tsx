import React from 'react';
import { Sun, Wind, Droplets, CloudRain, Cloud } from 'lucide-react';
import { ClimateData } from '../../../types';

interface ClimateIndicatorsProps {
  climateData: ClimateData;
}

const ClimateIndicators: React.FC<ClimateIndicatorsProps> = ({ climateData }) => {
  const indicators = [
    {
      icon: <Sun size={20} className="text-amber-500" />,
      name: 'UV Index',
      value: climateData?.uvIndex?.current?.toFixed(1) ?? 'N/A',
      info: `Monthly Avg: ${climateData?.uvIndex?.monthly?.toFixed(1) ?? 'N/A'}`,
    },
    {
      icon: <Droplets size={20} className="text-sky-500" />,
      name: 'Humidity',
      value: `${climateData?.humidity?.toFixed(0) ?? 'N/A'}%`,
      info: 'Relative Humidity',
    },
    {
      icon: <Wind size={20} className="text-sky-700" />,
      name: 'Wind Speed',
      value: `${climateData?.windSpeed?.toFixed(1) ?? 'N/A'} m/s`,
      info: 'Average',
    },
    {
      icon: <Sun size={20} className="text-amber-600" />,
      name: 'Solar Radiation',
      value: `${climateData?.solarRadiation?.toFixed(1) ?? 'N/A'} kWh/m²/day`,
      info: 'Daily Average',
    },
    {
      icon: <CloudRain size={20} className="text-sky-600" />,
      name: 'Evapotranspiration',
      value: `${climateData?.evapotranspiration?.toFixed(1) ?? 'N/A'} mm`,
      info: 'Daily Average',
    },
    {
      icon: <Cloud size={20} className="text-sky-400" />,
      name: 'Cloud Coverage',
      value: `${climateData?.cloudCoverage?.current?.toFixed(0) ?? 'N/A'}%`,
      info: `Annual Avg: ${climateData?.cloudCoverage?.annual?.avg?.toFixed(0) ?? 'N/A'}%`,
    },
    {
      icon: <Sun size={20} className="text-amber-500" />,
      name: 'Sunlight',
      value: `${climateData?.sunlight?.current?.toFixed(1) ?? 'N/A'} hrs`,
      info: `${climateData?.sunlight?.annual?.avgIntensity?.toFixed(1) ?? 'N/A'} kWh/m²/day avg intensity`,
    },
  ];
  
  return (
    <div className="space-y-4">
      {indicators.map((indicator, index) => (
        <div 
          key={index}
          className="flex items-center p-3 border border-sky-100 rounded-lg bg-gradient-to-r from-white to-sky-50"
        >
          <div className="p-2 bg-white rounded-md shadow-sm mr-3">
            {indicator.icon}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">{indicator.name}</div>
            <div className="text-lg font-semibold text-gray-900">{indicator.value}</div>
            <div className="text-xs text-gray-500">{indicator.info}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClimateIndicators;
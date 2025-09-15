import React from 'react';
import { LandCoverData } from '../../../types';
import { Trees, Mountain, Scaling as Seedling, Building, Waves, Droplets } from 'lucide-react';

interface LandCoverIndicatorsProps {
  landCoverData: LandCoverData;
}

const LandCoverIndicators: React.FC<LandCoverIndicatorsProps> = ({ landCoverData }) => {
  const indicators = [
    {
      icon: <Trees size={20} className="text-forest-600" />,
      name: 'Forest',
      value: `${landCoverData.forest}%`,
      color: 'bg-forest-600',
    },
    {
      icon: <Seedling size={20} className="text-forest-500" />,
      name: 'Shrubland',
      value: `${landCoverData.shrubland}%`,
      color: 'bg-forest-500',
    },
    {
      icon: <Seedling size={20} className="text-forest-400" />,
      name: 'Cropland',
      value: `${landCoverData.cropland}%`,
      color: 'bg-forest-400',
    },
    {
      icon: <Building size={20} className="text-earth-600" />,
      name: 'Urban',
      value: `${landCoverData.urban}%`,
      color: 'bg-earth-600',
    },
    {
      icon: <Mountain size={20} className="text-earth-400" />,
      name: 'Bare Land',
      value: `${landCoverData.bareland}%`,
      color: 'bg-earth-400',
    },
    {
      icon: <Waves size={20} className="text-sky-500" />,
      name: 'Water',
      value: `${landCoverData.water}%`,
      color: 'bg-sky-500',
    },
    {
      icon: <Droplets size={20} className="text-sky-400" />,
      name: 'Wetlands',
      value: `${landCoverData.wetlands}%`,
      color: 'bg-sky-400',
    },
  ];
  
  return (
    <div className="p-4 space-y-3">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center">
          <div className="p-1.5 bg-white rounded-md shadow-sm mr-3 border border-gray-100">
            {indicator.icon}
          </div>
          <div className="flex-grow">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{indicator.name}</span>
              <span className="text-sm font-medium text-gray-900">{indicator.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${indicator.color}`} 
                style={{ width: `${landCoverData[indicator.name.toLowerCase() as keyof LandCoverData]}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandCoverIndicators;
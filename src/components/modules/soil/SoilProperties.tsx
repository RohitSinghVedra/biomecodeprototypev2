import React from 'react';
import { SoilData } from '../../../types';

interface SoilPropertiesProps {
  soilData: SoilData;
}

const SoilProperties: React.FC<SoilPropertiesProps> = ({ soilData }) => {
  const properties = [
    {
      name: 'Nitrogen',
      value: soilData.nitrogen.toFixed(3),
      unit: '%',
      rating: soilData.nitrogen < 0.1 ? 'Low' : soilData.nitrogen < 0.3 ? 'Medium' : 'High',
    },
    {
      name: 'Organic Carbon',
      value: soilData.organicCarbon.toFixed(2),
      unit: '%',
      rating: soilData.organicCarbon < 1 ? 'Low' : soilData.organicCarbon < 3 ? 'Medium' : 'High',
    },
    {
      name: 'CEC',
      value: soilData.cec.toFixed(1),
      unit: 'cmol/kg',
      rating: soilData.cec < 10 ? 'Low' : soilData.cec < 20 ? 'Medium' : 'High',
    },
    {
      name: 'Bulk Density',
      value: soilData.bulkDensity.toFixed(2),
      unit: 'g/cm³',
      rating: soilData.bulkDensity > 1.6 ? 'High (Compacted)' : soilData.bulkDensity > 1.4 ? 'Medium' : 'Low (Porous)',
    },
  ];
  
  const getRatingColor = (rating: string): string => {
    if (rating.startsWith('Low')) return 'text-amber-600';
    if (rating.startsWith('Medium')) return 'text-forest-600';
    if (rating.startsWith('High')) {
      // For bulk density, high is bad
      if (rating.includes('Compacted')) return 'text-red-600';
      return 'text-sky-600';
    }
    return 'text-gray-600';
  };
  
  return (
    <div className="p-4 space-y-4">
      {properties.map((property, index) => (
        <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{property.name}</span>
            <span className="text-sm font-medium text-gray-900">{property.value} {property.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div 
              className={`h-2.5 rounded-full ${
                property.rating.startsWith('Low') ? 'bg-amber-500' :
                property.rating.startsWith('Medium') ? 'bg-forest-500' :
                property.name === 'Bulk Density' ? 'bg-red-500' : 'bg-sky-500'
              }`} 
              style={{ 
                width: property.rating.startsWith('Low') ? '33%' :
                       property.rating.startsWith('Medium') ? '66%' : '100%' 
              }}
            ></div>
          </div>
          <div className="text-xs font-medium text-right">
            Rating: <span className={getRatingColor(property.rating)}>{property.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoilProperties;
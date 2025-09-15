import React from 'react';
import { Bird, Flower2, Sprout } from 'lucide-react';
import { BiodiversityImpact as BiodiversityImpactType } from '../../../types';

interface BiodiversityImpactProps {
  biodiversityIndex: number;
  finalBiodiversity: BiodiversityImpactType;
}

const BiodiversityImpact: React.FC<BiodiversityImpactProps> = ({ biodiversityIndex, finalBiodiversity }) => {
  // Get color based on biodiversity index
  const getIndexColor = (index: number) => {
    if (index < 30) return 'text-amber-600';
    if (index < 60) return 'text-amber-500';
    if (index < 80) return 'text-forest-500';
    return 'text-forest-600';
  };
  
  // Get background color based on biodiversity index
  const getIndexBgColor = (index: number) => {
    if (index < 30) return 'bg-amber-100';
    if (index < 60) return 'bg-amber-50';
    if (index < 80) return 'bg-forest-50';
    return 'bg-forest-100';
  };
  
  // Get label based on biodiversity index
  const getIndexLabel = (index: number) => {
    if (index < 30) return 'Limited';
    if (index < 60) return 'Moderate';
    if (index < 80) return 'Good';
    return 'Excellent';
  };
  
  return (
    <div className="p-4">
      <div className={`p-4 rounded-lg ${getIndexBgColor(biodiversityIndex)} mb-4 text-center`}>
        <div className="text-sm text-gray-600 mb-1">Biodiversity Index</div>
        <div className={`text-3xl font-bold ${getIndexColor(biodiversityIndex)}`}>{biodiversityIndex.toFixed(0)}</div>
        <div className="text-xs text-gray-500 mt-1">{getIndexLabel(biodiversityIndex)} Biodiversity</div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
          <div 
            className={`h-2.5 rounded-full ${
              biodiversityIndex < 30 ? 'bg-amber-600' :
              biodiversityIndex < 60 ? 'bg-amber-500' :
              biodiversityIndex < 80 ? 'bg-forest-500' : 'bg-forest-600'
            }`} 
            style={{ width: `${biodiversityIndex}%` }}
          ></div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-forest-800 mb-3">Species Impact</h3>
      
      <div className="space-y-4">
        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
          <div className="p-2 bg-sky-100 rounded-md mr-3">
            <Bird size={20} className="text-sky-600" />
          </div>
          <div>
            <div className="font-medium">Bird Species</div>
            <div className="text-2xl font-bold text-sky-700">+{finalBiodiversity.birdSpecies}</div>
            <div className="text-xs text-gray-500">species supported</div>
          </div>
        </div>
        
        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
          <div className="p-2 bg-amber-100 rounded-md mr-3">
            <Flower2 size={20} className="text-amber-600" />
          </div>
          <div>
            <div className="font-medium">Pollinators</div>
            <div className="text-2xl font-bold text-amber-700">+{finalBiodiversity.pollinators}</div>
            <div className="text-xs text-gray-500">species supported</div>
          </div>
        </div>
        
        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
          <div className="p-2 bg-forest-100 rounded-md mr-3">
            <Sprout size={20} className="text-forest-600" />
          </div>
          <div>
            <div className="font-medium">Regrowth Species</div>
            <div className="text-2xl font-bold text-forest-700">+{finalBiodiversity.regrowthSpecies}</div>
            <div className="text-xs text-gray-500">native plants returning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodiversityImpact;
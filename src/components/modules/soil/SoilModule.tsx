import React from 'react';
import { DropletIcon, Pipette, Leaf, FlaskRound as Flask } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import InfoPanel from '../../common/InfoPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import SoilCompositionChart from './SoilCompositionChart';
import SoilProperties from './SoilProperties';

const SoilModule: React.FC = () => {
  const { selectedRegion, isLoading } = useRegion();
  
  if (isLoading) {
    return <LoadingSpinner text="Loading soil analysis data..." />;
  }
  
  if (!selectedRegion || !selectedRegion.soil) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please select a region first to view soil analysis data.</p>
      </div>
    );
  }
  
  const { soil, region } = selectedRegion;
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-earth-100 to-earth-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-earth-900 mb-2">Soil Analysis</h2>
        <p className="text-earth-800">{region.name} - Soil Composition</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoPanel
          title="Soil Type Classification"
          icon={<Pipette size={20} />}
          className="md:col-span-2"
        >
          <div className="p-4 bg-gradient-to-r from-earth-50 to-white rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-earth-200 rounded-lg bg-white shadow-sm">
                <div className="text-lg font-bold text-earth-800">{soil.type}</div>
                <div className="text-sm text-earth-600">Soil Type</div>
              </div>
              
              <div className="p-4 border border-earth-200 rounded-lg bg-white shadow-sm">
                <div className="text-lg font-bold text-earth-800">{soil.ph.toFixed(1)}</div>
                <div className="text-sm text-earth-600">Soil pH</div>
                <div className="text-xs text-earth-500 mt-1">
                  {soil.ph < 6.5 ? 'Acidic' : soil.ph > 7.5 ? 'Alkaline' : 'Neutral'}
                </div>
              </div>
              
              <div className="p-4 border border-earth-200 rounded-lg bg-white shadow-sm">
                <div className="text-lg font-bold text-earth-800">{soil.nutrientIndex}</div>
                <div className="text-sm text-earth-600">Nutrient Index</div>
                <div className="text-xs text-earth-500 mt-1">
                  Fertility Rating
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-earth-800 mb-3">Soil Suitability Assessment</h3>
              <div className="p-4 bg-white border border-earth-100 rounded-lg">
                <p className="text-gray-700">
                  This region has {soil.type.toLowerCase()} soil with a pH of {soil.ph.toFixed(1)}, making it 
                  {soil.ph < 5 ? ' quite acidic' : soil.ph < 6.5 ? ' somewhat acidic' : soil.ph > 7.5 ? ' somewhat alkaline' : ' neutral'}.
                  The soil has a {soil.nutrientIndex.toLowerCase()} nutrient index, indicating
                  {soil.nutrientIndex === 'Low' ? ' limited natural fertility' : soil.nutrientIndex === 'Medium' ? ' moderate fertility' : ' good fertility'}.
                </p>
                
                <p className="text-gray-700 mt-2">
                  Based on these characteristics, this soil is 
                  {soil.type === 'Sandy' ? ' well-draining but may require additional organic matter and moisture retention' : 
                    soil.type === 'Clay' ? ' moisture-retentive but may benefit from improved drainage and aeration' : 
                    soil.type === 'Clay-Loam' ? ' balanced with good moisture retention but may need some drainage improvement' : 
                    ' generally well-balanced with good characteristics for plant growth'}.
                </p>
                
                <div className="mt-3 flex space-x-2">
                  {soil.nutrientIndex === 'Low' && (
                    <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">Amendments Recommended</span>
                  )}
                  {soil.ph < 6 && (
                    <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">pH Correction Suggested</span>
                  )}
                  {soil.type === 'Clay' && (
                    <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">Drainage Improvement Needed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </InfoPanel>
        
        <InfoPanel
          title="Soil Composition"
          icon={<Flask size={20} />}
        >
          <div className="p-2 h-72">
            <SoilCompositionChart soilData={soil} />
          </div>
        </InfoPanel>
        
        <InfoPanel
          title="Soil Properties"
          icon={<Leaf size={20} />}
        >
          <SoilProperties soilData={soil} />
        </InfoPanel>
      </div>
    </div>
  );
};

export default SoilModule;
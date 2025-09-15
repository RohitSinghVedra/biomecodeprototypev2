import React from 'react';
import { Layers, Leaf, Trees, Mountain, Building, Waves } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import InfoPanel from '../../common/InfoPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import LandCoverChart from './LandCoverChart';
import LandCoverIndicators from './LandCoverIndicators';

const LandCoverModule: React.FC = () => {
  const { selectedRegion, isLoading } = useRegion();
  
  if (isLoading) {
    return <LoadingSpinner text="Loading land cover data..." />;
  }
  
  if (!selectedRegion || !selectedRegion.landCover) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please select a region first to view land cover data.</p>
      </div>
    );
  }
  
  const { landCover, region } = selectedRegion;
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-forest-100 to-forest-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-forest-900 mb-2">Land Cover Analysis</h2>
        <p className="text-forest-800">{region.name} - Land Classification</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoPanel
          title="Land Cover Distribution"
          icon={<Layers size={20} />}
          className="md:col-span-2"
        >
          <div className="p-4 h-80">
            <LandCoverChart landCoverData={landCover} />
          </div>
        </InfoPanel>
        
        <InfoPanel
          title="Land Cover Breakdown"
          icon={<Leaf size={20} />}
        >
          <LandCoverIndicators landCoverData={landCover} />
        </InfoPanel>
        
        <InfoPanel
          title="Land Cover Insights"
          icon={<Trees size={20} />}
        >
          <div className="p-4">
            <h3 className="text-lg font-medium text-forest-800 mb-3">Land Assessment</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Forestation Potential</h4>
                <p className="text-gray-600 mt-1">
                  Based on the land cover analysis, this region has {landCover.forest < 30 ? 'significant' : 'moderate'} potential for forestation projects. 
                  Currently, {landCover.forest}% of the land is forested.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Urban Integration</h4>
                <p className="text-gray-600 mt-1">
                  With {landCover.urban}% urban coverage, this area {landCover.urban > 15 ? 'will require urban forestry approaches' : 'has minimal urban constraints for naturalization'}.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Water Resources</h4>
                <p className="text-gray-600 mt-1">
                  {landCover.water + landCover.wetlands}% of the region consists of water bodies and wetlands, 
                  providing {landCover.water + landCover.wetlands > 10 ? 'good' : 'limited'} natural water resources.
                </p>
              </div>
            </div>
          </div>
        </InfoPanel>
      </div>
    </div>
  );
};

export default LandCoverModule;
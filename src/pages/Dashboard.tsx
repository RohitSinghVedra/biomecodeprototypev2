import React from 'react';
import { useRegion } from '../context/RegionContext';
import EnhancedMapSelection from '../components/modules/map/EnhancedMapSelection';
import ClimateModule from '../components/modules/climate/ClimateModule';
import LandCoverModule from '../components/modules/land/LandCoverModule';
import SoilModule from '../components/modules/soil/SoilModule';
import SimulationModule from '../components/modules/simulation/SimulationModule';
import RoadmapModule from '../components/modules/roadmap/RoadmapModule';
import ResultsModule from '../components/modules/results/ResultsModule';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { activeModule, isLoading, regionData } = useRegion();
  
  const renderActiveModule = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <LoadingSpinner size="lg" text="Loading data..." />
        </div>
      );
    }
    
    switch (activeModule) {
          case 'map':
            return <EnhancedMapSelection />;
      case 'climate':
        return <ClimateModule />;
      case 'land':
        return <LandCoverModule />;
      case 'soil':
        return <SoilModule />;
      case 'simulation':
        return <SimulationModule />;
      case 'roadmap':
        return <RoadmapModule data={regionData?.roadmap} />;
      case 'results':
        return <ResultsModule />;
      default:
        return <EnhancedMapSelection />;
    }
  };
  
  return (
    <div className="h-full">
      {renderActiveModule()}
    </div>
  );
};

export default Dashboard;
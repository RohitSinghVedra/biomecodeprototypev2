import React, { useState, useEffect } from 'react';
import { BrainCircuit, Leaf, Trees as Tree, Sprout, Cloud } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import InfoPanel from '../../common/InfoPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import Button from '../../common/Button';
import SimulationSetupForm from './SimulationSetupForm';
import WaterResourcesForm from './WaterResourcesForm';
import RecommendationsPanel from './RecommendationsPanel';
import { SimulationSetup, WaterResourcePlan } from '../../../types';

const SimulationModule: React.FC = () => {
  const { selectedRegion, isLoading } = useRegion();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSetup, setSimulationSetup] = useState<SimulationSetup | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  
  if (isLoading) {
    return <LoadingSpinner text="Loading simulation data..." />;
  }
  
  if (!selectedRegion || !selectedRegion.climate || !selectedRegion.soil) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please select a region first to set up a simulation.</p>
      </div>
    );
  }
  
  const { region, climate, soil, waterAccess } = selectedRegion;

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  
  const handleSimulationSetup = (setup: SimulationSetup) => {
    setSimulationSetup(setup);
  };
  
  const runSimulation = () => {
    if (!simulationSetup) return;
    
    setIsSimulating(true);
    
    // In a real app, this would call an API to run the simulation
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-forest-100 via-primary-100 to-forest-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-forest-900 mb-2">Simulation Setup</h2>
        <p className="text-forest-800">{region.name} - Forestation Strategy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <InfoPanel
            title="Configure Simulation"
            icon={<BrainCircuit size={20} />}
          >
            <SimulationSetupForm 
              climate={climate}
              soil={soil}
              waterAccess={waterAccess}
              onValidationChange={handleValidationChange}
              onSetupChange={handleSimulationSetup}
            />
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <WaterResourcesForm
                waterAccess={waterAccess}
                climate={climate}
                onChange={(plan: WaterResourcePlan) => {
                  if (simulationSetup) {
                    setSimulationSetup({
                      ...simulationSetup,
                      waterResources: plan
                    });
                  }
                }}
              />
            </div>
            
            <div className="p-4 border-t border-gray-200 mt-4 flex justify-end">
              <Button
                disabled={!isFormValid || isSimulating}
                isLoading={isSimulating}
                onClick={runSimulation}
                icon={<Cloud size={16} />}
              >
                Run Simulation
              </Button>
            </div>
          </InfoPanel>
        </div>
        
        <div>
          <InfoPanel
            title="AI Recommendations"
            icon={<Leaf size={20} />}
          >
            <RecommendationsPanel 
              climate={climate}
              soil={soil}
              waterAccess={waterAccess}
              projectType={simulationSetup?.projectType || 'Agroforestry'}
            />
          </InfoPanel>
          
          <InfoPanel
            title="Simulation Guide"
            icon={<Sprout size={20} />}
            className="mt-6"
          >
            <div className="p-4">
              <h3 className="text-lg font-medium text-forest-800 mb-3">How It Works</h3>
              
              <div className="space-y-3 text-gray-700">
                <p>
                  Our AI-powered simulation engine combines multiple factors including climate data, 
                  soil characteristics, water resources, and ecological models to create a comprehensive 
                  implementation strategy.
                </p>
                
                <div className="flex items-start mt-2">
                  <div className="bg-forest-100 rounded-full p-1 mr-2 mt-0.5">
                    <span className="flex items-center justify-center w-5 h-5 bg-forest-600 text-white rounded-full text-xs">1</span>
                  </div>
                  <p>Configure project parameters and water resources</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-forest-100 rounded-full p-1 mr-2 mt-0.5">
                    <span className="flex items-center justify-center w-5 h-5 bg-forest-600 text-white rounded-full text-xs">2</span>
                  </div>
                  <p>Review AI-recommended species and implementation phases</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-forest-100 rounded-full p-1 mr-2 mt-0.5">
                    <span className="flex items-center justify-center w-5 h-5 bg-forest-600 text-white rounded-full text-xs">3</span>
                  </div>
                  <p>Generate detailed roadmap and ecological impact forecast</p>
                </div>
              </div>
            </div>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
};

export default SimulationModule;
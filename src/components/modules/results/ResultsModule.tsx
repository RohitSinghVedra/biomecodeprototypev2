import React, { useState } from 'react';
import { BarChart3, TreePine, Cloud, Leaf, Target } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import InfoPanel from '../../common/InfoPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import Button from '../../common/Button';
import ImpactChart from './ImpactChart';
import ImpactTimeline from './ImpactTimeline';
import BiodiversityImpact from './BiodiversityImpact';

// Mock simulation results (in a real app, this would come from the backend)
const mockResults = {
  yearlyImpacts: Array.from({ length: 20 }, (_, i) => ({
    year: i + 1,
    co2Sequestration: 5 * (i + 1) * (1 + i * 0.05), // tons, increasing over time with some exponential growth
    biomass: 10 * (i + 1) * (1 + i * 0.03), // tons
    oxygenProduced: 7 * (i + 1) * (1 + i * 0.04), // tons
    temperatureModeration: Math.min(3, 0.05 * (i + 1) * (1 + i * 0.1)), // degrees Celsius, capped at 3
    rainfallShift: Math.min(15, 0.3 * (i + 1) * (1 + i * 0.08)), // percentage, capped at 15%
    soilHealthImprovement: Math.min(90, 2 * (i + 1) * (1 + i * 0.06)), // percentage, capped at 90%
    biodiversityIndex: Math.min(85, 2 * (i + 1) * (1 + i * 0.09)), // 0-100, capped at 85
  })),
  finalBiodiversity: {
    birdSpecies: 24,
    pollinators: 38,
    regrowthSpecies: 17,
  },
};

const ResultsModule: React.FC = () => {
  const { selectedRegion, isLoading } = useRegion();
  const [selectedYear, setSelectedYear] = useState<number>(10); // Default to 10 years
  
  if (isLoading) {
    return <LoadingSpinner text="Loading simulation results..." />;
  }
  
  if (!selectedRegion) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please select a region first to view simulation results.</p>
      </div>
    );
  }
  
  const { region } = selectedRegion;
  
  // In a real app, this would check if a simulation has been run
  // For demo purposes, we'll always show results
  const hasSimulationResults = true;
  
  if (!hasSimulationResults) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-4">No simulation results available. Please run a simulation first.</p>
          <Button variant="primary">Go to Simulation</Button>
        </div>
      </div>
    );
  }
  
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  
  const currentYearData = mockResults.yearlyImpacts.find(data => data.year === selectedYear) || mockResults.yearlyImpacts[0];
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-primary-100 via-sky-100 to-primary-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-2">Ecological Impact Forecast</h2>
        <p className="text-primary-800">{region.name} - Simulation Results</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <InfoPanel
            title="Impact Timeline"
            icon={<BarChart3 size={20} />}
            className="md:col-span-2"
          >
            <div className="p-4">
              <ImpactTimeline 
                yearlyImpacts={mockResults.yearlyImpacts}
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
              />
            </div>
          </InfoPanel>
        </div>
        
        <div className="md:col-span-2">
          <InfoPanel
            title={`Year ${selectedYear} Impact Metrics`}
            icon={<Target size={20} />}
          >
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-forest-50 to-white p-3 rounded-lg border border-forest-100">
                  <div className="text-sm text-forest-600 mb-1">CO₂ Sequestration</div>
                  <div className="text-2xl font-bold text-forest-800">{currentYearData.co2Sequestration.toFixed(1)} tons</div>
                  <div className="text-xs text-forest-500 mt-1">Total to date</div>
                </div>
                
                <div className="bg-gradient-to-br from-forest-50 to-white p-3 rounded-lg border border-forest-100">
                  <div className="text-sm text-forest-600 mb-1">Biomass Generated</div>
                  <div className="text-2xl font-bold text-forest-800">{currentYearData.biomass.toFixed(1)} tons</div>
                  <div className="text-xs text-forest-500 mt-1">Total living matter</div>
                </div>
                
                <div className="bg-gradient-to-br from-forest-50 to-white p-3 rounded-lg border border-forest-100">
                  <div className="text-sm text-forest-600 mb-1">Oxygen Produced</div>
                  <div className="text-2xl font-bold text-forest-800">{currentYearData.oxygenProduced.toFixed(1)} tons</div>
                  <div className="text-xs text-forest-500 mt-1">Total to date</div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-50 to-white p-3 rounded-lg border border-sky-100">
                  <div className="text-sm text-sky-600 mb-1">Temperature</div>
                  <div className="text-2xl font-bold text-sky-800">-{currentYearData.temperatureModeration.toFixed(1)}°C</div>
                  <div className="text-xs text-sky-500 mt-1">Local temperature reduction</div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-50 to-white p-3 rounded-lg border border-sky-100">
                  <div className="text-sm text-sky-600 mb-1">Rainfall Shift</div>
                  <div className="text-2xl font-bold text-sky-800">+{currentYearData.rainfallShift.toFixed(1)}%</div>
                  <div className="text-xs text-sky-500 mt-1">Potential increase</div>
                </div>
                
                <div className="bg-gradient-to-br from-earth-50 to-white p-3 rounded-lg border border-earth-100">
                  <div className="text-sm text-earth-600 mb-1">Soil Health</div>
                  <div className="text-2xl font-bold text-earth-800">+{currentYearData.soilHealthImprovement.toFixed(0)}%</div>
                  <div className="text-xs text-earth-500 mt-1">Improvement from baseline</div>
                </div>
              </div>
              
              <div className="mt-4 h-64">
                <ImpactChart yearlyImpacts={mockResults.yearlyImpacts} />
              </div>
            </div>
          </InfoPanel>
        </div>
        
        <div className="md:col-span-1">
          <InfoPanel
            title="Biodiversity Impact"
            icon={<Leaf size={20} />}
          >
            <BiodiversityImpact 
              biodiversityIndex={currentYearData.biodiversityIndex}
              finalBiodiversity={mockResults.finalBiodiversity}
            />
          </InfoPanel>
          
          <div className="mt-6">
            <InfoPanel
              title="Download Report"
              icon={<Cloud size={20} />}
            >
              <div className="p-4">
                <p className="text-gray-600 mb-4">Generate a comprehensive report of the ecological impact forecast for your selected region.</p>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    disabled={true} // For demo purposes
                  >
                    PDF Report
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    disabled={true} // For demo purposes
                  >
                    CSV Data Export
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    disabled={true} // For demo purposes
                  >
                    Share Results
                  </Button>
                </div>
              </div>
            </InfoPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModule;
import React, { useState, useEffect } from 'react';
import { Trees as Tree, Droplets, Clock3, Tractor } from 'lucide-react';
import { ClimateData, SoilData, WaterAccessData, SimulationSetup, GreenProjectType } from '../../../types';

interface SimulationSetupFormProps {
  climate: ClimateData;
  soil: SoilData;
  waterAccess?: WaterAccessData;
  onValidationChange: (isValid: boolean) => void;
  onSetupChange: (setup: SimulationSetup) => void;
}

const SimulationSetupForm: React.FC<SimulationSetupFormProps> = ({ 
  climate, 
  soil, 
  waterAccess,
  onValidationChange,
  onSetupChange
}) => {
  const [setup, setSetup] = useState<SimulationSetup>({
    projectType: 'Agroforestry',
    plantMix: [],
    treesPerHectare: 1000,
    duration: 10,
    waterMethod: waterAccess?.recommendedWaterMethod || 'Rainfed',
    interventionType: 'Assisted',
    speciesDensity: 'Basic',
  });
  
  useEffect(() => {
    // Validate form
    const isValid = setup.projectType && setup.treesPerHectare > 0 && setup.duration > 0;
    onValidationChange(isValid);
    
    // Notify parent of setup changes
    if (isValid) {
      onSetupChange(setup);
    }
  }, [setup, onValidationChange, onSetupChange]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setSetup(prev => ({
      ...prev,
      [name]: name === 'treesPerHectare' || name === 'duration' 
        ? parseInt(value, 10) 
        : value
    }));
  };
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <div className="relative">
            <select
              name="projectType"
              value={setup.projectType}
              onChange={handleChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
            >
              <option value="Agroforestry">Agroforestry</option>
              <option value="Native Rewilding">Native Rewilding</option>
              <option value="Syntropic Forest">Syntropic Forest</option>
              <option value="Landscaping">Landscaping</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Tree className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {setup.projectType === 'Agroforestry' && 'Combine forestry and agriculture for food production and ecological benefits'}
            {setup.projectType === 'Native Rewilding' && 'Reintroduce native species to restore natural ecosystem processes'}
            {setup.projectType === 'Syntropic Forest' && 'Create a successional, multi-story productive forest ecosystem'}
            {setup.projectType === 'Landscaping' && 'Design aesthetic green spaces with ecological considerations'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trees Per Hectare
          </label>
          <div className="relative">
            <input
              type="number"
              name="treesPerHectare"
              value={setup.treesPerHectare}
              onChange={handleChange}
              min={100}
              max={10000}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Tree className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {setup.treesPerHectare < 500 && 'Low density - suitable for sparse savanna or agroforestry with wide spacing'}
            {setup.treesPerHectare >= 500 && setup.treesPerHectare < 1500 && 'Medium density - balances light penetration and forest development'}
            {setup.treesPerHectare >= 1500 && 'High density - accelerates forest development and canopy closure'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Method
          </label>
          <div className="relative">
            <select
              name="waterMethod"
              value={setup.waterMethod}
              onChange={handleChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
            >
              <option value="Rainfed">Rainfed</option>
              <option value="Drip">Drip Irrigation</option>
              <option value="Greywater">Greywater Reuse</option>
              <option value="Mixed">Mixed Methods</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Droplets className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {waterAccess && `Recommended based on ${waterAccess.rainfallClassification} rainfall in your region`}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Simulation Duration (Years)
          </label>
          <div className="relative">
            <input
              type="number"
              name="duration"
              value={setup.duration}
              onChange={handleChange}
              min={1}
              max={100}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Clock3 className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {setup.duration <= 5 && 'Short-term projection - useful for initial establishment phase'}
            {setup.duration > 5 && setup.duration <= 20 && 'Medium-term projection - shows substantial growth and impact'}
            {setup.duration > 20 && 'Long-term projection - demonstrates mature ecosystem development'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Intervention Type
          </label>
          <div className="relative">
            <select
              name="interventionType"
              value={setup.interventionType}
              onChange={handleChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
            >
              <option value="Manual">Manual (High Human Input)</option>
              <option value="Assisted">Assisted (Moderate Human Input)</option>
              <option value="Natural">Natural (Minimal Human Input)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Tractor className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {setup.interventionType === 'Manual' && 'Regular maintenance, pruning, weeding, and active management'}
            {setup.interventionType === 'Assisted' && 'Periodic interventions with some natural processes allowed'}
            {setup.interventionType === 'Natural' && 'Minimal interventions, allowing natural succession to occur'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Species Density
          </label>
          <div className="relative">
            <select
              name="speciesDensity"
              value={setup.speciesDensity}
              onChange={handleChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
            >
              <option value="Basic">Basic (5-10 species)</option>
              <option value="Advanced">Advanced (15+ species)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Tree className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {setup.speciesDensity === 'Basic' && 'Simpler implementation but less biodiversity benefits'}
            {setup.speciesDensity === 'Advanced' && 'More complex implementation with greater biodiversity benefits'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSetupForm;
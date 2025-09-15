import React from 'react';
import { Droplets, Waves, CloudRain, CloudSun, Sprout } from 'lucide-react';
import { WaterResourcePlan, WaterAccessData, ClimateData } from '../../../types';

interface WaterResourcesFormProps {
  waterAccess: WaterAccessData;
  climate: ClimateData;
  onChange: (plan: WaterResourcePlan) => void;
}

const WaterResourcesForm: React.FC<WaterResourcesFormProps> = ({
  waterAccess,
  climate,
  onChange,
}) => {
  // Calculate recommended annual capacity based on climate and water access
  const calculateRecommendedCapacity = () => {
    const baseRequirement = 1000; // Base cubic meters per hectare
    const climateFactor = climate.evapotranspiration / 3; // Adjust based on evapotranspiration
    const accessFactor = waterAccess.accessRating === 'Low' ? 1.5 : 
                        waterAccess.accessRating === 'Medium' ? 1.2 : 1;
    
    return Math.round(baseRequirement * climateFactor * accessFactor);
  };

  const recommendedCapacity = calculateRecommendedCapacity();

  // Calculate natural water availability
  const calculateNaturalWaterAvailability = () => {
    const rainfall = climate.rainfall.annual.total; // mm per year
    const area = 10000; // 1 hectare in m²
    const runoffCoefficient = 0.7; // Estimated catchment efficiency
    return Math.round((rainfall * area * runoffCoefficient) / 1000); // Convert to m³
  };

  const naturalWaterAvailability = calculateNaturalWaterAvailability();

  // Calculate potential additional water through advanced methods
  const calculateAdvancedWaterPotential = () => {
    const cloudSeedingPotential = climate.cloudCoverage.annual.avg > 40 ? 
      Math.round(climate.rainfall.annual.total * 0.15) : 0; // 15% increase if suitable

    const condensationPotential = climate.humidity > 70 ? 
      Math.round(climate.rainfall.annual.total * 0.08) : 0; // 8% increase if humid

    const waterHarvestingPotential = Math.round(naturalWaterAvailability * 0.2); // 20% additional through advanced harvesting

    return {
      cloudSeeding: cloudSeedingPotential,
      condensation: condensationPotential,
      harvesting: waterHarvestingPotential,
      total: cloudSeedingPotential + condensationPotential + waterHarvestingPotential
    };
  };

  const advancedWaterPotential = calculateAdvancedWaterPotential();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Calculate sustainability score based on inputs
    const calculateSustainabilityScore = (sourceType: string, capacity: number) => {
      let score = 70; // Base score
      
      // Adjust based on source type
      if (sourceType === 'Rainwater') score += 20;
      else if (sourceType === 'Mixed') score += 10;
      else if (sourceType === 'Groundwater') score -= 10;
      
      // Adjust based on capacity vs recommended
      const capacityRatio = capacity / recommendedCapacity;
      if (capacityRatio > 1.2) score -= 10;
      else if (capacityRatio < 0.8) score -= 15;
      
      return Math.min(100, Math.max(0, score));
    };

    const newPlan: WaterResourcePlan = {
      annualCapacity: name === 'annualCapacity' ? parseInt(value) : recommendedCapacity,
      sourceType: name === 'sourceType' ? value as WaterResourcePlan['sourceType'] : 'Mixed',
      infrastructureNeeded: [
        'Storage tanks',
        'Distribution system',
        'Monitoring equipment',
      ],
      maintenanceLevel: 'Medium',
      sustainabilityScore: calculateSustainabilityScore(
        name === 'sourceType' ? value : 'Mixed',
        name === 'annualCapacity' ? parseInt(value) : recommendedCapacity
      ),
    };

    onChange(newPlan);
  };

  return (
    <div className="space-y-6">
      <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
        <div className="flex items-center mb-3">
          <Droplets className="text-sky-600 mr-2" size={20} />
          <h3 className="text-lg font-medium text-sky-900">Water Resource Planning</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Water Capacity (m³)
            </label>
            <div className="relative">
              <input
                type="number"
                name="annualCapacity"
                defaultValue={recommendedCapacity}
                onChange={handleChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Waves className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Recommended: {recommendedCapacity} m³ based on climate conditions
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Water Source
            </label>
            <div className="relative">
              <select
                name="sourceType"
                onChange={handleChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
              >
                <option value="Mixed">Mixed Sources</option>
                <option value="Groundwater">Groundwater</option>
                <option value="Surface">Surface Water</option>
                <option value="Rainwater">Rainwater Harvesting</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <CloudRain className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {waterAccess.recommendedWaterMethod} is recommended for this region
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Natural Water Availability</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-md border border-sky-100">
              <div className="flex items-center mb-2">
                <CloudRain className="text-sky-500 mr-2" size={16} />
                <span className="text-sm font-medium text-gray-700">Natural Sources</span>
              </div>
              <div className="text-2xl font-bold text-sky-700">{naturalWaterAvailability} m³</div>
              <div className="text-xs text-gray-500 mt-1">Annual rainfall catchment potential</div>
            </div>
            
            <div className="bg-white p-3 rounded-md border border-sky-100">
              <div className="flex items-center mb-2">
                <CloudSun className="text-sky-500 mr-2" size={16} />
                <span className="text-sm font-medium text-gray-700">Advanced Methods</span>
              </div>
              <div className="text-2xl font-bold text-sky-700">+{advancedWaterPotential.total} m³</div>
              <div className="text-xs text-gray-500 mt-1">Additional potential through technology</div>
            </div>
          </div>

          <div className="mt-4 bg-white p-4 rounded-md border border-sky-100">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Advanced Water Generation Methods</h5>
            <div className="space-y-3">
              {advancedWaterPotential.cloudSeeding > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CloudRain className="text-sky-400 mr-2" size={16} />
                    <span className="text-sm text-gray-600">Cloud Seeding Potential</span>
                  </div>
                  <span className="text-sm font-medium text-sky-600">+{advancedWaterPotential.cloudSeeding} m³</span>
                </div>
              )}
              {advancedWaterPotential.condensation > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplets className="text-sky-400 mr-2" size={16} />
                    <span className="text-sm text-gray-600">Atmospheric Water Generation</span>
                  </div>
                  <span className="text-sm font-medium text-sky-600">+{advancedWaterPotential.condensation} m³</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Waves className="text-sky-400 mr-2" size={16} />
                  <span className="text-sm text-gray-600">Advanced Harvesting Systems</span>
                </div>
                <span className="text-sm font-medium text-sky-600">+{advancedWaterPotential.harvesting} m³</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Infrastructure Requirements</h4>
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                Storage tanks and reservoirs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                Distribution system with efficient irrigation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                Monitoring and control equipment
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                Advanced water harvesting systems
              </li>
              {advancedWaterPotential.cloudSeeding > 0 && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                  Cloud seeding equipment and monitoring
                </li>
              )}
              {advancedWaterPotential.condensation > 0 && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                  Atmospheric water generators
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterResourcesForm;
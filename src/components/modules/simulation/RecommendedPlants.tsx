import React from 'react';
import { Leaf, TreeDeciduous, Droplets, Sun, Bird, Bug, Fish, Flower2 } from 'lucide-react';
import { ClimateData, SoilData, WaterAccessData, GreenProjectType } from '../../../types';

interface RecommendedPlantsProps {
  climate: ClimateData;
  soil: SoilData;
  waterAccess: WaterAccessData;
  projectType: GreenProjectType;
}

const RecommendedPlants: React.FC<RecommendedPlantsProps> = ({
  climate,
  soil,
  waterAccess,
  projectType
}) => {
  // Helper function to determine recommendations based on conditions
  const getRecommendations = () => {
    const avgTemp = climate.temperature.current.avg;
    const annualRainfall = climate.rainfall.annual.total;
    const isAcidic = soil.ph < 6.5;
    const isAlkaline = soil.ph > 7.5;

    const recommendations = {
      canopyTrees: [],
      understoryPlants: [],
      groundCover: [],
      pollinators: [],
      birds: [],
      aquaticLife: []
    };

    if (avgTemp > 25 && annualRainfall > 2000) {
      // Tropical rainforest ecosystem
      recommendations.canopyTrees = [
        {
          name: 'Mahogany',
          scientificName: 'Swietenia macrophylla',
          waterNeeds: 'High',
          sunlight: 'Full sun',
          soilType: 'Adaptable',
          benefits: 'Premium timber, carbon sequestration, canopy formation',
          icon: <TreeDeciduous className="text-forest-600" size={20} />
        },
        {
          name: 'Brazil Nut',
          scientificName: 'Bertholletia excelsa',
          waterNeeds: 'High',
          sunlight: 'Full sun',
          soilType: 'Clay-loam',
          benefits: 'Food production, wildlife support, long-term stability',
          icon: <TreeDeciduous className="text-forest-700" size={20} />
        }
      ];

      recommendations.understoryPlants = [
        {
          name: 'Açaí Palm',
          scientificName: 'Euterpe oleracea',
          waterNeeds: 'High',
          sunlight: 'Partial shade',
          soilType: 'Well-draining',
          benefits: 'Food production, understory diversity',
          icon: <Leaf className="text-forest-500" size={20} />
        },
        {
          name: 'Heliconia',
          scientificName: 'Heliconia psittacorum',
          waterNeeds: 'High',
          sunlight: 'Partial shade',
          soilType: 'Rich organic',
          benefits: 'Bird attraction, understory coverage',
          icon: <Flower2 className="text-rose-500" size={20} />
        }
      ];

      recommendations.birds = [
        {
          name: 'Toucan',
          scientificName: 'Ramphastidae family',
          role: 'Seed dispersal',
          habitat: 'Canopy layer',
          benefits: 'Ecosystem engineering, seed distribution',
          icon: <Bird className="text-amber-500" size={20} />
        },
        {
          name: 'Macaw',
          scientificName: 'Ara genus',
          role: 'Seed dispersal',
          habitat: 'Upper canopy',
          benefits: 'Long-distance seed dispersal, indicator species',
          icon: <Bird className="text-sky-500" size={20} />
        }
      ];

    } else if (avgTemp > 35 && annualRainfall < 250) {
      // Desert ecosystem
      recommendations.canopyTrees = [
        {
          name: 'Ghaf Tree',
          scientificName: 'Prosopis cineraria',
          waterNeeds: 'Very Low',
          sunlight: 'Full sun',
          soilType: 'Sandy',
          benefits: 'Drought resistant, soil stabilization',
          icon: <TreeDeciduous className="text-forest-600" size={20} />
        }
      ];

      recommendations.understoryPlants = [
        {
          name: 'Desert Saltbush',
          scientificName: 'Atriplex halimus',
          waterNeeds: 'Very Low',
          sunlight: 'Full sun',
          soilType: 'Saline tolerant',
          benefits: 'Soil stabilization, wildlife shelter',
          icon: <Leaf className="text-forest-500" size={20} />
        }
      ];

      recommendations.birds = [
        {
          name: 'Desert Lark',
          scientificName: 'Ammomanes deserti',
          role: 'Insect control',
          habitat: 'Ground level',
          benefits: 'Pest control, ecosystem indicator',
          icon: <Bird className="text-amber-500" size={20} />
        }
      ];

    } else {
      // Temperate ecosystem
      recommendations.canopyTrees = [
        {
          name: isAcidic ? 'Red Pine' : 'White Oak',
          scientificName: isAcidic ? 'Pinus resinosa' : 'Quercus alba',
          waterNeeds: 'Moderate',
          sunlight: 'Full sun',
          soilType: isAcidic ? 'Acidic' : 'Rich loam',
          benefits: 'Wildlife support, timber production',
          icon: <TreeDeciduous className="text-forest-600" size={20} />
        }
      ];

      recommendations.understoryPlants = [
        {
          name: isAcidic ? 'Mountain Laurel' : 'Dogwood',
          scientificName: isAcidic ? 'Kalmia latifolia' : 'Cornus florida',
          waterNeeds: 'Moderate',
          sunlight: 'Partial shade',
          soilType: 'Adaptable',
          benefits: 'Wildlife habitat, aesthetic value',
          icon: <Leaf className="text-forest-500" size={20} />
        }
      ];

      recommendations.birds = [
        {
          name: 'Northern Cardinal',
          scientificName: 'Cardinalis cardinalis',
          role: 'Seed dispersal',
          habitat: 'Understory',
          benefits: 'Seed dispersal, ecosystem health indicator',
          icon: <Bird className="text-rose-500" size={20} />
        }
      ];
    }

    // Add pollinators based on climate
    recommendations.pollinators = [
      {
        name: avgTemp > 30 ? 'Carpenter Bee' : 'Bumblebee',
        scientificName: avgTemp > 30 ? 'Xylocopa genus' : 'Bombus genus',
        role: 'Primary pollinator',
        benefits: 'Pollination, ecosystem stability',
        icon: <Bug className="text-amber-500" size={20} />
      }
    ];

    // Add aquatic life if water features present
    if (waterAccess.accessRating === 'High') {
      recommendations.aquaticLife = [
        {
          name: avgTemp > 25 ? 'Tilapia' : 'Brook Trout',
          scientificName: avgTemp > 25 ? 'Oreochromis niloticus' : 'Salvelinus fontinalis',
          role: 'Aquatic balance',
          benefits: 'Water quality, ecosystem completion',
          icon: <Fish className="text-sky-500" size={20} />
        }
      ];
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      <div className="p-4">
        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
          <Droplets size={16} className="text-sky-500" />
          <span>Water: {waterAccess.rainfallClassification}</span>
          <span>•</span>
          <span>pH: {soil.ph.toFixed(1)}</span>
          <span>•</span>
          <span>Soil: {soil.type}</span>
        </div>

        {/* Flora Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-forest-800 mb-3">Flora Recommendations</h3>
            
            {/* Canopy Trees */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-forest-700">Canopy Layer</h4>
              {recommendations.canopyTrees.map((plant, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium text-forest-900">{plant.name}</h5>
                      <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
                    </div>
                    {plant.icon}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Droplets size={16} className="mr-1 text-sky-500" />
                      {plant.waterNeeds}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Sun size={16} className="mr-1 text-amber-500" />
                      {plant.sunlight}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{plant.benefits}</p>
                </div>
              ))}
            </div>

            {/* Understory Plants */}
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-forest-700">Understory Layer</h4>
              {recommendations.understoryPlants.map((plant, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium text-forest-900">{plant.name}</h5>
                      <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
                    </div>
                    {plant.icon}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Droplets size={16} className="mr-1 text-sky-500" />
                      {plant.waterNeeds}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Sun size={16} className="mr-1 text-amber-500" />
                      {plant.sunlight}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{plant.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fauna Section */}
          <div>
            <h3 className="text-lg font-medium text-forest-800 mb-3">Fauna Recommendations</h3>
            
            {/* Birds */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-forest-700">Avian Species</h4>
              {recommendations.birds.map((bird, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium text-forest-900">{bird.name}</h5>
                      <p className="text-sm text-gray-600 italic">{bird.scientificName}</p>
                    </div>
                    {bird.icon}
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600">Habitat: {bird.habitat}</p>
                    <p className="text-gray-600">Role: {bird.role}</p>
                    <p className="mt-1 text-gray-700">{bird.benefits}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pollinators */}
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-forest-700">Pollinators</h4>
              {recommendations.pollinators.map((pollinator, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium text-forest-900">{pollinator.name}</h5>
                      <p className="text-sm text-gray-600 italic">{pollinator.scientificName}</p>
                    </div>
                    {pollinator.icon}
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600">Role: {pollinator.role}</p>
                    <p className="mt-1 text-gray-700">{pollinator.benefits}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aquatic Life */}
            {recommendations.aquaticLife.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-forest-700">Aquatic Species</h4>
                {recommendations.aquaticLife.map((species, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-forest-900">{species.name}</h5>
                        <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                      </div>
                      {species.icon}
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600">Role: {species.role}</p>
                      <p className="mt-1 text-gray-700">{species.benefits}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-forest-50 rounded-lg">
        <p className="text-sm text-forest-700 flex items-center">
          <Leaf className="mr-2 text-forest-600" size={16} />
          Recommendations based on your region's climate, soil conditions, and project goals.
        </p>
      </div>
    </div>
  );
};

export default RecommendedPlants;
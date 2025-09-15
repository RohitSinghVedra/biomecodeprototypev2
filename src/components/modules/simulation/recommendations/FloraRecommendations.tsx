import React, { useState } from 'react';
import { TreeDeciduous, Sprout, Flower2, Droplets, Sun } from 'lucide-react';
import { ClimateData, SoilData, WaterAccessData, GreenProjectType } from '../../../../types';

interface FloraRecommendationsProps {
  climate: ClimateData;
  soil: SoilData;
  waterAccess: WaterAccessData;
  projectType: GreenProjectType;
}

const FloraRecommendations: React.FC<FloraRecommendationsProps> = ({
  climate,
  soil,
  waterAccess,
  projectType
}) => {
  const [activeSubTab, setActiveSubTab] = useState('canopy');

  // Get flora recommendations based on conditions
  const getRecommendations = () => {
    const avgTemp = climate.temperature.current.avg;
    const annualRainfall = climate.rainfall.annual.total;
    const isAcidic = soil.ph < 6.5;
    const isAlkaline = soil.ph > 7.5;

    if (avgTemp > 25 && annualRainfall > 2000) {
      // Tropical rainforest ecosystem
      return {
        canopy: [
          {
            name: 'Mahogany',
            scientificName: 'Swietenia macrophylla',
            waterNeeds: 'High',
            sunlight: 'Full sun',
            soilType: 'Adaptable',
            benefits: 'Premium timber, carbon sequestration',
            growthRate: 'Moderate',
            maturityHeight: '30-45m',
            rootSystem: 'Deep taproot'
          },
          {
            name: 'Brazil Nut',
            scientificName: 'Bertholletia excelsa',
            waterNeeds: 'High',
            sunlight: 'Full sun',
            soilType: 'Clay-loam',
            benefits: 'Food production, wildlife support',
            growthRate: 'Slow',
            maturityHeight: '45-50m',
            rootSystem: 'Deep spreading'
          },
          {
            name: 'Kapok Tree',
            scientificName: 'Ceiba pentandra',
            waterNeeds: 'High',
            sunlight: 'Full sun',
            soilType: 'Well-draining',
            benefits: 'Wildlife habitat, ecosystem support',
            growthRate: 'Fast',
            maturityHeight: '60-70m',
            rootSystem: 'Buttress roots'
          }
        ],
        understory: [
          {
            name: 'Açaí Palm',
            scientificName: 'Euterpe oleracea',
            waterNeeds: 'High',
            sunlight: 'Partial shade',
            soilType: 'Well-draining',
            benefits: 'Food production, understory diversity',
            growthRate: 'Moderate',
            maturityHeight: '15-25m',
            rootSystem: 'Fibrous'
          },
          {
            name: 'Cacao',
            scientificName: 'Theobroma cacao',
            waterNeeds: 'High',
            sunlight: 'Partial shade',
            soilType: 'Rich organic',
            benefits: 'High-value crop, understory utilization',
            growthRate: 'Slow',
            maturityHeight: '4-8m',
            rootSystem: 'Shallow spreading'
          },
          {
            name: 'Coffee',
            scientificName: 'Coffea arabica',
            waterNeeds: 'Moderate',
            sunlight: 'Filtered sun',
            soilType: 'Rich, acidic',
            benefits: 'Economic value, biodiversity support',
            growthRate: 'Moderate',
            maturityHeight: '3-5m',
            rootSystem: 'Deep taproot'
          }
        ],
        groundcover: [
          {
            name: 'Heliconia',
            scientificName: 'Heliconia psittacorum',
            waterNeeds: 'High',
            sunlight: 'Partial shade',
            soilType: 'Rich organic',
            benefits: 'Bird attraction, ground coverage',
            growthRate: 'Fast',
            maturityHeight: '1-2m',
            rootSystem: 'Rhizomatous'
          },
          {
            name: 'Calathea',
            scientificName: 'Calathea spp.',
            waterNeeds: 'High',
            sunlight: 'Shade',
            soilType: 'Rich organic',
            benefits: 'Soil protection, biodiversity',
            growthRate: 'Moderate',
            maturityHeight: '0.5-1m',
            rootSystem: 'Shallow fibrous'
          },
          {
            name: 'Philodendron',
            scientificName: 'Philodendron hederaceum',
            waterNeeds: 'Moderate',
            sunlight: 'Shade to partial',
            soilType: 'Well-draining',
            benefits: 'Ground cover, erosion control',
            growthRate: 'Fast',
            maturityHeight: 'Climbing',
            rootSystem: 'Adventitious'
          }
        ]
      };
    } else if (avgTemp > 35 && annualRainfall < 250) {
      // Desert ecosystem
      return {
        canopy: [
          {
            name: 'Ghaf Tree',
            scientificName: 'Prosopis cineraria',
            waterNeeds: 'Very Low',
            sunlight: 'Full sun',
            soilType: 'Sandy',
            benefits: 'Drought resistant, soil stabilization',
            growthRate: 'Slow',
            maturityHeight: '15-20m',
            rootSystem: 'Deep taproot'
          },
          {
            name: 'Desert Ironwood',
            scientificName: 'Olneya tesota',
            waterNeeds: 'Very Low',
            sunlight: 'Full sun',
            soilType: 'Rocky, well-draining',
            benefits: 'Wildlife habitat, nitrogen fixing',
            growthRate: 'Very slow',
            maturityHeight: '10-15m',
            rootSystem: 'Extensive taproot'
          }
        ],
        understory: [
          {
            name: 'Desert Saltbush',
            scientificName: 'Atriplex halimus',
            waterNeeds: 'Very Low',
            sunlight: 'Full sun',
            soilType: 'Saline tolerant',
            benefits: 'Soil stabilization, wildlife shelter',
            growthRate: 'Moderate',
            maturityHeight: '1-2m',
            rootSystem: 'Deep spreading'
          },
          {
            name: 'Creosote Bush',
            scientificName: 'Larrea tridentata',
            waterNeeds: 'Very Low',
            sunlight: 'Full sun',
            soilType: 'Sandy, rocky',
            benefits: 'Soil stabilization, native habitat',
            growthRate: 'Slow',
            maturityHeight: '2-3m',
            rootSystem: 'Extensive shallow'
          }
        ],
        groundcover: [
          {
            name: 'Desert Sage',
            scientificName: 'Salvia dorrii',
            waterNeeds: 'Very Low',
            sunlight: 'Full sun',
            soilType: 'Sandy',
            benefits: 'Soil protection, pollinator attraction',
            growthRate: 'Slow',
            maturityHeight: '0.5-1m',
            rootSystem: 'Shallow spreading'
          },
          {
            name: 'Desert Marigold',
            scientificName: 'Baileya multiradiata',
            waterNeeds: 'Very Low',
            sunlight: 'Full sun',
            soilType: 'Sandy, rocky',
            benefits: 'Erosion control, pollinator support',
            growthRate: 'Moderate',
            maturityHeight: '0.3-0.6m',
            rootSystem: 'Taproot'
          }
        ]
      };
    } else {
      // Temperate ecosystem
      return {
        canopy: [
          {
            name: isAcidic ? 'Red Pine' : 'White Oak',
            scientificName: isAcidic ? 'Pinus resinosa' : 'Quercus alba',
            waterNeeds: 'Moderate',
            sunlight: 'Full sun',
            soilType: isAcidic ? 'Acidic' : 'Rich loam',
            benefits: 'Wildlife support, timber production',
            growthRate: 'Moderate',
            maturityHeight: '20-30m',
            rootSystem: 'Deep spreading'
          },
          {
            name: isAcidic ? 'Red Maple' : 'Sugar Maple',
            scientificName: isAcidic ? 'Acer rubrum' : 'Acer saccharum',
            waterNeeds: 'Moderate',
            sunlight: 'Full sun to partial',
            soilType: 'Adaptable',
            benefits: 'Wildlife habitat, aesthetic value',
            growthRate: 'Fast',
            maturityHeight: '20-25m',
            rootSystem: 'Shallow spreading'
          },
          {
            name: 'American Beech',
            scientificName: 'Fagus grandifolia',
            waterNeeds: 'Moderate',
            sunlight: 'Partial to full',
            soilType: 'Well-draining',
            benefits: 'Wildlife food, shade tolerance',
            growthRate: 'Slow',
            maturityHeight: '20-35m',
            rootSystem: 'Shallow spreading'
          }
        ],
        understory: [
          {
            name: isAcidic ? 'Mountain Laurel' : 'Dogwood',
            scientificName: isAcidic ? 'Kalmia latifolia' : 'Cornus florida',
            waterNeeds: 'Moderate',
            sunlight: 'Partial shade',
            soilType: 'Adaptable',
            benefits: 'Wildlife habitat, aesthetic value',
            growthRate: 'Slow',
            maturityHeight: '3-6m',
            rootSystem: 'Shallow fibrous'
          },
          {
            name: 'Serviceberry',
            scientificName: 'Amelanchier canadensis',
            waterNeeds: 'Moderate',
            sunlight: 'Full sun to partial',
            soilType: 'Well-draining',
            benefits: 'Wildlife food, early blooming',
            growthRate: 'Moderate',
            maturityHeight: '4-8m',
            rootSystem: 'Fibrous'
          },
          {
            name: 'American Hazelnut',
            scientificName: 'Corylus americana',
            waterNeeds: 'Moderate',
            sunlight: 'Partial shade',
            soilType: 'Rich loam',
            benefits: 'Wildlife food, soil improvement',
            growthRate: 'Moderate',
            maturityHeight: '3-5m',
            rootSystem: 'Shallow spreading'
          }
        ],
        groundcover: [
          {
            name: isAcidic ? 'Wintergreen' : 'Wild Ginger',
            scientificName: isAcidic ? 'Gaultheria procumbens' : 'Asarum canadense',
            waterNeeds: 'Moderate',
            sunlight: 'Shade',
            soilType: 'Rich organic',
            benefits: 'Soil stabilization, habitat creation',
            growthRate: 'Slow',
            maturityHeight: '0.1-0.2m',
            rootSystem: 'Shallow spreading'
          },
          {
            name: 'Pennsylvania Sedge',
            scientificName: 'Carex pensylvanica',
            waterNeeds: 'Moderate',
            sunlight: 'Shade to partial',
            soilType: 'Adaptable',
            benefits: 'Erosion control, native habitat',
            growthRate: 'Moderate',
            maturityHeight: '0.2-0.3m',
            rootSystem: 'Fibrous'
          },
          {
            name: 'Foam Flower',
            scientificName: 'Tiarella cordifolia',
            waterNeeds: 'Moderate',
            sunlight: 'Shade',
            soilType: 'Rich, moist',
            benefits: 'Ground cover, pollinator support',
            growthRate: 'Moderate',
            maturityHeight: '0.2-0.3m',
            rootSystem: 'Rhizomatous'
          }
        ]
      };
    }
  };

  const recommendations = getRecommendations();

  const tabs = [
    { id: 'canopy', label: 'Canopy Layer', icon: <TreeDeciduous size={16} /> },
    { id: 'understory', label: 'Understory', icon: <Sprout size={16} /> },
    { id: 'groundcover', label: 'Ground Cover', icon: <Flower2 size={16} /> }
  ];

  return (
    <div className="space-y-4">
      {/* Flora Subcategory Tabs */}
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              activeSubTab === tab.id
                ? 'bg-forest-100 text-forest-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Flora Content */}
      <div className="space-y-4">
        {recommendations[activeSubTab as keyof typeof recommendations].map((plant, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
            <div className="flex items-start justify-between">
              <div>
                <h5 className="font-medium text-forest-900">{plant.name}</h5>
                <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
              </div>
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
              <div className="text-gray-600">Growth: {plant.growthRate}</div>
              <div className="text-gray-600">Height: {plant.maturityHeight}</div>
              <div className="text-gray-600">Soil: {plant.soilType}</div>
              <div className="text-gray-600">Roots: {plant.rootSystem}</div>
            </div>
            <p className="mt-2 text-sm text-gray-700">{plant.benefits}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloraRecommendations;
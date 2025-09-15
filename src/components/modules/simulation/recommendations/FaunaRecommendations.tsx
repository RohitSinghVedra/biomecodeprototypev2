import React, { useState } from 'react';
import { Bird, Bug, Fish, Rabbit, Beer as Deer, Cake as Snake } from 'lucide-react';
import { ClimateData, SoilData, WaterAccessData, GreenProjectType } from '../../../../types';

interface FaunaRecommendationsProps {
  climate: ClimateData;
  soil: SoilData;
  waterAccess: WaterAccessData;
  projectType: GreenProjectType;
}

const FaunaRecommendations: React.FC<FaunaRecommendationsProps> = ({
  climate,
  waterAccess,
  projectType
}) => {
  const [activeSubTab, setActiveSubTab] = useState('birds');

  // Get fauna recommendations based on conditions
  const getRecommendations = () => {
    const avgTemp = climate.temperature.current.avg;
    const annualRainfall = climate.rainfall.annual.total;

    if (avgTemp > 25 && annualRainfall > 2000) {
      // Tropical rainforest ecosystem
      return {
        birds: [
          {
            name: 'Toucan',
            scientificName: 'Ramphastidae family',
            role: 'Seed dispersal',
            habitat: 'Canopy layer',
            benefits: 'Ecosystem engineering, seed distribution',
            diet: 'Fruits, insects, small lizards',
            conservation: 'Vulnerable to habitat loss'
          },
          {
            name: 'Macaw',
            scientificName: 'Ara genus',
            role: 'Seed dispersal',
            habitat: 'Upper canopy',
            benefits: 'Long-distance seed dispersal, indicator species',
            diet: 'Seeds, nuts, fruits',
            conservation: 'Several species endangered'
          },
          {
            name: 'Harpy Eagle',
            scientificName: 'Harpia harpyja',
            role: 'Apex predator',
            habitat: 'Emergent layer',
            benefits: 'Population control, ecosystem balance',
            diet: 'Monkeys, sloths, large birds',
            conservation: 'Near threatened'
          }
        ],
        pollinators: [
          {
            name: 'Orchid Bee',
            scientificName: 'Euglossini tribe',
            role: 'Specialist pollinator',
            benefits: 'Orchid pollination, ecosystem stability',
            habitat: 'Forest understory',
            activity: 'Year-round'
          },
          {
            name: 'Morpho Butterfly',
            scientificName: 'Morpho genus',
            role: 'Generalist pollinator',
            benefits: 'Wide-range pollination, biodiversity indicator',
            habitat: 'All forest layers',
            activity: 'Diurnal'
          },
          {
            name: 'Giant Honey Bee',
            scientificName: 'Apis dorsata',
            role: 'Social pollinator',
            benefits: 'Mass flowering pollination',
            habitat: 'Canopy layer',
            activity: 'Year-round'
          }
        ],
        mammals: [
          {
            name: 'Jaguar',
            scientificName: 'Panthera onca',
            role: 'Apex predator',
            habitat: 'Forest floor to canopy',
            benefits: 'Population control, ecosystem health indicator',
            diet: 'Large mammals, reptiles',
            conservation: 'Near threatened'
          },
          {
            name: 'Spider Monkey',
            scientificName: 'Ateles genus',
            role: 'Seed disperser',
            habitat: 'Upper canopy',
            benefits: 'Long-distance seed dispersal',
            diet: 'Fruits, leaves, seeds',
            conservation: 'Endangered'
          },
          {
            name: 'Tapir',
            scientificName: 'Tapirus terrestris',
            role: 'Herbivore',
            habitat: 'Forest floor',
            benefits: 'Seed dispersal, vegetation management',
            diet: 'Leaves, fruits, aquatic plants',
            conservation: 'Vulnerable'
          }
        ],
        reptiles: [
          {
            name: 'Green Iguana',
            scientificName: 'Iguana iguana',
            role: 'Herbivore',
            habitat: 'Canopy to understory',
            benefits: 'Seed dispersal, nutrient cycling',
            diet: 'Leaves, fruits, flowers',
            conservation: 'Stable'
          },
          {
            name: 'Emerald Tree Boa',
            scientificName: 'Corallus caninus',
            role: 'Predator',
            habitat: 'Canopy layer',
            benefits: 'Population control of small mammals',
            diet: 'Small mammals, birds',
            conservation: 'Stable'
          }
        ],
        aquatic: [
          {
            name: 'Electric Eel',
            scientificName: 'Electrophorus electricus',
            role: 'Predator',
            habitat: 'Rivers and streams',
            benefits: 'Population control, ecosystem balance',
            diet: 'Fish, invertebrates',
            conservation: 'Stable'
          },
          {
            name: 'Giant River Otter',
            scientificName: 'Pteronura brasiliensis',
            role: 'Aquatic predator',
            habitat: 'Rivers and lakes',
            benefits: 'Indicator species, population control',
            diet: 'Fish, crustaceans',
            conservation: 'Endangered'
          },
          {
            name: 'Amazonian Manatee',
            scientificName: 'Trichechus inunguis',
            role: 'Herbivore',
            habitat: 'Rivers and flooded forests',
            benefits: 'Vegetation control, nutrient cycling',
            diet: 'Aquatic plants',
            conservation: 'Vulnerable'
          }
        ],
        invertebrates: [
          {
            name: 'Leaf-cutter Ant',
            scientificName: 'Atta genus',
            role: 'Decomposer',
            habitat: 'Forest floor',
            benefits: 'Soil enrichment, nutrient cycling',
            diet: 'Fungus grown on leaf matter',
            activity: 'Continuous'
          },
          {
            name: 'Giant Centipede',
            scientificName: 'Scolopendra gigantea',
            role: 'Predator',
            habitat: 'Forest floor and understory',
            benefits: 'Insect population control',
            diet: 'Insects, small vertebrates',
            activity: 'Nocturnal'
          },
          {
            name: 'Blue Morpho Butterfly',
            scientificName: 'Morpho peleides',
            role: 'Pollinator',
            habitat: 'All forest layers',
            benefits: 'Pollination, aesthetic value',
            diet: 'Fruit juices, fermented fruit',
            activity: 'Diurnal'
          }
        ]
      };
    } else if (avgTemp > 35 && annualRainfall < 250) {
      // Desert ecosystem
      return {
        birds: [
          {
            name: 'Desert Lark',
            scientificName: 'Ammomanes deserti',
            role: 'Insect control',
            habitat: 'Ground level',
            benefits: 'Pest control, ecosystem indicator',
            diet: 'Seeds, insects',
            conservation: 'Stable'
          },
          {
            name: 'Greater Hoopoe-Lark',
            scientificName: 'Alaemon alaudipes',
            role: 'Insectivore',
            habitat: 'Open desert',
            benefits: 'Pest control',
            diet: 'Insects, small invertebrates',
            conservation: 'Stable'
          }
        ],
        pollinators: [
          {
            name: 'Desert Bee',
            scientificName: 'Anthophora species',
            role: 'Desert specialist',
            benefits: 'Drought-adapted pollination',
            habitat: 'Around desert blooms',
            activity: 'Seasonal'
          },
          {
            name: 'Desert Butterfly',
            scientificName: 'Pontia glauconome',
            role: 'Pollinator',
            benefits: 'Seasonal pollination',
            habitat: 'Desert vegetation patches',
            activity: 'Diurnal'
          }
        ],
        mammals: [
          {
            name: 'Desert Fox',
            scientificName: 'Vulpes zerda',
            role: 'Predator',
            habitat: 'Sandy desert',
            benefits: 'Population control',
            diet: 'Small mammals, insects',
            conservation: 'Least concern'
          },
          {
            name: 'Jerboa',
            scientificName: 'Jaculus jaculus',
            role: 'Seed disperser',
            habitat: 'Sandy areas',
            benefits: 'Seed dispersal, soil aeration',
            diet: 'Seeds, plants',
            conservation: 'Stable'
          }
        ],
        reptiles: [
          {
            name: 'Desert Monitor',
            scientificName: 'Varanus griseus',
            role: 'Predator',
            habitat: 'Desert terrain',
            benefits: 'Population control',
            diet: 'Small vertebrates, eggs',
            conservation: 'Stable'
          },
          {
            name: 'Horned Viper',
            scientificName: 'Cerastes cerastes',
            role: 'Predator',
            habitat: 'Sandy areas',
            benefits: 'Rodent control',
            diet: 'Small mammals, lizards',
            conservation: 'Stable'
          }
        ],
        invertebrates: [
          {
            name: 'Desert Scorpion',
            scientificName: 'Androctonus genus',
            role: 'Predator',
            habitat: 'Desert substrate',
            benefits: 'Insect control',
            diet: 'Insects, small vertebrates',
            activity: 'Nocturnal'
          },
          {
            name: 'Dung Beetle',
            scientificName: 'Scarabaeus genus',
            role: 'Decomposer',
            habitat: 'Desert floor',
            benefits: 'Nutrient cycling',
            diet: 'Animal dung',
            activity: 'Diurnal'
          }
        ]
      };
    } else {
      // Temperate ecosystem
      return {
        birds: [
          {
            name: 'Northern Cardinal',
            scientificName: 'Cardinalis cardinalis',
            role: 'Seed dispersal',
            habitat: 'Understory',
            benefits: 'Seed dispersal, ecosystem health indicator',
            diet: 'Seeds, insects, fruits',
            conservation: 'Stable'
          },
          {
            name: 'American Robin',
            scientificName: 'Turdus migratorius',
            role: 'Insect control',
            habitat: 'Ground to canopy',
            benefits: 'Pest control, fruit dispersal',
            diet: 'Insects, fruits, worms',
            conservation: 'Stable'
          },
          {
            name: 'Red-tailed Hawk',
            scientificName: 'Buteo jamaicensis',
            role: 'Predator',
            habitat: 'Canopy and open areas',
            benefits: 'Population control of small mammals',
            diet: 'Small mammals, birds',
            conservation: 'Stable'
          }
        ],
        pollinators: [
          {
            name: 'Bumblebee',
            scientificName: 'Bombus species',
            role: 'Primary pollinator',
            benefits: 'Efficient pollination, native plant specialist',
            habitat: 'Various vegetation layers',
            activity: 'Diurnal, seasonal'
          },
          {
            name: 'Monarch Butterfly',
            scientificName: 'Danaus plexippus',
            role: 'Specialist pollinator',
            benefits: 'Migration indicator, conservation flagship',
            habitat: 'Open areas, gardens',
            activity: 'Seasonal migration'
          },
          {
            name: 'Mason Bee',
            scientificName: 'Osmia species',
            role: 'Early season pollinator',
            benefits: 'Early spring pollination',
            habitat: 'Woodland edges',
            activity: 'Spring active'
          }
        ],
        mammals: [
          {
            name: 'White-tailed Deer',
            scientificName: 'Odocoileus virginianus',
            role: 'Herbivore',
            habitat: 'Forest and edge areas',
            benefits: 'Vegetation management, seed dispersal',
            diet: 'Leaves, twigs, fruits',
            conservation: 'Stable'
          },
          {
            name: 'Red Fox',
            scientificName: 'Vulpes vulpes',
            role: 'Predator',
            habitat: 'Various habitats',
            benefits: 'Population control, seed dispersal',
            diet: 'Small mammals, birds, fruits',
            conservation: 'Stable'
          },
          {
            name: 'Eastern Gray Squirrel',
            scientificName: 'Sciurus carolinensis',
            role: 'Seed disperser',
            habitat: 'Forest canopy',
            benefits: 'Tree regeneration, seed dispersal',
            diet: 'Nuts, seeds, buds',
            conservation: 'Stable'
          }
        ],
        reptiles: [
          {
            name: 'Eastern Box Turtle',
            scientificName: 'Terrapene carolina',
            role: 'Omnivore',
            habitat: 'Forest floor',
            benefits: 'Seed dispersal, insect control',
            diet: 'Insects, fruits, vegetation',
            conservation: 'Vulnerable'
          },
          {
            name: 'Black Rat Snake',
            scientificName: 'Pantherophis obsoletus',
            role: 'Predator',
            habitat: 'Various forest layers',
            benefits: 'Rodent control',
            diet: 'Small mammals, birds',
            conservation: 'Stable'
          }
        ],
        aquatic: waterAccess.accessRating === 'High' ? [
          {
            name: 'Brook Trout',
            scientificName: 'Salvelinus fontinalis',
            role: 'Aquatic predator',
            habitat: 'Streams and rivers',
            benefits: 'Water quality indicator, ecosystem balance',
            diet: 'Aquatic insects, small fish',
            conservation: 'Sensitive to pollution'
          },
          {
            name: 'Northern River Otter',
            scientificName: 'Lontra canadensis',
            role: 'Aquatic predator',
            habitat: 'Rivers and lakes',
            benefits: 'Population control, indicator species',
            diet: 'Fish, crayfish',
            conservation: 'Stable'
          },
          {
            name: 'Yellow Perch',
            scientificName: 'Perca flavescens',
            role: 'Mid-level predator',
            habitat: 'Lakes and rivers',
            benefits: 'Food web stability',
            diet: 'Small fish, invertebrates',
            conservation: 'Stable'
          }
        ] : [],
        invertebrates: [
          {
            name: 'Earth Worm',
            scientificName: 'Lumbricus terrestris',
            role: 'Decomposer',
            habitat: 'Soil layer',
            benefits: 'Soil aeration, nutrient cycling',
            diet: 'Organic matter',
            activity: 'Continuous'
          },
          {
            name: 'Orb Weaver Spider',
            scientificName: 'Araneidae family',
            role: 'Predator',
            habitat: 'Various vegetation layers',
            benefits: 'Insect control',
            diet: 'Flying insects',
            activity: 'Nocturnal'
          },
          {
            name: 'Millipede',
            scientificName: 'Diplopoda class',
            role: 'Decomposer',
            habitat: 'Forest floor',
            benefits: 'Nutrient cycling',
            diet: 'Dead plant matter',
            activity: 'Continuous'
          }
        ]
      };
    }
  };

  const recommendations = getRecommendations();

  const tabs = [
    { id: 'birds', label: 'Birds', icon: <Bird size={16} /> },
    { id: 'pollinators', label: 'Pollinators', icon: <Bug size={16} /> },
    { id: 'mammals', label: 'Mammals', icon: <Deer size={16} /> },
    { id: 'reptiles', label: 'Reptiles', icon: <Snake size={16} /> },
    { id: 'invertebrates', label: 'Invertebrates', icon: <Bug size={16} /> },
    ...(recommendations.aquatic?.length > 0 ? [{ id: 'aquatic', label: 'Aquatic', icon: <Fish size={16} /> }] : [])
  ];

  return (
    <div className="space-y-4">
      {/* Fauna Subcategory Tabs */}
      <div className="flex flex-wrap gap-2">
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

      {/* Fauna Content */}
      <div className="space-y-4">
        {recommendations[activeSubTab as keyof typeof recommendations]?.map((animal, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-forest-100">
            <div className="flex items-start justify-between">
              <div>
                <h5 className="font-medium text-forest-900">{animal.name}</h5>
                <p className="text-sm text-gray-600 italic">{animal.scientificName}</p>
              </div>
            </div>
            <div className="mt-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
              <p className="text-gray-600">Role: {animal.role}</p>
              <p className="text-gray-600">Habitat: {animal.habitat}</p>
              {'diet' in animal && <p className="text-gray-600">Diet: {animal.diet}</p>}
              {'activity' in animal && <p className="text-gray-600">Activity: {animal.activity}</p>}
              {'conservation' in animal && (
                <p className="text-gray-600">Conservation: {animal.conservation}</p>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-700">{animal.benefits}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaunaRecommendations;
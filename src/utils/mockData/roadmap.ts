import { ImplementationRoadmap } from '../../types';

export const generateRoadmapData = (regionId: string): ImplementationRoadmap => {
  const basePhases = [
    {
      number: 1,
      name: "Site Assessment & Ecological Planning",
      duration: 6,
      objectives: [
        "Comprehensive ecological survey and mapping",
        "Soil composition and health analysis",
        "Water resource assessment",
        "Native species identification",
        "Stakeholder engagement and community consultation",
        "Resource planning and procurement strategy",
        "Detailed flora and fauna inventory",
        "Microclimate analysis and mapping",
        "Seasonal variation study",
        "Ecosystem service baseline assessment"
      ],
      humanAssistance: [
        {
          taskType: "Ecological Assessment",
          hoursPerWeek: 30,
          skillLevel: "Expert",
          automationPotential: 40
        },
        {
          taskType: "Community Engagement",
          hoursPerWeek: 20,
          skillLevel: "Advanced",
          automationPotential: 25
        },
        {
          taskType: "Data Analysis",
          hoursPerWeek: 15,
          skillLevel: "Expert",
          automationPotential: 60
        }
      ],
      risks: [
        "Incomplete ecological data",
        "Seasonal variations affecting assessment",
        "Stakeholder conflicts",
        "Resource availability constraints",
        "Microclimatic variations",
        "Species interaction uncertainties"
      ],
      mitigations: [
        "Multiple survey periods",
        "Advanced monitoring systems",
        "Inclusive stakeholder framework",
        "Diversified resource planning",
        "Detailed microclimate modeling",
        "Species compatibility analysis"
      ],
      sustainabilityMilestones: [
        {
          month: 1,
          description: "Baseline ecological assessment",
          indicators: [
            "Biodiversity index",
            "Soil quality metrics",
            "Water availability",
            "Native species presence",
            "Ecosystem health indicators"
          ]
        },
        {
          month: 3,
          description: "Species selection framework",
          indicators: [
            "Native species inventory",
            "Growth potential analysis",
            "Species interaction matrix",
            "Habitat suitability index"
          ]
        },
        {
          month: 5,
          description: "Resource management plan",
          indicators: [
            "Water efficiency",
            "Soil enhancement strategy",
            "Nutrient cycling potential",
            "Carbon sequestration baseline"
          ]
        }
      ]
    },
    {
      number: 2,
      name: "Foundation Species Introduction",
      duration: 12,
      objectives: [
        "Primary canopy species planting",
        "Pioneer species establishment",
        "Soil preparation and enhancement",
        "Water management system implementation",
        "Protection infrastructure setup",
        "Monitoring system deployment",
        "Mycorrhizal network establishment",
        "Microhabitat creation",
        "Soil microbiome enhancement",
        "Initial pollinator attraction"
      ],
      humanAssistance: [
        {
          taskType: "Planting Operations",
          hoursPerWeek: 40,
          skillLevel: "Intermediate",
          automationPotential: 35
        },
        {
          taskType: "Water System Installation",
          hoursPerWeek: 30,
          skillLevel: "Expert",
          automationPotential: 40
        },
        {
          taskType: "Monitoring Setup",
          hoursPerWeek: 20,
          skillLevel: "Advanced",
          automationPotential: 70
        }
      ],
      risks: [
        "Species mortality",
        "Water system failures",
        "Soil stability issues",
        "Weather extremes",
        "Pest invasions",
        "Root establishment failure"
      ],
      mitigations: [
        "Diverse species selection",
        "Redundant irrigation systems",
        "Soil stabilization techniques",
        "Weather protection measures",
        "Integrated pest management",
        "Root zone optimization"
      ],
      sustainabilityMilestones: [
        {
          month: 3,
          description: "Foundation planting complete",
          indicators: [
            "Survival rate",
            "Growth metrics",
            "Soil stability",
            "Root development index"
          ]
        },
        {
          month: 6,
          description: "Water system optimization",
          indicators: [
            "Water use efficiency",
            "Distribution uniformity",
            "Soil moisture levels",
            "Plant stress indicators"
          ]
        },
        {
          month: 9,
          description: "Early ecosystem indicators",
          indicators: [
            "Soil microbiome",
            "Insect diversity",
            "Root development",
            "Nutrient cycling efficiency"
          ]
        }
      ]
    },
    {
      number: 3,
      name: "Ecosystem Diversification",
      duration: 18,
      objectives: [
        "Secondary species introduction",
        "Understory development",
        "Pollinator habitat creation",
        "Wildlife corridor establishment",
        "Soil food web enhancement",
        "Community training programs",
        "Beneficial insect attraction",
        "Native herb layer establishment",
        "Vertical habitat development",
        "Ecological network strengthening"
      ],
      humanAssistance: [
        {
          taskType: "Ecosystem Management",
          hoursPerWeek: 35,
          skillLevel: "Expert",
          automationPotential: 45
        },
        {
          taskType: "Wildlife Monitoring",
          hoursPerWeek: 20,
          skillLevel: "Advanced",
          automationPotential: 65
        },
        {
          taskType: "Community Training",
          hoursPerWeek: 15,
          skillLevel: "Advanced",
          automationPotential: 30
        }
      ],
      risks: [
        "Ecosystem imbalances",
        "Invasive species competition",
        "Pollinator limitations",
        "Climate stress events",
        "Predator-prey imbalances",
        "Nutrient competition"
      ],
      mitigations: [
        "Biodiversity monitoring",
        "Early detection systems",
        "Habitat enhancement",
        "Climate resilience strategies",
        "Food web management",
        "Resource partitioning"
      ],
      sustainabilityMilestones: [
        {
          month: 6,
          description: "Biodiversity enrichment",
          indicators: [
            "Species richness",
            "Habitat complexity",
            "Food web development",
            "Ecological resilience"
          ]
        },
        {
          month: 12,
          description: "Wildlife integration",
          indicators: [
            "Animal presence",
            "Nesting sites",
            "Migration patterns",
            "Territory establishment"
          ]
        },
        {
          month: 18,
          description: "Ecosystem stability",
          indicators: [
            "Resilience metrics",
            "Self-regulation indicators",
            "Species interaction strength",
            "Nutrient cycling efficiency"
          ]
        }
      ]
    },
    {
      number: 4,
      name: "Ecosystem Maturation & Integration",
      duration: 24,
      objectives: [
        "Ecological network strengthening",
        "Advanced species introduction",
        "Natural regeneration support",
        "Long-term monitoring establishment",
        "Community management transition",
        "Research and documentation",
        "Keystone species support",
        "Ecosystem service enhancement",
        "Climate resilience building",
        "Knowledge transfer systems"
      ],
      humanAssistance: [
        {
          taskType: "System Optimization",
          hoursPerWeek: 25,
          skillLevel: "Expert",
          automationPotential: 55
        },
        {
          taskType: "Research Coordination",
          hoursPerWeek: 20,
          skillLevel: "Expert",
          automationPotential: 45
        },
        {
          taskType: "Community Leadership",
          hoursPerWeek: 15,
          skillLevel: "Advanced",
          automationPotential: 25
        }
      ],
      risks: [
        "System complexity challenges",
        "Long-term sustainability",
        "Community engagement decline",
        "Climate change impacts",
        "Ecological succession disruption",
        "Resource competition"
      ],
      mitigations: [
        "Adaptive management systems",
        "Sustainable funding mechanisms",
        "Leadership development",
        "Climate adaptation planning",
        "Succession modeling",
        "Resource optimization"
      ],
      sustainabilityMilestones: [
        {
          month: 6,
          description: "Ecosystem services assessment",
          indicators: [
            "Carbon sequestration",
            "Water regulation",
            "Soil fertility",
            "Biodiversity support"
          ]
        },
        {
          month: 12,
          description: "Community ownership",
          indicators: [
            "Management capacity",
            "Local leadership",
            "Resource stewardship",
            "Knowledge transfer"
          ]
        },
        {
          month: 24,
          description: "Long-term stability",
          indicators: [
            "Self-sustainability",
            "Regeneration capacity",
            "Adaptive potential",
            "Ecosystem resilience"
          ]
        }
      ]
    }
  ];

  const baseTransitions = [
    {
      fromPhase: 1,
      toPhase: 2,
      estimatedTiming: 6,
      criteria: [
        "Complete ecological baseline established",
        "Species selection finalized",
        "Resource procurement secured",
        "Community support confirmed",
        "Site preparation completed",
        "Monitoring systems ready",
        "Soil preparation verified",
        "Water systems tested",
        "Initial species acclimated",
        "Protection measures in place"
      ]
    },
    {
      fromPhase: 2,
      toPhase: 3,
      estimatedTiming: 12,
      criteria: [
        "Foundation species survival >80%",
        "Water system optimization complete",
        "Soil stability achieved",
        "Initial biodiversity indicators positive",
        "Protection measures effective",
        "Monitoring data validated",
        "Root systems established",
        "Microclimate formation observed",
        "Nutrient cycling initiated",
        "Pioneer species thriving"
      ]
    },
    {
      fromPhase: 3,
      toPhase: 4,
      estimatedTiming: 18,
      criteria: [
        "Ecosystem diversity targets met",
        "Wildlife integration confirmed",
        "Soil food web established",
        "Community engagement strong",
        "Natural regeneration observed",
        "Resilience indicators positive",
        "Keystone species present",
        "Ecological networks functioning",
        "Succession patterns emerging",
        "Ecosystem services measurable"
      ]
    }
  ];

  // Customize based on region
  let phases = [...basePhases];
  let transitions = [...baseTransitions];

  switch (regionId) {
    case 'amazon':
      // Rainforest-specific modifications
      phases[0].objectives = [
        ...phases[0].objectives,
        "Canopy structure analysis",
        "Epiphyte habitat assessment",
        "Rainfall interception study",
        "Understory light mapping"
      ];
      
      phases[1].objectives = [
        ...phases[1].objectives,
        "Multi-layer canopy establishment",
        "Epiphyte support structure creation",
        "Humidity retention systems",
        "Vertical habitat development"
      ];
      
      phases[2].objectives = [
        ...phases[2].objectives,
        "Epiphyte introduction",
        "Canopy connectivity enhancement",
        "Arboreal habitat creation",
        "Rainforest specialist species support"
      ];
      
      phases[3].objectives = [
        ...phases[3].objectives,
        "Rainforest connectivity enhancement",
        "Canopy ecosystem maturation",
        "Specialist species integration",
        "Tropical biodiversity optimization"
      ];
      
      transitions[0].criteria = [
        ...transitions[0].criteria,
        "Canopy structure plan approved",
        "Vertical zonation mapped",
        "Humidity management planned"
      ];
      
      transitions[1].criteria = [
        ...transitions[1].criteria,
        "Vertical layering established",
        "Microclimate stability achieved",
        "Canopy closure initiated"
      ];
      
      transitions[2].criteria = [
        ...transitions[2].criteria,
        "Epiphyte colonization observed",
        "Arboreal wildlife present",
        "Vertical connectivity confirmed"
      ];
      break;

    case 'sahara':
      // Desert ecosystem modifications
      phases[0].objectives = [
        ...phases[0].objectives,
        "Sand stabilization assessment",
        "Wind pattern analysis",
        "Drought resistance evaluation",
        "Heat stress mapping"
      ];
      
      phases[1].objectives = [
        ...phases[1].objectives,
        "Drought-resistant pioneer establishment",
        "Sand stabilization infrastructure",
        "Water conservation systems",
        "Heat protection measures"
      ];
      
      phases[2].objectives = [
        ...phases[2].objectives,
        "Desert wildlife corridor creation",
        "Xerophyte introduction",
        "Microhabitat enhancement",
        "Dune ecosystem development"
      ];
      
      phases[3].objectives = [
        ...phases[3].objectives,
        "Oasis ecosystem development",
        "Desert biodiversity enhancement",
        "Thermal regulation optimization",
        "Water cycle establishment"
      ];
      
      transitions[0].criteria = [
        ...transitions[0].criteria,
        "Sand stabilization plan ready",
        "Water conservation strategy approved",
        "Heat management planned"
      ];
      
      transitions[1].criteria = [
        ...transitions[1].criteria,
        "Pioneer species established",
        "Soil stabilization achieved",
        "Water efficiency confirmed"
      ];
      
      transitions[2].criteria = [
        ...transitions[2].criteria,
        "Wildlife adaptation confirmed",
        "Xerophytic community stable",
        "Microclimate establishment"
      ];
      break;

    case 'great-plains':
      // Grassland ecosystem modifications
      phases[0].objectives = [
        ...phases[0].objectives,
        "Prairie system analysis",
        "Grass species assessment",
        "Grazing potential evaluation",
        "Fire regime planning"
      ];
      
      phases[1].objectives = [
        ...phases[1].objectives,
        "Native grass establishment",
        "Prairie forb introduction",
        "Root system development",
        "Soil structure enhancement"
      ];
      
      phases[2].objectives = [
        ...phases[2].objectives,
        "Grazing system integration",
        "Prairie diversity enhancement",
        "Fire management implementation",
        "Grassland wildlife support"
      ];
      
      phases[3].objectives = [
        ...phases[3].objectives,
        "Prairie-forest edge development",
        "Grassland maturation",
        "Grazing optimization",
        "Prairie ecosystem completion"
      ];
      
      transitions[0].criteria = [
        ...transitions[0].criteria,
        "Prairie restoration plan approved",
        "Species mix validated",
        "Soil preparation confirmed"
      ];
      
      transitions[1].criteria = [
        ...transitions[1].criteria,
        "Grass coverage targets met",
        "Root systems established",
        "Prairie structure forming"
      ];
      
      transitions[2].criteria = [
        ...transitions[2].criteria,
        "Grazing patterns established",
        "Prairie diversity achieved",
        "Ecosystem functions confirmed"
      ];
      break;
  }

  return {
    phases,
    transitions
  };
};
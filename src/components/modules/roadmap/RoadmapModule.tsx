import React from 'react';
import { Clock, Users, Target, AlertTriangle, Leaf, TreePine, Cloud, Droplets } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import InfoPanel from '../../common/InfoPanel';
import LoadingSpinner from '../../common/LoadingSpinner';

const RoadmapModule: React.FC = () => {
  const { selectedRegion, isLoading } = useRegion();

  if (isLoading) {
    return <LoadingSpinner text="Loading roadmap data..." />;
  }

  if (!selectedRegion || !selectedRegion.simulationSetup?.implementationRoadmap) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please complete the simulation setup first to view the implementation roadmap.</p>
      </div>
    );
  }

  const { implementationRoadmap } = selectedRegion.simulationSetup;
  const { climate, soil, waterAccess } = selectedRegion;

  // Calculate success metrics based on environmental conditions
  const getSuccessMetrics = () => {
    const metrics = {
      establishmentProbability: 0,
      growthRate: 0,
      maintenanceIntensity: 0,
      interventionFrequency: 0
    };

    // Calculate based on climate
    if (climate.rainfall.annual.total > 1000) {
      metrics.establishmentProbability += 30;
      metrics.growthRate += 30;
    } else if (climate.rainfall.annual.total > 500) {
      metrics.establishmentProbability += 20;
      metrics.growthRate += 20;
    } else {
      metrics.establishmentProbability += 10;
      metrics.growthRate += 10;
      metrics.maintenanceIntensity += 20;
      metrics.interventionFrequency += 20;
    }

    // Adjust based on soil quality
    if (soil.nutrientIndex === 'High') {
      metrics.establishmentProbability += 20;
      metrics.growthRate += 20;
    } else if (soil.nutrientIndex === 'Medium') {
      metrics.establishmentProbability += 15;
      metrics.growthRate += 15;
      metrics.maintenanceIntensity += 10;
    } else {
      metrics.establishmentProbability += 10;
      metrics.growthRate += 10;
      metrics.maintenanceIntensity += 20;
    }

    // Adjust based on water access
    if (waterAccess.accessRating === 'High') {
      metrics.establishmentProbability += 20;
      metrics.growthRate += 20;
    } else if (waterAccess.accessRating === 'Medium') {
      metrics.establishmentProbability += 15;
      metrics.growthRate += 15;
      metrics.maintenanceIntensity += 10;
    } else {
      metrics.establishmentProbability += 10;
      metrics.growthRate += 10;
      metrics.maintenanceIntensity += 20;
      metrics.interventionFrequency += 20;
    }

    return metrics;
  };

  const successMetrics = getSuccessMetrics();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-forest-100 to-earth-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-forest-900 mb-2">Implementation Roadmap</h2>
        <p className="text-forest-800">Phase-by-phase guide to project execution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Success Metrics Panel */}
        <InfoPanel
          title="Implementation Success Metrics"
          icon={<Target size={20} />}
          className="md:col-span-3"
        >
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-forest-50 p-4 rounded-lg border border-forest-100">
                <div className="text-sm text-forest-600 mb-1">Establishment Probability</div>
                <div className="text-2xl font-bold text-forest-800">{successMetrics.establishmentProbability}%</div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-forest-500 rounded-full"
                    style={{ width: `${successMetrics.establishmentProbability}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-forest-50 p-4 rounded-lg border border-forest-100">
                <div className="text-sm text-forest-600 mb-1">Growth Rate</div>
                <div className="text-2xl font-bold text-forest-800">{successMetrics.growthRate}%</div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-forest-500 rounded-full"
                    style={{ width: `${successMetrics.growthRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-forest-50 p-4 rounded-lg border border-forest-100">
                <div className="text-sm text-forest-600 mb-1">Maintenance Intensity</div>
                <div className="text-2xl font-bold text-forest-800">{successMetrics.maintenanceIntensity}%</div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-forest-500 rounded-full"
                    style={{ width: `${successMetrics.maintenanceIntensity}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-forest-50 p-4 rounded-lg border border-forest-100">
                <div className="text-sm text-forest-600 mb-1">Intervention Frequency</div>
                <div className="text-2xl font-bold text-forest-800">{successMetrics.interventionFrequency}%</div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-forest-500 rounded-full"
                    style={{ width: `${successMetrics.interventionFrequency}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </InfoPanel>

        {/* Environmental Conditions Impact */}
        <InfoPanel
          title="Environmental Impact Analysis"
          icon={<Leaf size={20} />}
          className="md:col-span-3"
        >
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                <div className="flex items-center mb-3">
                  <Cloud className="text-sky-600 mr-2" size={20} />
                  <h3 className="font-medium text-sky-900">Climate Impact</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Annual Rainfall</span>
                    <span className="font-medium">{climate.rainfall.annual.total} mm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Temperature Range</span>
                    <span className="font-medium">{climate.temperature.current.min}°C - {climate.temperature.current.max}°C</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Humidity</span>
                    <span className="font-medium">{climate.humidity}%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100">
                <div className="flex items-center mb-3">
                  <TreePine className="text-earth-600 mr-2" size={20} />
                  <h3 className="font-medium text-earth-900">Soil Conditions</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Soil Type</span>
                    <span className="font-medium">{soil.type}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">pH Level</span>
                    <span className="font-medium">{soil.ph}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Nutrient Index</span>
                    <span className="font-medium">{soil.nutrientIndex}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                <div className="flex items-center mb-3">
                  <Droplets className="text-sky-600 mr-2" size={20} />
                  <h3 className="font-medium text-sky-900">Water Resources</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Access Rating</span>
                    <span className="font-medium">{waterAccess.accessRating}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span className="font-medium">{waterAccess.recommendedWaterMethod}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Dry Season</span>
                    <span className="font-medium">{waterAccess.seasonalVariation.drySeasonLength} months</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </InfoPanel>

        {/* Phase Transitions */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Phase Transitions</h3>
          <div className="relative">
            {implementationRoadmap.transitions?.map((transition, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-forest-100 rounded-full">
                    <span className="text-xl font-bold text-forest-700">P{transition.fromPhase}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-forest-200 rounded-full relative">
                      <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
                        <span className="text-sm font-medium text-forest-700">{transition.estimatedTiming} months</span>
                      </div>
                      <div className="h-2 bg-forest-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center bg-forest-100 rounded-full">
                    <span className="text-xl font-bold text-forest-700">P{transition.toPhase}</span>
                  </div>
                </div>

                <div className="ml-24 bg-white rounded-lg border border-forest-100 p-4">
                  <h4 className="text-forest-800 font-medium mb-3">Transition Criteria</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transition.criteria?.map((criterion, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="w-2 h-2 mt-2 bg-forest-400 rounded-full"></div>
                        <span className="text-sm text-gray-700">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Phases */}
        {implementationRoadmap.phases.map((phase) => (
          <InfoPanel
            key={phase.number}
            title={`Phase ${phase.number}: ${phase.name}`}
            icon={<Clock size={20} />}
            className="md:col-span-3"
          >
            <div className="p-4">
              <div className="mb-4">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="text-lg font-medium text-gray-900">{phase.duration} months</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Target className="mr-2" size={16} />
                    Objectives
                  </h4>
                  <ul className="space-y-2">
                    {phase.objectives?.map((objective, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-forest-400 rounded-full mr-2 mt-1.5"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="mr-2" size={16} />
                    Human Assistance
                  </h4>
                  {phase.humanAssistance?.map((assistance, index) => (
                    <div key={index} className="mb-3 p-2 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium text-gray-700">
                        {assistance.taskType}
                      </div>
                      <div className="text-xs text-gray-500">
                        {assistance.hoursPerWeek} hours/week • {assistance.skillLevel} level
                      </div>
                      <div className="mt-1 h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-1.5 bg-forest-500 rounded-full"
                          style={{ width: `${assistance.automationPotential}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {assistance.automationPotential}% automation potential
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <AlertTriangle className="mr-2" size={16} />
                  Risks & Mitigations
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 rounded-md">
                    <div className="text-sm font-medium text-red-800 mb-2">Risks</div>
                    <ul className="space-y-1">
                      {phase.risks?.map((risk, index) => (
                        <li key={index} className="text-sm text-red-600">
                          • {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <div className="text-sm font-medium text-green-800 mb-2">Mitigations</div>
                    <ul className="space-y-1">
                      {phase.mitigations?.map((mitigation, index) => (
                        <li key={index} className="text-sm text-green-600">
                          • {mitigation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {phase.sustainabilityMilestones?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Sustainability Milestones
                  </h4>
                  <div className="space-y-3">
                    {phase.sustainabilityMilestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="p-3 border border-forest-100 rounded-md bg-forest-50"
                      >
                        <div className="text-sm font-medium text-forest-800">
                          Month {milestone.month}: {milestone.description}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {milestone.indicators?.map((indicator, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-forest-100 text-forest-700 rounded"
                            >
                              {indicator}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </InfoPanel>
        ))}
      </div>
    </div>
  );
};

export default RoadmapModule;
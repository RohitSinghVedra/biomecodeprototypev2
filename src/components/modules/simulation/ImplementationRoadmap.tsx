import React from 'react';
import { Clock, Users, Target, AlertTriangle } from 'lucide-react';
import { ImplementationRoadmap as RoadmapType } from '../../../types';
import InfoPanel from '../../common/InfoPanel';

interface ImplementationRoadmapProps {
  roadmap: RoadmapType;
}

const ImplementationRoadmap: React.FC<ImplementationRoadmapProps> = ({ roadmap }) => {
  if (!roadmap || !roadmap.phases) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No roadmap data available yet. Please complete the simulation setup.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-forest-100 to-earth-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-forest-900 mb-2">Implementation Roadmap</h2>
        <p className="text-forest-800">Phase-by-phase guide to project execution</p>
      </div>

      <div className="space-y-6">
        {roadmap.phases.map((phase) => (
          <InfoPanel
            key={phase.number}
            title={`Phase ${phase.number}: ${phase.name}`}
            icon={<Clock size={20} />}
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

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Phase Transitions</h3>
          <div className="relative">
            {roadmap.transitions?.map((transition, index) => (
              <div
                key={index}
                className="flex items-center mb-4"
              >
                <div className="w-12 text-center font-medium text-forest-600">
                  P{transition.fromPhase}
                </div>
                <div className="flex-grow h-0.5 bg-forest-200 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                    {transition.estimatedTiming} months
                  </div>
                </div>
                <div className="w-12 text-center font-medium text-forest-600">
                  P{transition.toPhase}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
                  <div className="bg-forest-50 border border-forest-200 p-2 rounded-md">
                    <div className="text-sm font-medium text-forest-800 mb-1">
                      Transition Criteria
                    </div>
                    <ul className="text-xs text-forest-600">
                      {transition.criteria?.map((criterion, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-forest-400 rounded-full mr-1"></span>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationRoadmap;
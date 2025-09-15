import React from 'react';
import { YearlyImpact } from '../../../types';
import { Sprout, TreePine } from 'lucide-react';

interface ImpactTimelineProps {
  yearlyImpacts: YearlyImpact[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const ImpactTimeline: React.FC<ImpactTimelineProps> = ({ 
  yearlyImpacts, 
  selectedYear,
  onYearChange
}) => {
  const totalYears = yearlyImpacts.length;
  
  // Get data for the selected year
  const selectedYearData = yearlyImpacts.find(impact => impact.year === selectedYear) || yearlyImpacts[0];
  
  // Calculate forest development stage
  const getForestStage = (year: number) => {
    if (year <= 2) return 'Establishment Phase';
    if (year <= 5) return 'Early Growth Phase';
    if (year <= 10) return 'Development Phase';
    if (year <= 15) return 'Maturing Phase';
    return 'Mature Forest Phase';
  };
  
  const forestStage = getForestStage(selectedYear);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-forest-100 rounded-md mr-3">
            {selectedYear <= 5 ? (
              <Sprout size={24} className="text-forest-600" />
            ) : (
              <TreePine size={24} className="text-forest-700" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-800">Year {selectedYear}</h3>
            <p className="text-sm text-forest-600">{forestStage}</p>
          </div>
        </div>
        
        <div>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
            className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm rounded-md"
          >
            {yearlyImpacts.map(impact => (
              <option key={impact.year} value={impact.year}>Year {impact.year}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div 
            className="h-2 bg-forest-600 rounded-full transition-all duration-300"
            style={{ width: `${(selectedYear / totalYears) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mb-2">
          {[0, 5, 10, 15, 20].filter(year => year <= totalYears).map(year => (
            <div key={year} className="text-center">
              <button
                onClick={() => onYearChange(year || 1)}
                className={`w-4 h-4 rounded-full mb-1 transition-all ${
                  year <= selectedYear 
                    ? 'bg-forest-600 ring-2 ring-forest-300' 
                    : 'bg-gray-300'
                }`}
              ></button>
              <div className="text-xs text-gray-600">{year || 1}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-forest-50 border border-forest-100 rounded-lg">
        <h4 className="text-lg font-medium text-forest-800 mb-2">Ecological Milestone</h4>
        <p className="text-gray-700">
          {selectedYear <= 2 && 'Initial planting and establishment. Seedlings are vulnerable and require care during this phase.'}
          {selectedYear > 2 && selectedYear <= 5 && 'Early growth with increasing biodiversity. Pioneers are establishing and creating microclimates.'}
          {selectedYear > 5 && selectedYear <= 10 && 'Significant canopy development. Carbon sequestration rates are accelerating and soil is improving.'}
          {selectedYear > 10 && selectedYear <= 15 && 'Emerging forest ecosystem with well-established biodiversity. Local climate effects are becoming significant.'}
          {selectedYear > 15 && 'Mature forest ecosystem with complex interactions. Maximum carbon sequestration and biodiversity values.'}
        </p>
      </div>
    </div>
  );
};

export default ImpactTimeline;
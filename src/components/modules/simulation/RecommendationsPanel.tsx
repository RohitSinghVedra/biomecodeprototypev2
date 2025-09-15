import React, { useState } from 'react';
import { Leaf, Bird } from 'lucide-react';
import { ClimateData, SoilData, WaterAccessData, GreenProjectType } from '../../../types';
import FloraRecommendations from './recommendations/FloraRecommendations';
import FaunaRecommendations from './recommendations/FaunaRecommendations';

interface RecommendationsPanelProps {
  climate: ClimateData;
  soil: SoilData;
  waterAccess: WaterAccessData;
  projectType: GreenProjectType;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'flora' | 'fauna'>('flora');

  return (
    <div className="space-y-4">
      {/* Main Flora/Fauna Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
            activeTab === 'flora'
              ? 'border-forest-500 text-forest-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('flora')}
        >
          <Leaf className="mr-2" size={16} />
          Flora
        </button>
        <button
          className={`flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
            activeTab === 'fauna'
              ? 'border-forest-500 text-forest-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('fauna')}
        >
          <Bird className="mr-2" size={16} />
          Fauna
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'flora' ? (
          <FloraRecommendations {...props} />
        ) : (
          <FaunaRecommendations {...props} />
        )}
      </div>
    </div>
  );
};

export default RecommendationsPanel;
import React from 'react';
import { CloudRain, Thermometer, Wind, Droplets, Sun, Cloud } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import InfoPanel from '../../common/InfoPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import TemperatureChart from './TemperatureChart';
import RainfallChart from './RainfallChart';
import CloudCoverageChart from './CloudCoverageChart';
import SunlightChart from './SunlightChart';
import ClimateIndicators from './ClimateIndicators';

const ClimateModule: React.FC = () => {
  const { selectedRegion, isLoading } = useRegion();
  
  if (isLoading) {
    return <LoadingSpinner text="Loading climate data..." />;
  }
  
  if (!selectedRegion?.region || !selectedRegion?.climate) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please select a region first to view climate data.</p>
      </div>
    );
  }
  
  const { climate, region } = selectedRegion;
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-sky-900 mb-2">Climate Intelligence</h2>
        <p className="text-sky-800">{selectedRegion.region.name} - Climate Analysis</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoPanel
          title="Temperature Data"
          icon={<Thermometer size={20} />}
          className="md:col-span-3"
        >
          <div className="p-2">
            <div className="mb-4 grid grid-cols-3 gap-4 text-center">
              <div className="bg-sky-50 p-3 rounded-lg">
                <div className="text-sky-800 text-sm font-medium">Min Temp</div>
                <div className="text-2xl font-bold text-sky-900">{climate.temperature.current.min.toFixed(1)}°C</div>
              </div>
              <div className="bg-sky-50 p-3 rounded-lg">
                <div className="text-sky-800 text-sm font-medium">Avg Temp</div>
                <div className="text-2xl font-bold text-sky-900">{climate.temperature.current.avg.toFixed(1)}°C</div>
              </div>
              <div className="bg-sky-50 p-3 rounded-lg">
                <div className="text-sky-800 text-sm font-medium">Max Temp</div>
                <div className="text-2xl font-bold text-sky-900">{climate.temperature.current.max.toFixed(1)}°C</div>
              </div>
            </div>
            
            <div className="mt-4 h-60">
              <TemperatureChart temperatureData={climate.temperature} />
            </div>
          </div>
        </InfoPanel>
        
        <InfoPanel
          title="Rainfall Data"
          icon={<CloudRain size={20} />}
          className="md:col-span-3"
        >
          <div className="p-2">
            <div className="mb-4 grid grid-cols-2 gap-4 text-center">
              <div className="bg-sky-50 p-3 rounded-lg">
                <div className="text-sky-800 text-sm font-medium">Monthly Avg</div>
                <div className="text-2xl font-bold text-sky-900">{climate.rainfall.currentMonth.avg.toFixed(1)} mm</div>
              </div>
              <div className="bg-sky-50 p-3 rounded-lg">
                <div className="text-sky-800 text-sm font-medium">Annual Total</div>
                <div className="text-2xl font-bold text-sky-900">{climate.rainfall.annual.total.toFixed(0)} mm</div>
              </div>
            </div>
            
            <div className="mt-4 h-60">
              <RainfallChart rainfallData={climate.rainfall} />
            </div>
          </div>
        </InfoPanel>

        <InfoPanel
          title="Climate Indicators"
          icon={<Wind size={20} />}
        >
          <ClimateIndicators climateData={climate} />
        </InfoPanel>

        <div className="md:col-span-2 space-y-6">
          <InfoPanel
            title="Cloud Coverage"
            icon={<Cloud size={20} />}
          >
            <div className="p-2">
              <div className="mb-4 grid grid-cols-2 gap-4 text-center">
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="text-sky-800 text-sm font-medium">Current Coverage</div>
                  <div className="text-2xl font-bold text-sky-900">{climate.cloudCoverage.current.toFixed(0)}%</div>
                </div>
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="text-sky-800 text-sm font-medium">Annual Average</div>
                  <div className="text-2xl font-bold text-sky-900">{climate.cloudCoverage.annual.avg.toFixed(0)}%</div>
                </div>
              </div>
              
              <div className="mt-4 h-60">
                <CloudCoverageChart cloudCoverageData={climate.cloudCoverage} />
              </div>
            </div>
          </InfoPanel>

          <InfoPanel
            title="Sunlight Data"
            icon={<Sun size={20} />}
          >
            <div className="p-2">
              <div className="mb-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="text-sky-800 text-sm font-medium">Daily Hours</div>
                  <div className="text-2xl font-bold text-sky-900">{climate.sunlight.current.toFixed(1)}h</div>
                  <div className="text-xs text-sky-600">Current</div>
                </div>
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="text-sky-800 text-sm font-medium">Annual Average</div>
                  <div className="text-2xl font-bold text-sky-900">{climate.sunlight.annual.avgHours.toFixed(1)}h</div>
                  <div className="text-xs text-sky-600">Per Day</div>
                </div>
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="text-sky-800 text-sm font-medium">Avg Intensity</div>
                  <div className="text-2xl font-bold text-sky-900">{climate.sunlight.annual.avgIntensity.toFixed(1)}</div>
                  <div className="text-xs text-sky-600">kWh/m²/day</div>
                </div>
              </div>
              
              <div className="mt-4 h-60">
                <SunlightChart sunlightData={climate.sunlight} />
              </div>
            </div>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
};

export default ClimateModule;
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Region, RegionDataObject } from '../types';
import { generateMockRegionData } from '../utils/mockData';
import { getClimateData, getLandCoverData, getSoilData } from '../integration/earthEngineService';

interface RegionContextType {
  selectedRegion: RegionDataObject | null;
  setSelectedRegion: (region: Region) => void;
  clearSelectedRegion: () => void;
  isLoading: boolean;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const RegionContext = createContext<RegionContextType>({
  selectedRegion: null,
  setSelectedRegion: () => {},
  clearSelectedRegion: () => {},
  isLoading: false,
  activeModule: 'map',
  setActiveModule: () => {},
});

export const useRegion = () => useContext(RegionContext);

interface RegionProviderProps {
  children: ReactNode;
}

export const RegionProvider: React.FC<RegionProviderProps> = ({ children }) => {
  const [selectedRegion, setSelectedRegionState] = useState<RegionDataObject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<string>('map');

  const setSelectedRegion = async (region: Region) => {
    setIsLoading(true);
    
    try {
      console.log('Starting region analysis for:', region.id);
      
      // Use Earth Engine services directly (with fallback data)
      const [climateData, landCoverData, soilData] = await Promise.all([
        getClimateData(region),
        getLandCoverData(region),
        getSoilData(region)
      ]);
      
      // Create region data object
      const regionData: RegionDataObject = {
        region,
        climate: climateData,
        landCover: landCoverData,
        soil: soilData,
        roadmap: generateMockRegionData(region).roadmap // Use mock roadmap for now
      };
      
      setSelectedRegionState(regionData);
      console.log('Region analysis completed successfully');
      
    } catch (error) {
      console.error('Error in region analysis:', error);
      console.log('Falling back to mock data');
      
      // Fallback to mock data if API fails
      const mockData = generateMockRegionData(region);
      setSelectedRegionState(mockData);
    }
    
    setIsLoading(false);
  };

  const clearSelectedRegion = () => {
    setSelectedRegionState(null);
    setActiveModule('map');
  };

  return (
    <RegionContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        clearSelectedRegion,
        isLoading,
        activeModule,
        setActiveModule,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};
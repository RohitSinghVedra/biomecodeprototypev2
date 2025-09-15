import { collection, doc, setDoc, getDoc, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';
import { Region, ClimateData, LandCoverData, SoilData, RegionDataObject } from '../types';
import { getClimateData, getLandCoverData, getSoilData } from './earthEngineService';

// API Service for BiomeCode
export class BiomeCodeAPI {
  private static instance: BiomeCodeAPI;
  
  static getInstance(): BiomeCodeAPI {
    if (!BiomeCodeAPI.instance) {
      BiomeCodeAPI.instance = new BiomeCodeAPI();
    }
    return BiomeCodeAPI.instance;
  }

  // Store region analysis data in Firestore
  async storeRegionAnalysis(regionId: string, data: RegionDataObject): Promise<void> {
    try {
      const regionRef = doc(db, 'regions', regionId);
      await setDoc(regionRef, {
        ...data,
        timestamp: new Date(),
        regionId: regionId
      });
      console.log('Region analysis stored successfully:', regionId);
    } catch (error) {
      console.error('Error storing region analysis:', error);
      throw error;
    }
  }

  // Get cached region analysis from Firestore
  async getCachedRegionAnalysis(regionId: string): Promise<RegionDataObject | null> {
    try {
      const regionRef = doc(db, 'regions', regionId);
      const regionSnap = await getDoc(regionRef);
      
      if (regionSnap.exists()) {
        const data = regionSnap.data() as RegionDataObject;
        console.log('Retrieved cached region analysis:', regionId);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving cached region analysis:', error);
      return null;
    }
  }

  // Store Earth Engine processing results
  async storeEarthEngineResults(regionId: string, dataType: string, results: any): Promise<void> {
    try {
      const resultsRef = doc(db, 'earthEngineResults', `${regionId}_${dataType}`);
      await setDoc(resultsRef, {
        regionId,
        dataType,
        results,
        timestamp: new Date()
      });
      console.log('Earth Engine results stored:', regionId, dataType);
    } catch (error) {
      console.error('Error storing Earth Engine results:', error);
      throw error;
    }
  }

  // Get Earth Engine processing results
  async getEarthEngineResults(regionId: string, dataType: string): Promise<any | null> {
    try {
      const resultsRef = doc(db, 'earthEngineResults', `${regionId}_${dataType}`);
      const resultsSnap = await getDoc(resultsRef);
      
      if (resultsSnap.exists()) {
        const data = resultsSnap.data();
        console.log('Retrieved Earth Engine results:', regionId, dataType);
        return data.results;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving Earth Engine results:', error);
      return null;
    }
  }

  // Store user analysis sessions
  async storeAnalysisSession(sessionData: {
    userId?: string;
    regionId: string;
    analysisType: string;
    parameters: any;
    results: any;
  }): Promise<string> {
    try {
      const sessionRef = await addDoc(collection(db, 'analysisSessions'), {
        ...sessionData,
        timestamp: new Date()
      });
      console.log('Analysis session stored:', sessionRef.id);
      return sessionRef.id;
    } catch (error) {
      console.error('Error storing analysis session:', error);
      throw error;
    }
  }

  // Get recent analysis sessions
  async getRecentAnalysisSessions(limitCount: number = 10): Promise<any[]> {
    try {
      const sessionsRef = collection(db, 'analysisSessions');
      const q = query(sessionsRef, orderBy('timestamp', 'desc'), limit(limitCount));
      const querySnapshot = await getDocs(q);
      
      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('Retrieved recent analysis sessions:', sessions.length);
      return sessions;
    } catch (error) {
      console.error('Error retrieving analysis sessions:', error);
      return [];
    }
  }

  // Store generated reports
  async storeReport(reportData: {
    regionId: string;
    reportType: string;
    content: string;
    metadata: any;
  }): Promise<string> {
    try {
      const reportRef = await addDoc(collection(db, 'reports'), {
        ...reportData,
        timestamp: new Date()
      });
      console.log('Report stored:', reportRef.id);
      return reportRef.id;
    } catch (error) {
      console.error('Error storing report:', error);
      throw error;
    }
  }

  // Upload files to Firebase Storage
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File uploaded successfully:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Comprehensive region analysis API
  async analyzeRegion(region: Region): Promise<RegionDataObject> {
    try {
      console.log('Starting comprehensive region analysis for:', region.id);
      
      // Check if we have cached data
      const cachedData = await this.getCachedRegionAnalysis(region.id);
      if (cachedData) {
        console.log('Using cached data for region:', region.id);
        return cachedData;
      }

      // Fetch live data from Earth Engine
      console.log('Fetching live Earth Engine data...');
      const [climate, landCover, soil] = await Promise.all([
        this.getClimateDataWithCache(region),
        this.getLandCoverDataWithCache(region),
        this.getSoilDataWithCache(region)
      ]);

      // Create comprehensive region data
      const regionData: RegionDataObject = {
        region,
        climate,
        landCover,
        soil,
        waterAccess: {
          distanceToSurfaceWater: 2.5,
          groundwaterDepth: 15,
          rainfallClassification: this.classifyRainfall(climate.rainfall.annual.total),
          recommendedWaterMethod: this.recommendWaterMethod(climate, soil),
          evapotranspirationRate: climate.evapotranspiration,
          accessRating: this.assessWaterAccess(climate, soil),
          annualWaterPotential: {
            rainfall: climate.rainfall.annual.total,
            groundwater: 1000,
            surfaceWater: 500
          },
          waterQuality: {
            ph: 7.2,
            tds: 150,
            turbidity: 5,
            dissolvedOxygen: 8.5
          },
          seasonalVariation: {
            drySeasonLength: 4,
            monthlyVariation: 0.3
          }
        },
        simulationSetup: {
          projectType: 'Agroforestry'
        }
      };

      // Store the analysis results
      await this.storeRegionAnalysis(region.id, regionData);

      // Store analysis session
      await this.storeAnalysisSession({
        regionId: region.id,
        analysisType: 'comprehensive',
        parameters: { region },
        results: regionData
      });

      console.log('Region analysis completed successfully:', region.id);
      return regionData;
    } catch (error) {
      console.error('Error in comprehensive region analysis:', error);
      throw error;
    }
  }

  // Helper methods with caching
  private async getClimateDataWithCache(region: Region): Promise<ClimateData> {
    const cached = await this.getEarthEngineResults(region.id, 'climate');
    if (cached) return cached;
    
    const data = await getClimateData(region);
    await this.storeEarthEngineResults(region.id, 'climate', data);
    return data;
  }

  private async getLandCoverDataWithCache(region: Region): Promise<LandCoverData> {
    const cached = await this.getEarthEngineResults(region.id, 'landCover');
    if (cached) return cached;
    
    const data = await getLandCoverData(region);
    await this.storeEarthEngineResults(region.id, 'landCover', data);
    return data;
  }

  private async getSoilDataWithCache(region: Region): Promise<SoilData> {
    const cached = await this.getEarthEngineResults(region.id, 'soil');
    if (cached) return cached;
    
    const data = await getSoilData(region);
    await this.storeEarthEngineResults(region.id, 'soil', data);
    return data;
  }

  // Analysis helper methods
  private classifyRainfall(annualRainfall: number): 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High' {
    if (annualRainfall < 250) return 'Very Low';
    if (annualRainfall < 500) return 'Low';
    if (annualRainfall < 1000) return 'Medium';
    if (annualRainfall < 2000) return 'High';
    return 'Very High';
  }

  private recommendWaterMethod(climate: ClimateData, soil: SoilData): 'Rainfed' | 'Drip' | 'Greywater' | 'Mixed' {
    const rainfall = climate.rainfall.annual.total;
    const soilDrainage = soil.clay + soil.sand; // Simplified drainage assessment
    
    if (rainfall > 1000 && soilDrainage > 60) return 'Rainfed';
    if (rainfall < 500) return 'Drip';
    if (soilDrainage < 40) return 'Greywater';
    return 'Mixed';
  }

  private assessWaterAccess(climate: ClimateData, soil: SoilData): 'Low' | 'Medium' | 'High' {
    const rainfall = climate.rainfall.annual.total;
    const soilRetention = soil.clay + soil.organicCarbon;
    
    if (rainfall > 1000 && soilRetention > 30) return 'High';
    if (rainfall > 500 && soilRetention > 15) return 'Medium';
    return 'Low';
  }
}

// Export singleton instance
export const biomeCodeAPI = BiomeCodeAPI.getInstance();

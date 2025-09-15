import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration for BiomeCodePrototype
const firebaseConfig = {
  apiKey: "AIzaSyAR34dEFCRBDkwl-zQsgFDAkBUgxtrBI40",
  authDomain: "biomecodeprototype-e2412.firebaseapp.com",
  projectId: "biomecodeprototype-e2412",
  storageBucket: "biomecodeprototype-e2412.firebasestorage.app",
  messagingSenderId: "744553768568",
  appId: "1:744553768568:web:fdabe93b491348fbe7ef8d",
  measurementId: "G-Y86WC58XCO"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with error handling
let db: any;
try {
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
} catch (error) {
  console.warn('Firestore initialization failed:', error);
  // Create a mock Firestore for development
  db = {
    collection: () => ({
      doc: () => ({
        set: () => Promise.resolve(),
        get: () => Promise.resolve({ exists: () => false }),
        add: () => Promise.resolve({ id: 'mock-id' })
      }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      getDocs: () => Promise.resolve({ docs: [] })
    })
  };
}

// Initialize Storage with error handling
let storage: any;
try {
  storage = getStorage(app);
  console.log('Storage initialized successfully');
} catch (error) {
  console.warn('Storage initialization failed:', error);
  // Create a mock Storage for development
  storage = {
    ref: () => ({
      uploadBytes: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } })
    })
  };
}

export { db, storage };

// Data caching service
export class DataCacheService {
  private static instance: DataCacheService;
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  
  static getInstance(): DataCacheService {
    if (!DataCacheService.instance) {
      DataCacheService.instance = new DataCacheService();
    }
    return DataCacheService.instance;
  }
  
  // Cache data with expiration (in milliseconds)
  setCache(key: string, data: any, expiryMs: number = 3600000): void { // 1 hour default
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + expiryMs);
  }
  
  // Get cached data if not expired
  getCache(key: string): any | null {
    const expiry = this.cacheExpiry.get(key);
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key);
      this.cacheExpiry.delete(key);
      return null;
    }
    return this.cache.get(key) || null;
  }
  
  // Clear cache
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
      this.cacheExpiry.delete(key);
    } else {
      this.cache.clear();
      this.cacheExpiry.clear();
    }
  }
  
  // Generate cache key for region data
  generateCacheKey(regionId: string, dataType: string, dateRange?: string): string {
    return `${regionId}_${dataType}_${dateRange || 'current'}`;
  }
}

export default app;

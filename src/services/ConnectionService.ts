// Connection service to handle API connections with proper error handling
export interface ConnectionStatus {
  firebase: 'connected' | 'disconnected' | 'checking' | 'error';
  earthEngine: 'connected' | 'disconnected' | 'checking' | 'error';
  overall: 'connected' | 'disconnected' | 'checking' | 'error';
}

class ConnectionService {
  private static instance: ConnectionService;
  private status: ConnectionStatus = {
    firebase: 'checking',
    earthEngine: 'checking',
    overall: 'checking'
  };
  private listeners: ((status: ConnectionStatus) => void)[] = [];

  static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  // Subscribe to connection status changes
  subscribe(listener: (status: ConnectionStatus) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Get current status
  getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  // Update status and notify listeners
  private updateStatus(updates: Partial<ConnectionStatus>): void {
    this.status = { ...this.status, ...updates };
    
    // Determine overall status
    if (this.status.firebase === 'connected' && this.status.earthEngine === 'connected') {
      this.status.overall = 'connected';
    } else if (this.status.firebase === 'error' || this.status.earthEngine === 'error') {
      this.status.overall = 'error';
    } else if (this.status.firebase === 'checking' || this.status.earthEngine === 'checking') {
      this.status.overall = 'checking';
    } else {
      this.status.overall = 'disconnected';
    }

    // Notify all listeners
    this.listeners.forEach(listener => listener(this.status));
  }

  // Check Firebase connection
  async checkFirebaseConnection(): Promise<void> {
    try {
      this.updateStatus({ firebase: 'checking' });
      
      // Simulate Firebase check (replace with actual Firebase check)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, always return connected since we have fallback
      this.updateStatus({ firebase: 'connected' });
    } catch (error) {
      console.warn('Firebase connection check failed:', error);
      this.updateStatus({ firebase: 'error' });
    }
  }

  // Check Earth Engine connection
  async checkEarthEngineConnection(): Promise<void> {
    try {
      this.updateStatus({ earthEngine: 'checking' });
      
      // Simulate Earth Engine check
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For browser environment, we use fallback mode
      this.updateStatus({ earthEngine: 'connected' });
    } catch (error) {
      console.warn('Earth Engine connection check failed:', error);
      this.updateStatus({ earthEngine: 'error' });
    }
  }

  // Initialize all connections
  async initializeConnections(): Promise<void> {
    console.log('Initializing API connections...');
    
    // Check both connections in parallel
    await Promise.all([
      this.checkFirebaseConnection(),
      this.checkEarthEngineConnection()
    ]);
    
    console.log('API connections initialized:', this.status);
  }
}

export default ConnectionService;

import React, { useState, useEffect } from 'react';
import { Database, Cloud, CheckCircle, XCircle, Loader } from 'lucide-react';
import ConnectionService, { ConnectionStatus } from '../../services/ConnectionService';

interface APIStatusProps {
  className?: string;
}

const APIStatus: React.FC<APIStatusProps> = ({ className = '' }) => {
  const [status, setStatus] = useState<ConnectionStatus>({
    firebase: 'checking',
    earthEngine: 'checking',
    overall: 'checking'
  });

  useEffect(() => {
    const connectionService = ConnectionService.getInstance();
    
    // Subscribe to status changes
    const unsubscribe = connectionService.subscribe(setStatus);
    
    // Initialize connections
    connectionService.initializeConnections();
    
    return unsubscribe;
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'checking':
        return <Loader size={16} className="text-yellow-500 animate-spin" />;
      default:
        return <XCircle size={16} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      case 'checking':
        return 'Checking...';
      default:
        return 'Disconnected';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'checking':
        return 'text-yellow-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <Database size={20} className="mr-2 text-blue-600" />
        API Status
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Firebase</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(status.firebase)}
            <span className={`text-sm ${getStatusColor(status.firebase)}`}>
              {getStatusText(status.firebase)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database size={16} className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">Earth Engine</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(status.earthEngine)}
            <span className={`text-sm ${getStatusColor(status.earthEngine)}`}>
              {getStatusText(status.earthEngine)}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Overall Status</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(status.overall)}
              <span className={`text-sm font-semibold ${getStatusColor(status.overall)}`}>
                {getStatusText(status.overall)}
              </span>
            </div>
          </div>
        </div>
      </div>

          {status.overall === 'connected' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                ✅ All systems operational. Live Earth Engine data is available for analysis.
              </p>
            </div>
          )}

          {status.earthEngine === 'error' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                📊 <strong>Data Source:</strong> Using simulated ecological data for demonstration purposes. 
                This is realistic mock data that represents typical patterns for the selected region type.
              </p>
            </div>
          )}

      {status.overall === 'error' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">
            ⚠️ Some services are unavailable. The application will use fallback data.
          </p>
        </div>
      )}
    </div>
  );
};

export default APIStatus;

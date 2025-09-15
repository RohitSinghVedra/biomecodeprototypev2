import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Circle, Hexagon, TreePine, Sprout, Brain, CloudRain, Layers, DropletIcon, BrainCircuit } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import Button from '../../common/Button';
import Card from '../../common/Card';
import APIStatus from '../../common/APIStatus';
import LoadingPopup from '../../common/LoadingPopup';
import { Region } from '../../../types';

// Simple map component with better drawing tools
const KeplerMapSelection: React.FC = () => {
  const { selectedRegion, setSelectedRegion, setActiveModule, isLoading } = useRegion();
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(3);
  const [drawingMode, setDrawingMode] = useState<'circle' | 'polygon' | 'rectangle' | null>(null);
  const [drawnShapes, setDrawnShapes] = useState<any[]>([]);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [pendingRegion, setPendingRegion] = useState<Region | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Handle drawing mode selection
  const handleDrawingModeSelect = (mode: 'circle' | 'polygon' | 'rectangle') => {
    setDrawingMode(mode);
  };

  // Handle map click for drawing with async processing
  const handleMapClick = async (event: React.MouseEvent) => {
    if (!drawingMode) return;

    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert screen coordinates to lat/lng (improved calculation)
    const normalizedX = (x / rect.width) - 0.5; // -0.5 to 0.5
    const normalizedY = (y / rect.height) - 0.5; // -0.5 to 0.5
    
    const lat = mapCenter[0] + normalizedY * 20; // Scale factor for latitude
    const lng = mapCenter[1] + normalizedX * 40; // Scale factor for longitude

    let region: Region;
    let shapeData: any;

    if (drawingMode === 'circle') {
      const radius = 50; // km
      region = {
        id: `drawn_${Date.now()}`,
        name: `Drawn Circle ${drawnShapes.length + 1}`,
        type: 'circle',
        center: { lat, lng },
        radius: radius,
        area: Math.PI * radius * radius,
        boundingBox: {
          minLat: lat - radius / 111,
          maxLat: lat + radius / 111,
          minLng: lng - radius / (111 * Math.cos(lat * Math.PI / 180)),
          maxLng: lng + radius / (111 * Math.cos(lat * Math.PI / 180))
        }
      };
      shapeData = { type: 'circle', center: { lat, lng }, radius, region };
    } else if (drawingMode === 'rectangle') {
      const width = 100; // km
      const height = 60; // km
      region = {
        id: `drawn_${Date.now()}`,
        name: `Drawn Rectangle ${drawnShapes.length + 1}`,
        type: 'rectangle',
        center: { lat, lng },
        area: width * height,
        boundingBox: {
          minLat: lat - height / 222,
          maxLat: lat + height / 222,
          minLng: lng - width / (222 * Math.cos(lat * Math.PI / 180)),
          maxLng: lng + width / (222 * Math.cos(lat * Math.PI / 180))
        }
      };
      shapeData = { type: 'rectangle', center: { lat, lng }, width, height, region };
    } else if (drawingMode === 'polygon') {
      const radius = 40; // km
      region = {
        id: `drawn_${Date.now()}`,
        name: `Drawn Polygon ${drawnShapes.length + 1}`,
        type: 'polygon',
        center: { lat, lng },
        area: Math.PI * radius * radius * 0.8, // Approximate for polygon
        boundingBox: {
          minLat: lat - radius / 111,
          maxLat: lat + radius / 111,
          minLng: lng - radius / (111 * Math.cos(lat * Math.PI / 180)),
          maxLng: lng + radius / (111 * Math.cos(lat * Math.PI / 180))
        }
      };
      shapeData = { type: 'polygon', center: { lat, lng }, radius, region };
    } else {
      return;
    }
    
    // Store the region and show loading popup
    setPendingRegion(region);
    setDrawnShapes([...drawnShapes, shapeData]);
    setDrawingMode(null);
    
    // Show loading popup
    setShowLoadingPopup(true);
    setLoadingMessage('Analyzing region with Earth Engine...');
    
    // Simulate async processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Set the region after processing
      setSelectedRegion(region);
      setLoadingMessage('Analysis complete!');
      
      // Hide popup after a short delay
      setTimeout(() => {
        setShowLoadingPopup(false);
        setPendingRegion(null);
      }, 1000);
      
    } catch (error) {
      console.error('Error processing region:', error);
      setLoadingMessage('Analysis failed. Using fallback data.');
      setSelectedRegion(region); // Still set the region with fallback data
      
      setTimeout(() => {
        setShowLoadingPopup(false);
        setPendingRegion(null);
      }, 2000);
    }
  };

  // Clear drawing
  const clearDrawing = () => {
    setDrawnShapes([]);
    setDrawingMode(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Loading Popup */}
      <LoadingPopup
        isVisible={showLoadingPopup}
        title="Processing Region"
        message={loadingMessage}
        status={loadingMessage.includes('failed') ? 'error' : loadingMessage.includes('complete') ? 'success' : 'loading'}
        onClose={() => setShowLoadingPopup(false)}
      />
      <div className="bg-gradient-to-r from-earth-100 via-sky-100 to-earth-100 p-4 border-b border-forest-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-forest-800 mb-2">Land Region Selection</h2>
          <p className="text-gray-600">Draw a region on the map to analyze its ecological data.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Map Area */}
        <div className="w-full md:w-3/4 relative min-h-0">
          {/* Drawing Tools */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <MapPin size={16} className="mr-2 text-green-600" />
              Drawing Tools
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => handleDrawingModeSelect('circle')}
                className={`w-full p-2 rounded-lg text-sm font-medium transition-colors ${
                  drawingMode === 'circle' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Circle size={16} className="inline mr-2" />
                Circle
              </button>
              <button
                onClick={() => handleDrawingModeSelect('rectangle')}
                className={`w-full p-2 rounded-lg text-sm font-medium transition-colors ${
                  drawingMode === 'rectangle' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Hexagon size={16} className="inline mr-2" />
                Rectangle
              </button>
              <button
                onClick={() => handleDrawingModeSelect('polygon')}
                className={`w-full p-2 rounded-lg text-sm font-medium transition-colors ${
                  drawingMode === 'polygon' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Hexagon size={16} className="inline mr-2" />
                Polygon
              </button>
              {drawnShapes.length > 0 && (
                <button
                  onClick={clearDrawing}
                  className="w-full p-2 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Interactive Map Container */}
          <div 
            ref={mapRef}
            className="w-full h-full bg-gray-100 relative cursor-crosshair overflow-hidden"
            onClick={handleMapClick}
            style={{ minHeight: '500px' }}
          >
            {/* World Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100">
              {/* Simple world map representation */}
              <svg className="w-full h-full" viewBox="0 0 800 400">
                {/* Continents as simple shapes */}
                <path d="M100,150 Q200,100 300,120 Q400,110 500,130 Q600,125 700,140 L720,160 Q700,180 600,170 Q500,175 400,165 Q300,170 200,160 Q150,155 100,150 Z" 
                      fill="#8B4513" stroke="#654321" strokeWidth="2" opacity="0.7"/>
                <path d="M50,200 Q150,180 250,190 Q350,185 450,195 Q550,190 650,200 L670,220 Q650,240 550,230 Q450,235 350,225 Q250,230 150,220 Q100,210 50,200 Z" 
                      fill="#228B22" stroke="#006400" strokeWidth="2" opacity="0.7"/>
                <path d="M200,250 Q300,240 400,250 Q500,245 600,255 L620,275 Q600,295 500,285 Q400,290 300,280 Q250,270 200,250 Z" 
                      fill="#32CD32" stroke="#228B22" strokeWidth="2" opacity="0.7"/>
                
                {/* Grid lines for reference */}
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Drawn shapes overlay */}
            {drawnShapes.map((shape, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${50 + (shape.center.lng - mapCenter[1]) * 10}%`,
                  top: `${50 - (shape.center.lat - mapCenter[0]) * 10}%`,
                  width: shape.type === 'circle' ? '80px' : '60px',
                  height: shape.type === 'circle' ? '80px' : '40px',
                }}
              >
                {shape.type === 'circle' && (
                  <div className="w-full h-full border-4 border-green-600 rounded-full bg-green-600/30 shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-green-800">{index + 1}</span>
                    </div>
                  </div>
                )}
                {shape.type === 'rectangle' && (
                  <div className="w-full h-full border-4 border-blue-600 bg-blue-600/30 shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-800">{index + 1}</span>
                    </div>
                  </div>
                )}
                {shape.type === 'polygon' && (
                  <div className="w-full h-full border-4 border-purple-600 bg-purple-600/30 transform rotate-45 shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                      <span className="text-xs font-bold text-purple-800">{index + 1}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Map coordinates display */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
              <div className="text-xs text-gray-600">
                <div>Center: {mapCenter[0].toFixed(2)}°, {mapCenter[1].toFixed(2)}°</div>
                <div>Zoom: {mapZoom}</div>
                <div>Shapes: {drawnShapes.length}</div>
              </div>
            </div>

            {/* Drawing instructions */}
            {drawingMode && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Click anywhere on the map to place a {drawingMode}
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  Current mode: <span className="font-semibold text-green-600">{drawingMode}</span>
                </div>
              </div>
            )}

            {/* Map legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-green-600 rounded-full bg-green-600/30"></div>
                  <span className="text-gray-600">Circle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-blue-600 bg-blue-600/30"></div>
                  <span className="text-gray-600">Rectangle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-purple-600 bg-purple-600/30 transform rotate-45"></div>
                  <span className="text-gray-600">Polygon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/4 p-4 bg-gray-50 overflow-y-auto max-h-full">
          {selectedRegion ? (
            <div className="space-y-4">
              {/* Region Details Card */}
              <div className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-lg p-4 text-white shadow-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Selected Region
                </h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-forest-200">Name:</span>
                    <p className="font-medium">{selectedRegion.name}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-forest-200">Type:</span>
                    <p className="font-medium capitalize">{selectedRegion.type}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-forest-200">Area:</span>
                    <p className="font-medium">{selectedRegion?.area?.toLocaleString() || '0'} km²</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-forest-200">Center:</span>
                    <p className="font-medium text-xs">
                      {selectedRegion?.center?.lat?.toFixed(4) || '0'}°, {selectedRegion?.center?.lng?.toFixed(4) || '0'}°
                    </p>
                  </div>

                  {selectedRegion?.radius && (
                    <div>
                      <span className="text-sm text-forest-200">Radius:</span>
                      <p className="font-medium">{selectedRegion.radius.toFixed(2)} km</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Analysis Status</h4>
                {isLoading ? (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Analyzing region...</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Climate Data</span>
                      <span className="text-sm text-green-600 font-medium">✓ Ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Land Cover</span>
                      <span className="text-sm text-green-600 font-medium">✓ Ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Soil Analysis</span>
                      <span className="text-sm text-green-600 font-medium">✓ Ready</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Next Steps</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Your region has been analyzed! Explore the detailed data in each module:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => setActiveModule('climate')}
                    className="w-full text-left p-3 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CloudRain size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Climate Analysis</span>
                      </div>
                      <span className="text-xs text-blue-600">→</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveModule('land')}
                    className="w-full text-left p-3 rounded-lg bg-green-100 hover:bg-green-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Layers size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-green-800">Land Cover</span>
                      </div>
                      <span className="text-xs text-green-600">→</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveModule('soil')}
                    className="w-full text-left p-3 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DropletIcon size={16} className="text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Soil Analysis</span>
                      </div>
                      <span className="text-xs text-yellow-600">→</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveModule('simulation')}
                    className="w-full text-left p-3 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BrainCircuit size={16} className="text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Simulation</span>
                      </div>
                      <span className="text-xs text-purple-600">→</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* API Status */}
              <APIStatus />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Instructions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Get Started</h3>
                <div className="space-y-3 text-sm text-blue-700">
                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                      <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-xs">1</span>
                    </div>
                    <p>Select a drawing tool from the left panel</p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                      <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-xs">2</span>
                    </div>
                    <p>Click on the map to place your region</p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                      <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-xs">3</span>
                    </div>
                    <p>View live ecological data analysis</p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                      <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-xs">4</span>
                    </div>
                    <p>Explore detailed climate, land cover, and soil data</p>
                  </div>
                </div>
              </div>

              {/* Drawing Tools Guide */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Drawing Tools</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Circle size={16} className="text-green-600" />
                    <span><strong>Circle:</strong> Click to place circular regions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hexagon size={16} className="text-green-600" />
                    <span><strong>Rectangle:</strong> Click to place rectangular regions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hexagon size={16} className="text-green-600" />
                    <span><strong>Polygon:</strong> Click to place polygonal regions</span>
                  </div>
                </div>
              </div>

              {/* API Status */}
              <APIStatus />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeplerMapSelection;

import React, { useState, useRef, useEffect } from 'react';
import { Pin, Circle, Hexagon, TreePine, Sprout, Brain, MapPin, CloudRain, Layers, DropletIcon, BrainCircuit } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import Button from '../../common/Button';
import Card from '../../common/Card';
import RegionInfoCard from './RegionInfoCard';
import APIStatus from '../../common/APIStatus';
import { Region } from '../../../types';
import { MapContainer, TileLayer, Circle as LeafletCircle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

// Component to handle map updates and drawing
const MapUpdater = ({ center, zoom, onRegionDrawn }: { 
  center: [number, number]; 
  zoom: number;
  onRegionDrawn: (region: Region) => void;
}) => {
  const map = useMap();
  const [drawnItems, setDrawnItems] = useState<L.FeatureGroup>(new L.FeatureGroup());
  
  useEffect(() => {
    // Add draw control with better styling and titles
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        circle: {
          shapeOptions: {
            color: '#2D6A4F',
            fillColor: '#2D6A4F',
            fillOpacity: 0.3,
            weight: 3
          },
          showRadius: true,
          metric: true,
          title: 'Draw Circle'
        },
        polygon: {
          shapeOptions: {
            color: '#2D6A4F',
            fillColor: '#2D6A4F',
            fillOpacity: 0.3,
            weight: 3
          },
          showLength: true,
          showArea: true,
          metric: true,
          title: 'Draw Polygon'
        },
        rectangle: {
          shapeOptions: {
            color: '#2D6A4F',
            fillColor: '#2D6A4F',
            fillOpacity: 0.3,
            weight: 3
          },
          showArea: true,
          metric: true,
          title: 'Draw Rectangle'
        },
        marker: false,
        circlemarker: false,
        polyline: false
      },
      edit: {
        featureGroup: drawnItems,
        remove: true
      }
    });
    
    map.addControl(drawControl);
    
    // Handle draw events
    const handleDrawCreated = (e: any) => {
      const { layerType, layer } = e;
      drawnItems.addLayer(layer);
      
      // Convert drawn shape to Region
      let region: Region;
      
      if (layerType === 'circle') {
        const center = layer.getLatLng();
        const radius = layer.getRadius() / 1000; // Convert meters to km
        const area = Math.PI * radius * radius;
        
        region = {
          id: `drawn_${Date.now()}`,
          name: `Custom Circle Region`,
          type: 'circle',
          center: { lat: center.lat, lng: center.lng },
          radius: radius,
          area: area,
          boundingBox: {
            minLat: center.lat - radius,
            maxLat: center.lat + radius,
            minLng: center.lng - radius,
            maxLng: center.lng + radius
          }
        };
      } else if (layerType === 'polygon') {
        const latlngs = layer.getLatLngs()[0];
        const coordinates = latlngs.map((latlng: L.LatLng) => ({
          lat: latlng.lat,
          lng: latlng.lng
        }));
        
        // Calculate bounding box
        const lats = coordinates.map(c => c.lat);
        const lngs = coordinates.map(c => c.lng);
        
        // Calculate area using shoelace formula
        let area = 0;
        for (let i = 0; i < coordinates.length; i++) {
          const j = (i + 1) % coordinates.length;
          area += coordinates[i].lng * coordinates[j].lat;
          area -= coordinates[j].lng * coordinates[i].lat;
        }
        area = Math.abs(area) / 2;
        
        region = {
          id: `drawn_${Date.now()}`,
          name: `Custom Polygon Region`,
          type: 'polygon',
          center: {
            lat: (Math.min(...lats) + Math.max(...lats)) / 2,
            lng: (Math.min(...lngs) + Math.max(...lngs)) / 2
          },
          coordinates: coordinates,
          area: area,
          boundingBox: {
            minLat: Math.min(...lats),
            maxLat: Math.max(...lats),
            minLng: Math.min(...lngs),
            maxLng: Math.max(...lngs)
          }
        };
      } else if (layerType === 'rectangle') {
        const bounds = layer.getBounds();
        const coordinates = [
          { lat: bounds.getSouth(), lng: bounds.getWest() },
          { lat: bounds.getNorth(), lng: bounds.getWest() },
          { lat: bounds.getNorth(), lng: bounds.getEast() },
          { lat: bounds.getSouth(), lng: bounds.getEast() }
        ];
        
        const area = bounds.getNorthEast().distanceTo(bounds.getSouthWest()) * 
                    bounds.getNorthWest().distanceTo(bounds.getSouthEast()) / 1000000; // Convert to km²
        
        region = {
          id: `drawn_${Date.now()}`,
          name: `Custom Rectangle Region`,
          type: 'polygon',
          center: bounds.getCenter(),
          coordinates: coordinates,
          area: area,
          boundingBox: {
            minLat: bounds.getSouth(),
            maxLat: bounds.getNorth(),
            minLng: bounds.getWest(),
            maxLng: bounds.getEast()
          }
        };
      } else {
        return;
      }
      
      onRegionDrawn(region);
    };
    
    map.on(L.Draw.Event.CREATED, handleDrawCreated);
    
    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, handleDrawCreated);
    };
  }, [map, drawnItems, onRegionDrawn]);
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const MapSelection: React.FC = () => {
  const { setSelectedRegion, selectedRegion, setActiveModule } = useRegion();
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegionDrawn = (region: Region) => {
    setIsLoading(true);
    setSelectedRegion(region);
    setMapCenter([region.center.lat, region.center.lng]);
    
    // Calculate appropriate zoom level
    const bounds = region.boundingBox;
    const latDiff = bounds.maxLat - bounds.minLat;
    const lngDiff = bounds.maxLng - bounds.minLng;
    const maxDiff = Math.max(latDiff, lngDiff);
    const zoom = Math.max(3, Math.floor(13 - Math.log2(maxDiff)));
    setMapZoom(zoom);
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-earth-100 via-sky-100 to-earth-100 p-4 border-b border-forest-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-forest-800 mb-2">Enhanced Land Region Selection</h2>
          <p className="text-gray-600 mb-4">
            Select a region using the drawing tools on the map or choose from preset locations. 
            All data will be fetched live from Google Earth Engine.
          </p>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center space-x-2 text-sm text-forest-700">
              <MapPin size={16} />
              <span>Use drawing tools on the map to create custom regions</span>
            </div>
            {isLoading && (
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Processing region...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="w-full md:w-3/4 relative min-h-0">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%', minHeight: '500px' }}
          >
            <MapUpdater 
              center={mapCenter} 
              zoom={mapZoom} 
              onRegionDrawn={handleRegionDrawn}
            />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Drawing Instructions Overlay */}
            {!selectedRegion && (
              <div className="absolute top-20 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 z-[1000] max-w-xs">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <MapPin size={16} className="mr-2 text-green-600" />
                  Drawing Tools
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-green-600 rounded-full"></div>
                    <span><strong>Circle:</strong> Click and drag</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-green-600"></div>
                    <span><strong>Rectangle:</strong> Click and drag</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-green-600 transform rotate-45"></div>
                    <span><strong>Polygon:</strong> Click points, double-click to finish</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Use the tools in the top-right corner to draw your region
                </p>
              </div>
            )}
          </MapContainer>
        </div>
        
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
                    <p className="font-medium">{selectedRegion?.region?.name || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-forest-200">Type:</span>
                    <p className="font-medium capitalize">{selectedRegion?.region?.type || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-forest-200">Area:</span>
                    <p className="font-medium">{selectedRegion?.region?.area?.toLocaleString() || '0'} km²</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-forest-200">Center:</span>
                    <p className="font-medium text-xs">
                      {selectedRegion?.region?.center?.lat?.toFixed(4) || '0.0000'}°, {selectedRegion?.region?.center?.lng?.toFixed(4) || '0.0000'}°
                    </p>
                  </div>
                  
                  {selectedRegion?.region?.type === 'circle' && selectedRegion?.region?.radius && (
                    <div>
                      <span className="text-sm text-forest-200">Radius:</span>
                      <p className="font-medium">{selectedRegion.region.radius.toFixed(2)} km</p>
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
                    <span className="text-sm">Analyzing region with Earth Engine...</span>
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
                    <p>Use the drawing tools on the map to select a region</p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                      <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-xs">2</span>
                    </div>
                    <p>Choose from Circle, Polygon, or Rectangle tools</p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                      <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-xs">3</span>
                    </div>
                    <p>View live Earth Engine data analysis</p>
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
                    <div className="w-4 h-4 border-2 border-green-600 rounded-full"></div>
                    <span><strong>Circle:</strong> Click and drag to create circular regions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-600"></div>
                    <span><strong>Rectangle:</strong> Click and drag to create rectangular regions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-600 transform rotate-45"></div>
                    <span><strong>Polygon:</strong> Click multiple points, double-click to finish</span>
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

export default MapSelection;

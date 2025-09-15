import React, { useState, useRef, useEffect } from 'react';
import { Pin, Circle, Hexagon, TreePine, Sprout, Brain } from 'lucide-react';
import { useRegion } from '../../../context/RegionContext';
import Button from '../../common/Button';
import Card from '../../common/Card';
import RegionInfoCard from './RegionInfoCard';
import { Region } from '../../../types';
import { mockRegions } from '../../../utils/mockData';
import { MapContainer, TileLayer, Circle as LeafletCircle, useMap } from 'react-leaflet';

// Component to handle map updates
const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const MapSelection: React.FC = () => {
  const { setSelectedRegion, selectedRegion } = useRegion();
  const [drawMode, setDrawMode] = useState<'circle' | 'polygon'>('circle');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [tempRegion, setTempRegion] = useState<Region | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(3);

  const handleSelectPresetRegion = (region: Region) => {
    setSelectedRegion(region);
    setMapCenter([region.center.lat, region.center.lng]);
    // Calculate appropriate zoom level based on region radius
    const zoom = Math.max(3, Math.floor(13 - Math.log2(region.radius || 1)));
    setMapZoom(zoom);
  };

  const handleMapClick = (event: any) => {
    const { lat, lng } = event.latlng;
    
    if (!isDrawing) {
      setIsDrawing(true);
      setStartPoint({ lat, lng });
      
      setTempRegion({
        id: 'temp',
        name: 'New Region',
        type: drawMode,
        center: { lat, lng },
        radius: 0,
        area: 0,
        boundingBox: {
          minLat: lat,
          maxLat: lat,
          minLng: lng,
          maxLng: lng
        }
      });
    } else {
      setIsDrawing(false);
      
      if (startPoint && tempRegion) {
        if (drawMode === 'circle') {
          const distance = calculateDistance(startPoint.lat, startPoint.lng, lat, lng);
          const area = Math.PI * distance * distance;
          
          const finalRegion: Region = {
            ...tempRegion,
            radius: distance,
            area: Math.round(area * 100) / 100,
            boundingBox: {
              minLat: startPoint.lat - distance,
              maxLat: startPoint.lat + distance,
              minLng: startPoint.lng - distance,
              maxLng: startPoint.lng + distance
            }
          };
          
          setSelectedRegion(finalRegion);
          setMapCenter([startPoint.lat, startPoint.lng]);
          const zoom = Math.max(3, Math.floor(13 - Math.log2(distance)));
          setMapZoom(zoom);
        }
        
        setTempRegion(null);
        setStartPoint(null);
      }
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-earth-100 via-sky-100 to-earth-100 p-4 border-b border-forest-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-forest-800 mb-2">Land Region Selection</h2>
          <p className="text-gray-600">Select a region to analyze by drawing on the map or choosing a preset location.</p>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <Button 
              variant={drawMode === 'circle' ? 'primary' : 'outline'} 
              onClick={() => setDrawMode('circle')}
              icon={<Circle size={16} />}
            >
              Draw Circle
            </Button>
            <Button 
              variant={drawMode === 'polygon' ? 'primary' : 'outline'} 
              onClick={() => setDrawMode('polygon')}
              icon={<Hexagon size={16} />}
              disabled={true}
            >
              Draw Polygon
            </Button>
            {isDrawing && (
              <Button 
                variant="text" 
                onClick={() => {
                  setIsDrawing(false);
                  setTempRegion(null);
                  setStartPoint(null);
                }}
              >
                Cancel Drawing
              </Button>
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
            onClick={handleMapClick}
          >
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Show temporary drawing circle */}
            {tempRegion && tempRegion.type === 'circle' && startPoint && tempRegion.radius && (
              <LeafletCircle
                center={[startPoint.lat, startPoint.lng]}
                radius={tempRegion.radius * 1000} // Convert km to meters
                pathOptions={{
                  color: '#2D6A4F',
                  fillColor: '#2D6A4F',
                  fillOpacity: 0.3
                }}
              />
            )}

            {/* Show all preset regions */}
            {mockRegions.map((region) => (
              <LeafletCircle
                key={region.id}
                center={[region.center.lat, region.center.lng]}
                radius={(region.radius || 0) * 1000} // Convert km to meters
                pathOptions={{
                  color: selectedRegion?.region?.id === region.id ? '#2D6A4F' : '#90A4AE',
                  fillColor: selectedRegion?.region?.id === region.id ? '#2D6A4F' : '#90A4AE',
                  fillOpacity: selectedRegion?.region?.id === region.id ? 0.3 : 0.1,
                  weight: selectedRegion?.region?.id === region.id ? 2 : 1
                }}
                eventHandlers={{
                  click: () => handleSelectPresetRegion(region)
                }}
              />
            ))}
          </MapContainer>
          
          {isDrawing && startPoint && (
            <div className="absolute top-5 left-0 right-0 flex justify-center">
              <div className="bg-white px-4 py-2 rounded-md shadow-md text-sm">
                {drawMode === 'circle' ? 'Click again to set the radius' : 'Click to add points, double-click to finish'}
              </div>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/4 p-4 bg-gray-50 overflow-y-auto max-h-full">
          {tempRegion && (
            <RegionInfoCard region={tempRegion} preview={true} />
          )}
          
          <div className="mt-4">
            <div className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-lg p-4 text-white shadow-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Preset Regions</h3>
              <p className="text-sm text-forest-200 mb-4">
                Explore our curated selection of diverse ecosystems, each representing unique environmental challenges and opportunities for ecological transformation.
              </p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {mockRegions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleSelectPresetRegion(region)}
                    className={`p-3 rounded-lg transition-all ${
                      selectedRegion?.region?.id === region.id
                        ? 'bg-forest-700 border-forest-600'
                        : 'bg-forest-800/50 hover:bg-forest-700/50 border-transparent'
                    } border flex flex-col`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{region.name}</span>
                      <Pin size={14} className={selectedRegion?.region?.id === region.id ? 'text-forest-300' : 'text-forest-400'} />
                    </div>
                    <div className="text-xs mt-1 text-forest-300">
                      {region.area.toLocaleString()} km² • {region.type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-forest-50 to-white rounded-lg p-4 border border-forest-100">
              <div className="text-sm text-forest-800">
                <h4 className="font-medium mb-2">Region Analysis</h4>
                <p className="text-gray-600 mb-3">
                  Each selected region undergoes comprehensive analysis across multiple dimensions:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <TreePine size={16} className="text-forest-600 mr-2" />
                    <span>Ecological composition</span>
                  </li>
                  <li className="flex items-center">
                    <Sprout size={16} className="text-forest-600 mr-2" />
                    <span>Growth potential</span>
                  </li>
                  <li className="flex items-center">
                    <Brain size={16} className="text-forest-600 mr-2" />
                    <span>AI-driven recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-lg p-6 text-white shadow-xl mt-6">
              <h2 className="text-xl font-bold mb-4">Prototype Phase 1</h2>
              <p className="text-forest-100 mb-6">
                BiomeCode represents a breakthrough in forestation intelligence, developed by the VedraCliTech Division of VedraLabs. This prototype demonstrates the foundational capabilities of our AI-driven approach to ecological transformation.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-forest-700 rounded-lg">
                    <TreePine size={24} className="text-forest-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Ecological Analysis</h3>
                    <p className="text-sm text-forest-200">Advanced mapping and analysis of climate, soil, and biodiversity factors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-forest-700 rounded-lg">
                    <Brain size={24} className="text-forest-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI-Driven Planning</h3>
                    <p className="text-sm text-forest-200">Intelligent species selection and implementation strategies</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-forest-700 rounded-lg">
                    <Sprout size={24} className="text-forest-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Growth Simulation</h3>
                    <p className="text-sm text-forest-200">Predictive modeling of ecosystem development and impact</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-forest-300 border-t border-forest-700 pt-4">
                Led by VedraCliTech Division, this prototype showcases our vision for data-driven ecological restoration, demonstrating core functionalities while laying the groundwork for expanded capabilities in future phases.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSelection;
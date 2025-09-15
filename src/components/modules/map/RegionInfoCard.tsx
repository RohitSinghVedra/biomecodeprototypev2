import React from 'react';
import { Region } from '../../../types';
import { MapPin, Circle, Hexagon } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { useRegion } from '../../../context/RegionContext';

interface RegionInfoCardProps {
  region: Region;
  preview?: boolean;
}

const RegionInfoCard: React.FC<RegionInfoCardProps> = ({ region, preview = false }) => {
  const { setSelectedRegion } = useRegion();
  
  const confirmSelection = () => {
    setSelectedRegion(region);
  };
  
  return (
    <Card className="bg-white border border-forest-200">
      <div className="flex items-start">
        <div className="p-2 bg-forest-100 rounded-md mr-3">
          {region.type === 'circle' ? (
            <Circle size={20} className="text-forest-700" />
          ) : (
            <Hexagon size={20} className="text-forest-700" />
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900">{region.name}</h3>
          
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Type:</span>
              <span className="ml-1 text-gray-900 capitalize">{region.type}</span>
            </div>
            
            <div>
              <span className="text-gray-500">Area:</span>
              <span className="ml-1 text-gray-900">{region.area.toLocaleString()} km²</span>
            </div>
            
            <div className="col-span-2">
              <span className="text-gray-500">Coordinates:</span>
              <span className="ml-1 text-gray-900">
                {region.center.lat.toFixed(4)}, {region.center.lng.toFixed(4)}
              </span>
            </div>
            
            {region.type === 'circle' && region.radius && (
              <div className="col-span-2">
                <span className="text-gray-500">Radius:</span>
                <span className="ml-1 text-gray-900">{region.radius.toFixed(2)} km</span>
              </div>
            )}
          </div>
          
          {preview && (
            <div className="mt-3">
              <Button onClick={confirmSelection} size="sm" className="w-full">
                Analyze This Region
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RegionInfoCard;
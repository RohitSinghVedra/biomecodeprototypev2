import React from 'react';
import { Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="text-primary-300" size={20} />
            <div>
              <span className="text-sm font-semibold">BiomeCode © 2025</span>
              <div className="text-xs text-gray-400">Forestation Intelligence Platform</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="h-10 w-auto bg-white rounded-md flex items-center justify-center px-3">
              <img 
                src="/vedra-clitech.png" 
                alt="VedraCliTech"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="h-10 w-auto bg-forest-800 rounded-md flex items-center justify-center px-3">
              <img 
                src="/vedralabs.png" 
                alt="VedraLabs"
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
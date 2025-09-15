import React, { useState } from 'react';
import { Leaf, Map, DropletIcon, CloudRain, BrainCircuit, BarChart3, Layers, Clock } from 'lucide-react';
import { useRegion } from '../../context/RegionContext';

const Header: React.FC = () => {
  const { selectedRegion, activeModule, setActiveModule } = useRegion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const modules = [
    { id: 'map', name: 'Map Selection', icon: <Map size={20} /> },
    { id: 'climate', name: 'Climate', icon: <CloudRain size={20} /> },
    { id: 'land', name: 'Land Cover', icon: <Layers size={20} /> },
    { id: 'soil', name: 'Soil Analysis', icon: <DropletIcon size={20} /> },
    { id: 'simulation', name: 'Simulation', icon: <BrainCircuit size={20} /> },
    { id: 'roadmap', name: 'Roadmap', icon: <Clock size={20} /> },
    { id: 'results', name: 'Results', icon: <BarChart3 size={20} /> },
  ];

  return (
    <header className="bg-gradient-to-r from-forest-800 to-forest-700 text-white py-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="text-primary-300" size={24} />
            <div>
              <h1 className="text-xl font-bold tracking-tight">BiomeCode</h1>
              <div className="text-xs text-forest-200">by VedraCliTech</div>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {modules.map((module) => {
              const isDisabled = module.id !== 'map' && !selectedRegion;
              const isActive = activeModule === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => !isDisabled && setActiveModule(module.id)}
                  disabled={isDisabled}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    flex items-center space-x-1.5
                    ${isActive 
                      ? 'bg-forest-600 text-white' 
                      : isDisabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'text-white/80 hover:bg-forest-600/50 hover:text-white'}
                  `}
                >
                  <span>{module.icon}</span>
                  <span>{module.name}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="md:hidden">
            <button 
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-forest-600">
            <nav className="flex flex-col space-y-2 mt-4">
              {modules.map((module) => {
                const isDisabled = module.id !== 'map' && !selectedRegion;
                const isActive = activeModule === module.id;
                
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      if (!isDisabled) {
                        setActiveModule(module.id);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    disabled={isDisabled}
                    className={`
                      px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200
                      flex items-center space-x-2 text-left
                      ${isActive 
                        ? 'bg-forest-600 text-white' 
                        : isDisabled 
                          ? 'opacity-50 cursor-not-allowed text-forest-300' 
                          : 'text-white/80 hover:bg-forest-600/50 hover:text-white'}
                    `}
                  >
                    <span>{module.icon}</span>
                    <span>{module.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
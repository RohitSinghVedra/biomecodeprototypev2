import React, { ReactNode } from 'react';

interface InfoPanelProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-fade-in ${className}`}>
      <div className="px-4 py-3 bg-gradient-to-r from-forest-700 to-forest-600 text-white flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default InfoPanel;
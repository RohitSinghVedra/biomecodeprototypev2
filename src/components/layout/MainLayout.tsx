import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { RegionProvider } from '../../context/RegionContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <RegionProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </RegionProvider>
  );
};

export default MainLayout;
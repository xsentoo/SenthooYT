import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <div
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 ${
            sidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-64'
          }`}
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <main className="container mx-auto px-4 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
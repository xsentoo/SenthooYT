import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  History,
  Clock,
  ThumbsUp,
  PlaySquare,
  ListVideo,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const navigationItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <PlaySquare size={20} />, label: 'Recent Videos', path: '/recent' },
    { icon: <History size={20} />, label: 'History', path: '/history' },
    { icon: <Clock size={20} />, label: 'Watch Later', path: '/watch-later' },
    { icon: <ThumbsUp size={20} />, label: 'Liked Videos', path: '/liked' },
    { icon: <ListVideo size={20} />, label: 'Playlists', path: '/playlists' }
  ];
  
  const helpItems = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help', path: '/help' }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside
      className={`fixed left-0 top-16 z-10 h-[calc(100vh-64px)] w-64 transform overflow-y-auto bg-white pt-2 shadow-md transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <nav className="px-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                isActive(item.path)
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
            Help & Settings
          </h3>
          <div className="space-y-1">
            {helpItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
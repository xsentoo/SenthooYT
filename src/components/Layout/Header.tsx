import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Youtube, Menu, Search, Bell, User } from 'lucide-react';
import SearchBar from '../Search/SearchBar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center">
            <Youtube size={28} className="mr-1 text-red-600" />
            <span className="text-xl font-semibold">YouClone</span>
          </Link>
        </div>
        
        <div className="hidden md:block">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <Search size={24} />
          </button>
          
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <Bell size={24} />
          </button>
          
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <User size={24} />
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-2 md:hidden">
        <SearchBar onSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header;
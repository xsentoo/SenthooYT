import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PlaylistFormProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter a playlist name');
      return;
    }
    
    onSubmit(name.trim());
  };
  
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Create New Playlist</h3>
        <button
          type="button"
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          onClick={onCancel}
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="playlistName" className="mb-1 block text-sm font-medium text-gray-700">
            Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
            placeholder="My Favorite Videos"
            autoFocus
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaylistForm;
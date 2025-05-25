import React, { useState } from 'react';
import { Playlist, Video } from '../../types';
import PlaylistItem from './PlaylistItem';
import PlaylistForm from './PlaylistForm';
import { PlusCircle, ListPlus } from 'lucide-react';

interface PlaylistManagerProps {
  playlists: Playlist[];
  currentVideo?: Video | null;
  onCreatePlaylist: (name: string) => void;
  onAddToPlaylist: (playlistId: string, video: Video) => void;
  onRemoveFromPlaylist: (playlistId: string, videoId: string) => void;
  onPlayVideo: (video: Video) => void;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  playlists,
  currentVideo,
  onCreatePlaylist,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  onPlayVideo
}) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    playlists.length > 0 ? playlists[0].id : null
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddToPlaylistForm, setShowAddToPlaylistForm] = useState(false);
  
  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId) || null;
  
  const handleCreatePlaylist = (name: string) => {
    onCreatePlaylist(name);
    setShowCreateForm(false);
  };
  
  const handleAddToPlaylist = (playlistId: string) => {
    if (currentVideo) {
      onAddToPlaylist(playlistId, currentVideo);
      setShowAddToPlaylistForm(false);
    }
  };
  
  return (
    <div className="flex h-full flex-col rounded-lg bg-white shadow-md">
      {showCreateForm ? (
        <PlaylistForm 
          onSubmit={handleCreatePlaylist} 
          onCancel={() => setShowCreateForm(false)} 
        />
      ) : showAddToPlaylistForm && currentVideo ? (
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Add to Playlist</h3>
            <button
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setShowAddToPlaylistForm(false)}
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          {playlists.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500">No playlists yet</p>
              <button
                className="mt-2 inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                onClick={() => {
                  setShowAddToPlaylistForm(false);
                  setShowCreateForm(true);
                }}
              >
                <PlusCircle size={16} className="mr-1" />
                Create Playlist
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {playlists.map(playlist => (
                <div 
                  key={playlist.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 p-2"
                >
                  <span className="font-medium">{playlist.name}</span>
                  <button
                    className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    Add
                  </button>
                </div>
              ))}
              
              <button
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setShowAddToPlaylistForm(false);
                  setShowCreateForm(true);
                }}
              >
                <PlusCircle size={16} className="mr-1" />
                Create New Playlist
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">My Playlists</h3>
              <button
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setShowCreateForm(true)}
              >
                <PlusCircle size={20} />
              </button>
            </div>
            
            {playlists.length === 0 ? (
              <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center">
                <ListPlus size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">No playlists yet</p>
                <button
                  className="mt-2 inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create Your First Playlist
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <select
                  value={selectedPlaylistId || ''}
                  onChange={(e) => setSelectedPlaylistId(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                >
                  {playlists.map(playlist => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.name} ({playlist.videos.length})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {selectedPlaylist && (
            <div className="flex-1 overflow-y-auto">
              {selectedPlaylist.videos.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <p className="mb-2 text-sm text-gray-500">
                    This playlist is empty
                  </p>
                  {currentVideo && (
                    <button
                      className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                      onClick={() => handleAddToPlaylist(selectedPlaylist.id)}
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Add Current Video
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  {selectedPlaylist.videos.map((video, index) => (
                    <PlaylistItem
                      key={video.id}
                      video={video}
                      isActive={currentVideo?.id === video.id}
                      index={index}
                      onSelect={onPlayVideo}
                      onRemove={(videoId) => onRemoveFromPlaylist(selectedPlaylist.id, videoId)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {currentVideo && (
            <div className="border-t border-gray-200 p-3">
              <button
                className="flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                onClick={() => setShowAddToPlaylistForm(true)}
              >
                <PlusCircle size={16} className="mr-1" />
                Add Current Video to Playlist
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlaylistManager;
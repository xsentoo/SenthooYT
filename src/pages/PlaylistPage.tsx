import React, { useState } from 'react';
import { usePlaylists } from '../hooks/usePlaylists';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import VideoInfo from '../components/VideoPlayer/VideoInfo';
import PlaylistItem from '../components/Playlist/PlaylistItem';
import { Video } from '../types';
import { ListVideo, PlusCircle } from 'lucide-react';

const PlaylistPage: React.FC = () => {
  const { playlists, createPlaylist, removeVideoFromPlaylist } = usePlaylists();
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    playlists.length > 0 ? playlists[0].id : null
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string>('');
  
  const currentPlaylist = currentPlaylistId
    ? playlists.find(p => p.id === currentPlaylistId) || null
    : null;
  
  const currentVideo = currentPlaylist && currentPlaylist.videos.length > 0
    ? currentPlaylist.videos[currentVideoIndex]
    : null;
  
  const handlePlayNext = () => {
    if (!currentPlaylist) return;
    
    const nextIndex = (currentVideoIndex + 1) % currentPlaylist.videos.length;
    setCurrentVideoIndex(nextIndex);
  };
  
  const handlePlaylistChange = (playlistId: string) => {
    setCurrentPlaylistId(playlistId);
    setCurrentVideoIndex(0);
  };
  
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreateForm(false);
    }
  };
  
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">My Playlists</h1>
      
      {playlists.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <ListVideo size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="mb-2 text-xl font-medium text-gray-900">No Playlists Yet</h2>
          <p className="mb-4 text-gray-600">
            Create your first playlist to organize your favorite videos
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <PlusCircle size={18} className="mr-2" />
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {currentVideo ? (
              <>
                <VideoPlayer 
                  video={currentVideo} 
                  autoplay={true} 
                  onVideoEnd={handlePlayNext} 
                />
                <div className="mt-4">
                  <VideoInfo video={currentVideo} />
                </div>
              </>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 text-center">
                <div className="max-w-md p-6">
                  <ListVideo size={48} className="mx-auto mb-4 text-gray-400" />
                  <h2 className="mb-2 text-xl font-medium text-gray-900">No Videos in Playlist</h2>
                  <p className="text-gray-600">
                    This playlist is empty. Add videos while watching them.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white shadow-md">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Playlists</h3>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                
                {showCreateForm ? (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="Playlist name"
                      className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCreatePlaylist}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setShowCreateForm(false)}
                        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <select
                      value={currentPlaylistId || ''}
                      onChange={(e) => handlePlaylistChange(e.target.value)}
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
              
              {currentPlaylist && (
                <div className="max-h-[500px] overflow-y-auto">
                  {currentPlaylist.videos.length === 0 ? (
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-500">
                        This playlist is empty
                      </p>
                    </div>
                  ) : (
                    currentPlaylist.videos.map((video, index) => (
                      <PlaylistItem
                        key={video.id}
                        video={video}
                        isActive={index === currentVideoIndex}
                        index={index}
                        onSelect={() => setCurrentVideoIndex(index)}
                        onRemove={(videoId) => removeVideoFromPlaylist(currentPlaylist.id, videoId)}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
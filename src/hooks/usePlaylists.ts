import { useState, useEffect, useCallback } from 'react';
import { Playlist, Video } from '../types';
import { savePlaylists, loadPlaylists } from '../utils/storageUtils';

interface UsePlaylistsReturn {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  addVideoToPlaylist: (playlistId: string, video: Video) => void;
  removeVideoFromPlaylist: (playlistId: string, videoId: string) => void;
  reorderPlaylist: (playlistId: string, oldIndex: number, newIndex: number) => void;
  getPlaylist: (id: string) => Playlist | undefined;
}

export const usePlaylists = (): UsePlaylistsReturn => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  
  // Load playlists from local storage on mount
  useEffect(() => {
    setPlaylists(loadPlaylists());
  }, []);
  
  // Save playlists to local storage when they change
  useEffect(() => {
    savePlaylists(playlists);
  }, [playlists]);
  
  // Create a new playlist
  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      videos: []
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
  }, []);
  
  // Delete a playlist
  const deletePlaylist = useCallback((id: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
  }, []);
  
  // Add a video to a playlist
  const addVideoToPlaylist = useCallback((playlistId: string, video: Video) => {
    setPlaylists(prev => 
      prev.map(playlist => {
        if (playlist.id !== playlistId) return playlist;
        
        // Check if video already exists in playlist
        const videoExists = playlist.videos.some(v => v.id === video.id);
        if (videoExists) return playlist;
        
        return {
          ...playlist,
          videos: [...playlist.videos, video]
        };
      })
    );
  }, []);
  
  // Remove a video from a playlist
  const removeVideoFromPlaylist = useCallback((playlistId: string, videoId: string) => {
    setPlaylists(prev => 
      prev.map(playlist => {
        if (playlist.id !== playlistId) return playlist;
        
        return {
          ...playlist,
          videos: playlist.videos.filter(video => video.id !== videoId)
        };
      })
    );
  }, []);
  
  // Reorder videos in a playlist
  const reorderPlaylist = useCallback((
    playlistId: string, 
    oldIndex: number, 
    newIndex: number
  ) => {
    setPlaylists(prev => 
      prev.map(playlist => {
        if (playlist.id !== playlistId) return playlist;
        
        const newVideos = [...playlist.videos];
        const [removed] = newVideos.splice(oldIndex, 1);
        newVideos.splice(newIndex, 0, removed);
        
        return {
          ...playlist,
          videos: newVideos
        };
      })
    );
  }, []);
  
  // Get a specific playlist by ID
  const getPlaylist = useCallback((id: string) => {
    return playlists.find(playlist => playlist.id === id);
  }, [playlists]);
  
  return {
    playlists,
    createPlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    reorderPlaylist,
    getPlaylist
  };
};
import { Playlist, Video } from '../types';

const PLAYLISTS_STORAGE_KEY = 'youtube_clone_playlists';
const WATCH_HISTORY_KEY = 'youtube_clone_watch_history';

/**
 * Save playlists to local storage
 */
export const savePlaylists = (playlists: Playlist[]): void => {
  localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists));
};

/**
 * Load playlists from local storage
 */
export const loadPlaylists = (): Playlist[] => {
  const data = localStorage.getItem(PLAYLISTS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save a video to watch history
 */
export const addToWatchHistory = (video: Video): void => {
  const history = getWatchHistory();
  
  // Remove video if it already exists in history
  const filteredHistory = history.filter(v => v.id !== video.id);
  
  // Add video to beginning of history
  const updatedHistory = [video, ...filteredHistory].slice(0, 50); // Keep max 50 videos
  
  localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updatedHistory));
};

/**
 * Get watch history
 */
export const getWatchHistory = (): Video[] => {
  const data = localStorage.getItem(WATCH_HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Clear watch history
 */
export const clearWatchHistory = (): void => {
  localStorage.removeItem(WATCH_HISTORY_KEY);
};
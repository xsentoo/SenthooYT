import { create } from 'zustand';
import { Video } from '../types';

interface AppState {
  // Theme state
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Background playback state
  backgroundPlayback: boolean;
  toggleBackgroundPlayback: () => void;
  
  // Current video state
  currentVideo: Video | null;
  setCurrentVideo: (video: Video | null) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Theme state
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Background playback state
  backgroundPlayback: false,
  toggleBackgroundPlayback: () => set((state) => ({ backgroundPlayback: !state.backgroundPlayback })),
  
  // Current video state
  currentVideo: null,
  setCurrentVideo: (video) => set({ currentVideo: video }),
  
  // UI state
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open })
}));
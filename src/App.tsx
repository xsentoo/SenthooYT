import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import VideoPage from './pages/VideoPage';
import PlaylistPage from './pages/PlaylistPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="playlists" element={<PlaylistPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="recent" element={<HomePage />} />
          <Route path="watch-later" element={<PlaylistPage />} />
          <Route path="liked" element={<PlaylistPage />} />
          <Route path="settings" element={<div className="p-8 text-center text-lg text-gray-500">Settings page coming soon</div>} />
          <Route path="help" element={<div className="p-8 text-center text-lg text-gray-500">Help page coming soon</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
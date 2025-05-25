import React from 'react';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import { useYoutubeApi } from '../hooks/useYoutubeApi';

const HomePage: React.FC = () => {
  const { videos, loading, error, hasMore, loadMore } = useYoutubeApi();
  
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Popular Videos</h1>
      
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      
      <VideoGrid
        videos={videos}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </div>
  );
};

export default HomePage;
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import { useYoutubeApi } from '../hooks/useYoutubeApi';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { videos, loading, error, hasMore, loadMore, fetchVideos } = useYoutubeApi(query);
  
  useEffect(() => {
    if (query) {
      fetchVideos(query);
    }
  }, [query, fetchVideos]);
  
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        {query ? `Search results for "${query}"` : 'Search Results'}
      </h1>
      
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

export default SearchPage;
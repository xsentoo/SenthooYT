import React, { useRef } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import { Video } from '../../types';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loader } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading, hasMore, loadMore }) => {
  const { observerRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore
  });
  
  return (
    <div className="container mx-auto px-4">
      {videos.length === 0 && !loading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50 p-6 text-center">
          <h3 className="mb-2 text-xl font-medium text-gray-700">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or check back later for new videos.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          {loading && (
            <div className="my-8 flex items-center justify-center">
              <div className="relative">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200"></div>
                <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-t-4 border-red-600"></div>
              </div>
              <span className="ml-3 text-gray-600">Loading more videos...</span>
            </div>
          )}
          
          {!loading && hasMore && <div ref={observerRef} className="h-10" />}
        </>
      )}
    </div>
  );
};

export default VideoGrid;
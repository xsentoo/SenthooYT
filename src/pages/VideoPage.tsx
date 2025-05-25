import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoDetails, processVideoData, searchVideos } from '../services/youtubeService';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import VideoInfo from '../components/VideoPlayer/VideoInfo';
import VideoCard from '../components/VideoCard/VideoCard';
import PlaylistManager from '../components/Playlist/PlaylistManager';
import { usePlaylists } from '../hooks/usePlaylists';
import { Video } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [similarVideos, setSimilarVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPlaylistManager, setShowPlaylistManager] = useState<boolean>(false);
  
  const {
    playlists,
    createPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist
  } = usePlaylists();
  
  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await getVideoDetails([id]);
        const processedVideos = processVideoData(response);
        
        if (processedVideos.length > 0) {
          const currentVideo = processedVideos[0];
          setVideo(currentVideo);
          
          try {
            // Fetch similar videos based on the current video's title
            const searchResponse = await searchVideos(currentVideo.title, 12);
            
            // Ensure searchResponse and searchResponse.items exist and items is an array
            if (searchResponse && Array.isArray(searchResponse.items)) {
              const similarVideos = processVideoData(
                searchResponse.items
                  .filter(item => item.id !== id) // Remove current video
                  .slice(0, 8) // Limit to 8 similar videos
              );
              setSimilarVideos(similarVideos);
            } else {
              // If searchResponse is invalid, set empty array
              setSimilarVideos([]);
            }
          } catch (searchError) {
            console.error('Error fetching similar videos:', searchError);
            // Set empty array on error
            setSimilarVideos([]);
          }
        } else {
          setError('Video not found');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideo();
  }, [id]);
  
  const handlePreviousVideo = () => {
    const currentIndex = similarVideos.findIndex(v => v.id === id);
    if (currentIndex > 0) {
      navigate(`/video/${similarVideos[currentIndex - 1].id}`);
    }
  };
  
  const handleNextVideo = () => {
    const currentIndex = similarVideos.findIndex(v => v.id === id);
    if (currentIndex < similarVideos.length - 1) {
      navigate(`/video/${similarVideos[currentIndex + 1].id}`);
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {loading ? (
          <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200"></div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        ) : (
          <>
            <div className="relative">
              <VideoPlayer video={video} autoplay={true} />
              
              <div className="absolute bottom-16 left-0 right-0 flex justify-between px-4">
                <button
                  onClick={handlePreviousVideo}
                  className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  disabled={similarVideos.findIndex(v => v.id === id) <= 0}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={handleNextVideo}
                  className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  disabled={similarVideos.findIndex(v => v.id === id) >= similarVideos.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <VideoInfo 
                video={video as Video} 
                onAddToPlaylist={() => setShowPlaylistManager(true)} 
              />
            </div>
            
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Similar Videos</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {similarVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className={`lg:col-span-1 ${showPlaylistManager ? 'block' : 'hidden lg:block'}`}>
        <PlaylistManager
          playlists={playlists}
          currentVideo={video}
          onCreatePlaylist={createPlaylist}
          onAddToPlaylist={addVideoToPlaylist}
          onRemoveFromPlaylist={removeVideoFromPlaylist}
          onPlayVideo={(video) => {
            navigate(`/video/${video.id}`);
          }}
        />
      </div>
    </div>
  );
};

export default VideoPage;
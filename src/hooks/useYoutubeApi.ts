import { useState, useEffect, useCallback } from 'react';
import { 
  searchVideos, 
  getVideoDetails, 
  processVideoData, 
  getRecentVideos 
} from '../services/youtubeService';
import { Video, SearchResponse } from '../types';

interface UseYoutubeApiReturn {
  videos: Video[];
  loading: boolean;
  error: string | null;
  nextPageToken: string;
  hasMore: boolean;
  fetchVideos: (query?: string) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useYoutubeApi = (initialQuery = ''): UseYoutubeApiReturn => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentQuery, setCurrentQuery] = useState<string>(initialQuery);

  const fetchVideos = useCallback(async (query?: string) => {
    const searchQuery = query !== undefined ? query : currentQuery;
    
    try {
      setLoading(true);
      setError(null);
      
      let searchResponse: SearchResponse;
      
      // If query is empty, get recent videos
      if (!searchQuery) {
        searchResponse = await getRecentVideos();
      } else {
        searchResponse = await searchVideos(searchQuery);
      }
      
      // Set next page token
      setNextPageToken(searchResponse.nextPageToken || '');
      setHasMore(!!searchResponse.nextPageToken);
      
      // Get video IDs from search results
      const videoIds = searchResponse.items
        .filter(item => item.id.videoId)
        .map(item => item.id.videoId as string);
      
      if (videoIds.length === 0) {
        setVideos([]);
        setLoading(false);
        return;
      }
      
      // Get video details
      const videoDetails = await getVideoDetails(videoIds);
      const processedVideos = processVideoData(videoDetails);
      
      setVideos(processedVideos);
      setCurrentQuery(searchQuery);
    } catch (err) {
      setError('Failed to fetch videos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentQuery]);
  
  const loadMore = useCallback(async () => {
    if (!nextPageToken || loading) return;
    
    try {
      setLoading(true);
      
      let searchResponse: SearchResponse;
      
      // If query is empty, get recent videos
      if (!currentQuery) {
        searchResponse = await getRecentVideos(12, nextPageToken);
      } else {
        searchResponse = await searchVideos(currentQuery, 12, nextPageToken);
      }
      
      // Set next page token
      setNextPageToken(searchResponse.nextPageToken || '');
      setHasMore(!!searchResponse.nextPageToken);
      
      // Get video IDs from search results
      const videoIds = searchResponse.items
        .filter(item => item.id.videoId)
        .map(item => item.id.videoId as string);
      
      if (videoIds.length === 0) {
        setLoading(false);
        return;
      }
      
      // Get video details
      const videoDetails = await getVideoDetails(videoIds);
      const processedVideos = processVideoData(videoDetails);
      
      setVideos(prev => [...prev, ...processedVideos]);
    } catch (err) {
      setError('Failed to load more videos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentQuery, loading, nextPageToken]);
  
  // Load initial videos
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);
  
  return {
    videos,
    loading,
    error,
    nextPageToken,
    hasMore,
    fetchVideos,
    loadMore
  };
};
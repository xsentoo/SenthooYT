import axios from 'axios';
import { SearchResponse, VideoResponse, Video } from '../types';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search videos using the YouTube API
 */
export const searchVideos = async (
  query: string,
  maxResults = 12,
  pageToken = '',
  order = 'viewCount'
): Promise<SearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults,
        q: query,
        type: 'video',
        key: API_KEY,
        pageToken: pageToken || undefined,
        order,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

/**
 * Get video details by ID
 */
export const getVideoDetails = async (videoIds: string[]): Promise<VideoResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

/**
 * Get videos from a specific playlist
 */
export const getPlaylistItems = async (
  playlistId: string,
  maxResults = 12,
  pageToken = ''
): Promise<SearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/playlistItems`, {
      params: {
        part: 'snippet',
        maxResults,
        playlistId,
        key: API_KEY,
        pageToken: pageToken || undefined,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    throw error;
  }
};

/**
 * Get trending videos
 */
export const getTrendingVideos = async (
  maxResults = 12,
  pageToken = '',
  regionCode = 'US'
): Promise<SearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults,
        regionCode,
        key: API_KEY,
        pageToken: pageToken || undefined,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
};

/**
 * Process video data to standardize format
 */
export const processVideoData = (data: VideoResponse): Video[] => {
  return data.items.map(item => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnails: item.snippet.thumbnails,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    duration: item.contentDetails?.duration || '',
    viewCount: item.statistics?.viewCount || '0',
    channelId: item.snippet.channelId
  }));
};

/**
 * Get recent videos
 */
export const getRecentVideos = async (
  maxResults = 12,
  pageToken = ''
): Promise<SearchResponse> => {
  try {
    // Search for popular videos sorted by view count
    return await searchVideos('', maxResults, pageToken, 'viewCount');
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    throw error;
  }
};
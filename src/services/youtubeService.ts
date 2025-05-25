import axios from 'axios';
import { SearchResponse, VideoResponse, Video } from '../types';

// Nouvelle clé API intégrée directement
const API_KEY = 'AIzaSyC6rkJxIA89bz2eWHCxePBRIAgVaPso_KA';

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
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
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
  } catch (error: any) {
    console.error('Error searching videos:', error.response?.data || error.message);
    throw new Error('Failed to fetch videos. Please try again.');
  }
};

/**
 * Get video details by ID
 */
export const getVideoDetails = async (videoIds: string[]): Promise<VideoResponse> => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching video details:', error.response?.data || error.message);
    throw new Error('Failed to fetch video details.');
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
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet',
        maxResults,
        playlistId,
        key: API_KEY,
        pageToken: pageToken || undefined,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching playlist items:', error.response?.data || error.message);
    throw new Error('Failed to fetch playlist items.');
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
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
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
  } catch (error: any) {
    console.error('Error fetching trending videos:', error.response?.data || error.message);
    throw new Error('Failed to fetch trending videos.');
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
    return await searchVideos('', maxResults, pageToken, 'viewCount');
  } catch (error: any) {
    console.error('Error fetching recent videos:', error.response?.data || error.message);
    throw new Error('Failed to fetch recent videos.');
  }
};

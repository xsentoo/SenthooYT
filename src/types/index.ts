export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  channelId: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface SearchResponse {
  items: SearchItem[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface SearchItem {
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
  };
}

export interface VideoResponse {
  items: VideoItem[];
}

export interface VideoItem {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface Playlist {
  id: string;
  name: string;
  videos: Video[];
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Video } from '../../types';
import { formatViewCount, formatPublishedDate, formatDuration, truncateText } from '../../utils/formatUtils';

interface VideoCardProps {
  video: Video;
  isPlaylist?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isPlaylist = false }) => {
  const thumbnailUrl = video.thumbnails.medium?.url || video.thumbnails.default?.url;
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md">
      <Link to={`/video/${video.id}`} className="relative block overflow-hidden rounded-lg">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {video.duration && (
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
            {formatDuration(video.duration)}
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          <Clock className="h-12 w-12 text-white opacity-80" />
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-3">
        <Link to={`/video/${video.id}`} className="mb-1 font-medium leading-tight text-gray-900 hover:text-red-600">
          {truncateText(video.title, 60)}
        </Link>
        
        <Link to={`/channel/${video.channelId}`} className="mb-1 text-sm text-gray-700 hover:text-gray-900">
          {video.channelTitle}
        </Link>
        
        <div className="mt-auto flex items-center text-xs text-gray-500">
          <span>{formatViewCount(video.viewCount)}</span>
          <span className="mx-1">•</span>
          <span>{formatPublishedDate(video.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
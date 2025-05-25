import React, { useState } from 'react';
import { Video } from '../../types';
import { formatViewCount, formatPublishedDate } from '../../utils/formatUtils';
import { ThumbsUp, MessageSquare, Share2, Heart, PlusCircle } from 'lucide-react';

interface VideoInfoProps {
  video: Video;
  onAddToPlaylist?: () => void;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video, onAddToPlaylist }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!video) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">{video.title}</h1>
      
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div>
          <div className="flex items-center">
            <a href={`https://www.youtube.com/channel/${video.channelId}`} target="_blank" rel="noopener noreferrer" className="mr-2 font-medium text-gray-900 hover:text-red-600">
              {video.channelTitle}
            </a>
          </div>
          <div className="text-sm text-gray-500">
            {formatViewCount(video.viewCount)} • {formatPublishedDate(video.publishedAt)}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
            <ThumbsUp className="h-4 w-4" />
            <span>Like</span>
          </button>
          
          <button className="flex items-center space-x-1 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          
          <button 
            onClick={onAddToPlaylist}
            className="flex items-center space-x-1 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
      
      <div className="rounded-lg bg-gray-50 p-4">
        <div className={`whitespace-pre-line text-sm text-gray-700 ${!showFullDescription && 'line-clamp-3'}`}>
          {video.description}
        </div>
        {video.description && video.description.length > 150 && (
          <button
            className="mt-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoInfo;
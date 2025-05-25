import React from 'react';
import { Video } from '../../types';
import { truncateText } from '../../utils/formatUtils';
import { Trash2, GripVertical } from 'lucide-react';

interface PlaylistItemProps {
  video: Video;
  isActive?: boolean;
  index: number;
  onSelect: (video: Video) => void;
  onRemove: (videoId: string) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  video,
  isActive = false,
  index,
  onSelect,
  onRemove
}) => {
  const thumbnailUrl = video.thumbnails.default?.url || '';
  
  return (
    <div 
      className={`group flex cursor-pointer items-center gap-3 p-2 transition-colors hover:bg-gray-100 ${
        isActive ? 'bg-gray-100' : ''
      }`}
      onClick={() => onSelect(video)}
    >
      <div className="flex h-full items-center text-gray-400 opacity-0 group-hover:opacity-100">
        <GripVertical size={16} />
      </div>
      
      <div className="flex-shrink-0 font-medium text-gray-500">
        {index + 1}
      </div>
      
      <div className="relative flex-shrink-0">
        <img 
          src={thumbnailUrl} 
          alt={video.title} 
          className="h-10 w-16 object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium text-gray-900">{truncateText(video.title, 40)}</p>
        <p className="truncate text-xs text-gray-500">{video.channelTitle}</p>
      </div>
      
      <button
        className="flex-shrink-0 p-1 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(video.id);
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default PlaylistItem;
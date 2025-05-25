import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format view counts to human-readable format
 */
export const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount);
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  } else {
    return `${count} views`;
  }
};

/**
 * Format ISO date to relative time (e.g., "2 days ago")
 */
export const formatPublishedDate = (isoDate: string): string => {
  try {
    return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown date';
  }
};

/**
 * Convert ISO 8601 duration to human readable format (e.g., "PT1H30M15S" to "1:30:15")
 */
export const formatDuration = (isoDuration: string): string => {
  if (!isoDuration) return '';
  
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
  if (!match) return '';
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { addToWatchHistory } from '../utils/storageUtils';
import { Video } from '../types';

interface UseVideoPlayerProps {
  video: Video | null;
  autoplay?: boolean;
  onVideoEnd?: () => void;
}

interface UseVideoPlayerReturn {
  playerRef: React.RefObject<ReactPlayer>;
  playing: boolean;
  volume: number;
  muted: boolean;
  played: number;
  duration: number;
  seeking: boolean;
  isPipActive: boolean;
  playbackRate: number;
  handlePlay: () => void;
  handlePause: () => void;
  handleVolume: (value: number) => void;
  handleMute: () => void;
  handleSeek: (value: number) => void;
  handleSeekMouseDown: () => void;
  handleSeekMouseUp: (value: number) => void;
  handlePlaybackRate: (rate: number) => void;
  handleProgress: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
  handleDuration: (duration: number) => void;
  handlePictureInPicture: () => void;
  formatTime: (seconds: number) => string;
}

export const useVideoPlayer = ({
  video,
  autoplay = false,
  onVideoEnd
}: UseVideoPlayerProps): UseVideoPlayerReturn => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(autoplay);
  const [volume, setVolume] = useState<number>(0.8);
  const [muted, setMuted] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [isPipActive, setIsPipActive] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  
  // Add video to watch history when it starts playing
  useEffect(() => {
    if (video && playing && played > 0.01) {
      addToWatchHistory(video);
    }
  }, [video, playing, played]);
  
  // Reset player state when video changes
  useEffect(() => {
    if (video) {
      setPlayed(0);
      setPlaying(autoplay);
    }
  }, [video, autoplay]);
  
  const handlePlay = useCallback(() => {
    setPlaying(true);
  }, []);
  
  const handlePause = useCallback(() => {
    setPlaying(false);
  }, []);
  
  const handleVolume = useCallback((value: number) => {
    setVolume(value);
    setMuted(value === 0);
  }, []);
  
  const handleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);
  
  const handleSeek = useCallback((value: number) => {
    setPlayed(value);
  }, []);
  
  const handleSeekMouseDown = useCallback(() => {
    setSeeking(true);
  }, []);
  
  const handleSeekMouseUp = useCallback((value: number) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(value);
    }
  }, []);
  
  const handlePlaybackRate = useCallback((rate: number) => {
    setPlaybackRate(rate);
  }, []);
  
  const handleProgress = useCallback(
    (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
      if (!seeking) {
        setPlayed(state.played);
      }
    },
    [seeking]
  );
  
  const handleDuration = useCallback((duration: number) => {
    setDuration(duration);
  }, []);
  
  const handlePictureInPicture = useCallback(() => {
    try {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
        setIsPipActive(false);
      } else {
        const videoElement = playerRef.current?.getInternalPlayer() as HTMLVideoElement;
        if (videoElement && videoElement.requestPictureInPicture) {
          videoElement.requestPictureInPicture();
          setIsPipActive(true);
        }
      }
    } catch (error) {
      console.error('Picture-in-Picture failed:', error);
    }
  }, []);
  
  const formatTime = useCallback((seconds: number): string => {
    if (isNaN(seconds)) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  }, []);
  
  return {
    playerRef,
    playing,
    volume,
    muted,
    played,
    duration,
    seeking,
    isPipActive,
    playbackRate,
    handlePlay,
    handlePause,
    handleVolume,
    handleMute,
    handleSeek,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handlePlaybackRate,
    handleProgress,
    handleDuration,
    handlePictureInPicture,
    formatTime
  };
};
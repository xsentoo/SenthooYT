import React from 'react';
import ReactPlayer from 'react-player';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { Video } from '../../types';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
  video: Video | null;
  autoplay?: boolean;
  onVideoEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  video, 
  autoplay = false,
  onVideoEnd
}) => {
  const {
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
  } = useVideoPlayer({ video, autoplay, onVideoEnd });

  if (!video) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">No video selected</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-black">
      <div className="aspect-video w-full">
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${video.id}`}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={onVideoEnd}
          onProgress={handleProgress}
          onDuration={handleDuration}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
      </div>

      <VideoControls
        playing={playing}
        volume={volume}
        muted={muted}
        played={played}
        duration={duration}
        isPipActive={isPipActive}
        playbackRate={playbackRate}
        onPlay={handlePlay}
        onPause={handlePause}
        onVolume={handleVolume}
        onMute={handleMute}
        onSeek={handleSeek}
        onSeekMouseDown={handleSeekMouseDown}
        onSeekMouseUp={handleSeekMouseUp}
        onPlaybackRate={handlePlaybackRate}
        onPictureInPicture={handlePictureInPicture}
        formatTime={formatTime}
      />
    </div>
  );
};

export default VideoPlayer;
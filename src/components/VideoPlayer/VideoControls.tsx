import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  PictureInPicture2,
  Settings
} from 'lucide-react';

interface VideoControlsProps {
  playing: boolean;
  volume: number;
  muted: boolean;
  played: number;
  duration: number;
  isPipActive: boolean;
  playbackRate: number;
  onPlay: () => void;
  onPause: () => void;
  onVolume: (value: number) => void;
  onMute: () => void;
  onSeek: (value: number) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: (value: number) => void;
  onPlaybackRate: (rate: number) => void;
  onPictureInPicture: () => void;
  formatTime: (seconds: number) => string;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  playing,
  volume,
  muted,
  played,
  duration,
  isPipActive,
  playbackRate,
  onPlay,
  onPause,
  onVolume,
  onMute,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  onPlaybackRate,
  onPictureInPicture,
  formatTime
}) => {
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  let controlsTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(controlsTimeout);

      controlsTimeout = setTimeout(() => {
        if (playing) {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(controlsTimeout);
    };
  }, [playing]);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-2 pt-10 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Progress bar */}
      <div className="group mb-2 h-1">
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-400 accent-red-600 focus:outline-none group-hover:h-2"
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          onMouseDown={onSeekMouseDown}
          onMouseUp={() => onSeekMouseUp(played)}
          onTouchStart={onSeekMouseDown}
          onTouchEnd={() => onSeekMouseUp(played)}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center space-x-4">
          {/* Play/Pause button */}
          <button
            className="rounded-full p-1 transition-colors hover:bg-white/20"
            onClick={playing ? onPause : onPlay}
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Volume control */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              onClick={onMute}
            >
              {muted || volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            {showVolumeSlider && (
              <div className="absolute bottom-full left-0 rounded-md bg-black/80 p-2">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={muted ? 0 : volume}
                  className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-gray-400 accent-red-600"
                  onChange={(e) => onVolume(parseFloat(e.target.value))}
                />
              </div>
            )}
          </div>

          {/* Time display */}
          <div className="text-sm">
            {formatTime(duration * played)} / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* PiP button */}
          <button
            className={`rounded-full p-1 transition-colors hover:bg-white/20 ${
              isPipActive ? 'text-red-500' : ''
            }`}
            onClick={onPictureInPicture}
          >
            <PictureInPicture2 size={20} />
          </button>

          {/* Settings button */}
          <div className="relative">
            <button
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={20} />
            </button>
            {showSettings && (
              <div className="absolute bottom-full right-0 min-w-[150px] rounded-md bg-black/90 p-2 text-sm">
                <div className="mb-2 border-b border-gray-700 pb-1 font-medium">
                  Playback Speed
                </div>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`block w-full rounded-sm px-3 py-1.5 text-left ${
                      playbackRate === rate ? 'bg-red-600 text-white' : 'hover:bg-white/10'
                    }`}
                    onClick={() => {
                      onPlaybackRate(rate);
                      setShowSettings(false);
                    }}
                  >
                    {rate === 1 ? 'Normal' : `${rate}x`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen button */}
          <button
            className="rounded-full p-1 transition-colors hover:bg-white/20"
            onClick={handleFullscreen}
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
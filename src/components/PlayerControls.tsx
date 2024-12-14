import { Play, Pause, Volume2, VolumeX, SkipBack } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onRestart: () => void;
  disabled: boolean;
}

export function PlayerControls({
  isPlaying,
  isMuted,
  onPlayPause,
  onMute,
  onRestart,
  disabled
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onRestart}
        disabled={disabled}
        className="p-2 rounded-full bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SkipBack size={24} />
      </button>
      <button
        onClick={onPlayPause}
        disabled={disabled}
        className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
      </button>
      <button
        onClick={onMute}
        disabled={disabled}
        className="p-2 rounded-full bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
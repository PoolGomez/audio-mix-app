import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number) => void;
  onMute: () => void;
}

export function VolumenControl({ volume, isMuted, onVolumeChange, onMute }: VolumeControlProps) {
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.3) return <Volume size={20} />;
    if (volume < 0.7) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onMute}
        className="p-1 hover:bg-gray-700 rounded-full transition-colors"
      >
        {getVolumeIcon()}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="w-20 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
}
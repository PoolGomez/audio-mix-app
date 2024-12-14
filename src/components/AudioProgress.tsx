interface AudioProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function AudioProgress({ currentTime, duration, onSeek }: AudioProgressProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-1">
      <input
        type="range"
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration || 0)}</span>
      </div>
    </div>
  );
}
import { Disc } from 'lucide-react';

interface VinylDiscProps {
  isPlaying: boolean;
  coverUrl?: string;
}

export function VinylDisc({ isPlaying, coverUrl }: VinylDiscProps) {
  return (
    <div className="relative w-full aspect-square">
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 
          ${isPlaying ? 'animate-spin-slow' : ''}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt="Track cover"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <Disc className="w-12 h-12 text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
}
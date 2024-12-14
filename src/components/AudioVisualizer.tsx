interface AudioVisualizerProps {
    progress: number;
  }
  
  export function AudioVisualizer({ progress }: AudioVisualizerProps) {
    return (
      <div className="h-1 w-full bg-gray-700 rounded overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
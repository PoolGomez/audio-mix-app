import React, { useEffect, useRef, useState } from 'react';
import { Music } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';
import { calculateProgress, formatTime } from '../utils/audio';

interface SoundButtonProps {
  label: string;
  index: number;
}

export function SoundButton({index }: SoundButtonProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(calculateProgress(audio.currentTime, audio.duration));
    };

    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(file);
        setCurrentTime(0);
        setDuration(0);
        setProgress(0);
        
        //color aleatorio
        const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        setBgColor(randomColor);

      }
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const bgColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-esmerald-500",
    "bg-teal-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-amber-500",
  ];

  return (
    <div className="flex flex-col space-y-2 bg-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between">
        {/* <span className="hidden xl:block text-sm font-medium text-gray-300">{label}</span> */}
        <label className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer">
          {audioFile ? 'Cambiar' : 'Seleccionar'}
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
            id={`sound-input-${index}`}
          />
        </label>
      </div>

      {audioFile && (
        <div className="text-xs text-gray-400 truncate">
          {audioFile.name}
        </div>
      )}

      <button
        onClick={playSound}
        disabled={!audioFile}
        className={`w-full aspect-square rounded-lg flex items-center justify-center transition-colors ${
          // isPlaying
          //   ? 'bg-indigo-600 hover:bg-indigo-700'
          //   : 
          audioFile
            ? bgColor
            : 'bg-gray-700 cursor-not-allowed'
        }`}
      >
        <Music className="text-white" size={32} />
      </button>

      <div className="space-y-1">
        <AudioVisualizer progress={progress} />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
import React, { useRef, useState, useEffect } from 'react';



// import { VolumenControl } from './VolumenControl';
import { PlayerControls } from './PlayerControls';
import { AudioProgress } from './AudioProgress';
import { VolumenControl } from './VolumenControl';
import { VinylDisc } from './VinylDisc';

interface AudioPlayerProps {
  playerId: number;
}

export function AudioPlayer({ playerId }: AudioPlayerProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
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
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl shadow-xl text-white">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Disco {playerId}</span>
          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer text-sm">
            <span>{audioFile ? 'Cambiar pista' : 'Seleccionar pista'}</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center">
          {audioFile && (
            <p className="text-sm text-gray-300 truncate">
              {audioFile.name}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="w-32">
            <VinylDisc isPlaying={isPlaying} />
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <AudioProgress
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />
            
            <div className="space-y-3">
              <PlayerControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                onPlayPause={togglePlay}
                onMute={toggleMute}
                onRestart={handleRestart}
                disabled={!audioFile}
              />
              
              <VolumenControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onMute={toggleMute}
              />
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          className="hidden"
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
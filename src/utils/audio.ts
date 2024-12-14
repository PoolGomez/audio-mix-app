export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  export const calculateProgress = (currentTime: number, duration: number): number => {
    if (!duration) return 0;
    return (currentTime / duration) * 100;
  };
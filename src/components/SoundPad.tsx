import { SoundButton } from "./SoundButton";


interface SoundPadProps {
  buttonCount: number;
}

export function SoundPad({ buttonCount }: SoundPadProps) {
  return (
    <div className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 p-2`}>
      {Array.from({ length: buttonCount }).map((_, index) => (
        <SoundButton key={index} label={`Sonido ${index + 1}`} index={index} />
      ))}
    </div>
  );
}
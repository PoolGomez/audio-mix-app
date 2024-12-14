// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Minus, Plus, Settings } from 'lucide-react'
import './App.css'
import { useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { SoundPadConfig } from './components/SoundPadConfig';
import { SoundPad } from './components/SoundPad';

function App() {

  const [playerCount, setPlayerCount] = useState(1);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [buttonCount, setButtonCount] = useState(8);

  const addPlayer = () => {
    if (playerCount < 4) {
      setPlayerCount(playerCount + 1);
    }
  };

  const removePlayer = () => {
    if (playerCount > 1) {
      setPlayerCount(playerCount - 1);
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-4 md:p-4">
      {/* max-w-6xl mx-auto space-y-8 */}
      <div className="max-w-8xl mx-auto space-y-2">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-2 rounded-lg shadow-md gap-2">
          <h1 className="text-2xl font-bold text-gray-800">Audio Mix</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={removePlayer}
              disabled={playerCount <= 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <Minus size={24} />
            </button>
            <span className="font-medium">
              {playerCount} {playerCount === 1 ? 'Reproductor' : 'Reproductores'}
            </span>
            <button
              onClick={addPlayer}
              disabled={playerCount >= 4}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {Array.from({ length: playerCount }).map((_, index) => (
            <AudioPlayer key={index} playerId={index + 1} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b">
            <h2 className="text-xl font-semibold">Sonidos</h2>
            <button
              onClick={() => setIsConfiguring(!isConfiguring)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Settings size={24} />
            </button>
          </div>
          
          {isConfiguring ? (
            <SoundPadConfig
              buttonCount={buttonCount}
              setButtonCount={setButtonCount}
              onClose={() => setIsConfiguring(false)}
            />
          ) : (
            <SoundPad buttonCount={buttonCount} />
          )}
        </div>
      </div>
    </div>
    
  )
}

export default App

interface SoundPadConfigProps {
  buttonCount: number;
  setButtonCount: (count: number) => void;
  onClose: () => void;
}

export function SoundPadConfig({ buttonCount, setButtonCount, onClose }: SoundPadConfigProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <label htmlFor="buttonCount" className="block text-sm font-medium text-gray-700">          
          Numero de botones de sonido
        </label>
        <input
          type="number"
          id="buttonCount"
          min="1"
          max="24"
          value={buttonCount}
          onChange={(e) => setButtonCount(Math.min(24, Math.max(1, parseInt(e.target.value) || 1)))}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-sm text-gray-500">
          Escoge entre 1 y 24 botones
        </p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >Guardar cambios
        </button>
      </div>
    </div>
  );
}
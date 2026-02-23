import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { getDevFlags, setDevFlag } from '../state/store';

export function DevPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const flags = getDevFlags();

  const toggleFlag = (flag: 'offline' | 'redeemFail' | 'videoFail') => {
    setDevFlag(flag, !flags[flag]);
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-900">Dev Panel</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">Offline</span>
              <input
                type="checkbox"
                checked={flags.offline}
                onChange={() => toggleFlag('offline')}
                className="w-10 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-blue-600 before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-1 before:left-1 before:transition-transform checked:before:translate-x-4"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">Redeem Fail</span>
              <input
                type="checkbox"
                checked={flags.redeemFail}
                onChange={() => toggleFlag('redeemFail')}
                className="w-10 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-blue-600 before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-1 before:left-1 before:transition-transform checked:before:translate-x-4"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">Video Fail</span>
              <input
                type="checkbox"
                checked={flags.videoFail}
                onChange={() => toggleFlag('videoFail')}
                className="w-10 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-blue-600 before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-1 before:left-1 before:transition-transform checked:before:translate-x-4"
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import ccsLogo from '../../assets/CCS.png';
import { Wifi, WifiOff } from 'lucide-react';

export const HomeHeader: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#c5d8c3]/80 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2.5">
          <img
            src={ccsLogo}
            alt="CCS Logo"
            className="w-10 h-10 object-contain drop-shadow-xs"
          />
          <div>
            <h1 className="text-sm font-bold text-[#1f381f] leading-tight font-display">
              College of Computing Studies
            </h1>
            <p className="text-[11px] font-semibold text-[#3d6e35]">
              Venom Hub • Palaro 2026
            </p>
          </div>
        </div>

        {/* Real-time Online / Offline Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-colors ${
            isOnline
              ? 'bg-[#edf5ec] border border-[#5d8c55]/40 text-[#254625]'
              : 'bg-stone-100 border border-stone-300 text-stone-600'
          }`}
          title={isOnline ? 'Connected to live server' : 'Running in offline cached mode'}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3 text-[#355935] animate-pulse" />
              <span>ONLINE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-stone-500" />
              <span>OFFLINE</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import ccsLogo from '../../assets/CCS.png';
import { Wifi, WifiOff, Home, ShieldAlert, QrCode } from 'lucide-react';

interface HomeHeaderProps {
  activeTab?: 'home' | 'backup' | 'qr';
  onTabChange?: (tab: 'home' | 'backup' | 'qr') => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  activeTab = 'home',
  onTabChange,
}) => {
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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#c5d8c3]/80 px-4 sm:px-8 py-3 shadow-xs">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* LEFT: Logo & College Department Information */}
        <div className="flex items-center gap-3 min-w-0 md:w-1/3">
          <img
            src={ccsLogo}
            alt="CCS Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-xs shrink-0"
          />
          <div className="truncate">
            <h1 className="text-sm sm:text-base font-bold text-[#1f381f] leading-tight font-display truncate">
              College of Computing Studies
            </h1>
            <p className="text-[11px] sm:text-xs font-semibold text-[#3d6e35]">
              Palaro 2026 Attendance Tracker
            </p>
          </div>
        </div>

        {/* MIDDLE: Clean Navbar Buttons (No outer background) */}
        <nav className="hidden md:flex items-center justify-center gap-2 lg:gap-4">
          <button
            type="button"
            onClick={() => onTabChange?.('home')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#1f381f] font-bold border-b-2 border-[#355935] rounded-b-none'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-[#edf5ec]/60'
            }`}
          >
            <Home className="w-4 h-4 text-[#355935]" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onTabChange?.('backup');
              alert('Backup request dispatched to CCS marshals.');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'text-[#1f381f] font-bold border-b-2 border-[#355935] rounded-b-none'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-[#edf5ec]/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Request Backup</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onTabChange?.('qr');
              alert('Attendance QR Scanner opened.');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'text-[#1f381f] font-bold border-b-2 border-[#355935] rounded-b-none'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-[#edf5ec]/60'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#355935]" />
            <span>QR Code</span>
          </button>
        </nav>

        {/* RIGHT: Live Online / Offline Status Badge */}
        <div className="flex items-center justify-end md:w-1/3 shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors ${
              isOnline
                ? 'bg-[#edf5ec] border border-[#5d8c55]/40 text-[#254625]'
                : 'bg-stone-100 border border-stone-300 text-stone-600'
            }`}
            title={isOnline ? 'Connected to live server' : 'Running in offline cached mode'}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-[#355935] animate-pulse" />
                <span>ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-stone-500" />
                <span>OFFLINE</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

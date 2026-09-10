import React, { useState, useEffect } from 'react';
import ccsLogo from '../../assets/CCS.png';
import { Wifi, WifiOff, Home, ShieldAlert, QrCode } from 'lucide-react';

interface HomeHeaderProps {
  activeTab?: 'home' | 'backup' | 'qr' | 'attendance';
  onTabChange?: (tab: 'home' | 'backup' | 'qr' | 'attendance') => void;
  userRole?: 'student' | 'adviser';
  onRoleChange?: (role: 'student' | 'adviser') => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  activeTab = 'home',
  onTabChange,
  userRole = 'student',
  onRoleChange,
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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#c5d8c3]/80 px-3 sm:px-8 py-2.5 sm:py-3 shadow-xs">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* LEFT: Logo & College Department Information */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-initial md:w-1/3">
          <img
            src={ccsLogo}
            alt="CCS Logo"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-xs shrink-0"
          />
          <div className="truncate min-w-0">
            <h1 className="text-xs sm:text-base font-bold text-[#1f381f] leading-tight font-display truncate">
              College of Computing Studies
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold text-[#3d6e35] truncate">
              {userRole === 'adviser' ? 'Palaro 2026 • Adviser Portal' : 'Palaro 2026 Attendance Tracker'}
            </p>
          </div>
        </div>

        {/* MIDDLE: Clean Navbar Buttons (No outer background) */}
        <nav className="hidden md:flex items-center justify-center gap-1.5 lg:gap-2 xl:gap-3 min-w-0 flex-shrink-0 whitespace-nowrap">
          <button
            type="button"
            onClick={() => onTabChange?.('home')}
            className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-[11px] lg:text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'home'
                ? 'text-[#1f381f] font-bold border-b-2 border-[#355935] rounded-b-none'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-[#edf5ec]/60'
              }`}
          >
            <Home className="w-4 h-4 text-[#355935]" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange?.('backup')}
            className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-[11px] lg:text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'backup'
                ? 'text-[#1f381f] font-bold border-b-2 border-[#355935] rounded-b-none'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-[#edf5ec]/60'
              }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Request Backup</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange?.('attendance')}
            className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-[11px] lg:text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'qr' || activeTab === 'attendance'
                ? 'text-[#1f381f] font-bold border-b-2 border-[#355935] rounded-b-none'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-[#edf5ec]/60'
              }`}
          >
            <QrCode className="w-4 h-4 text-[#355935]" />
            <span>{userRole === 'adviser' ? 'Student Verification' : 'Attendance'}</span>
          </button>
        </nav>

        {/* RIGHT: Role Switcher & Online Status */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          {onRoleChange && (
            <div className="inline-flex items-center bg-[#edf5ec] border border-[#c5d8c3] rounded-full p-0.5 text-[9px] sm:text-[10px] font-mono font-bold">
              <button
                type="button"
                onClick={() => onRoleChange('student')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                  userRole === 'student'
                    ? 'bg-[#1f381f] text-white shadow-2xs'
                    : 'text-stone-500 hover:text-[#1f381f]'
                }`}
              >
                STUDENT
              </button>
              <button
                type="button"
                onClick={() => onRoleChange('adviser')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  userRole === 'adviser'
                    ? 'bg-[#355935] text-white shadow-2xs'
                    : 'text-stone-500 hover:text-[#1f381f]'
                }`}
              >
                <span>ADVISER</span>
                {userRole === 'adviser' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            </div>
          )}

          <div
            className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10.5px] sm:text-xs font-mono font-semibold transition-colors ${isOnline
                ? 'bg-[#edf5ec] border border-[#5d8c55]/40 text-[#254625]'
                : 'bg-stone-100 border border-stone-300 text-stone-600'
              }`}
            title={isOnline ? 'Connected to live server' : 'Running in offline cached mode'}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-[#355935] animate-pulse" />
                <span className="hidden sm:inline">ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">OFFLINE</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

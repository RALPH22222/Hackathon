import React from 'react';
import { Home, ShieldAlert, QrCode, Trophy } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'home' | 'backup' | 'qr' | 'attendance' | 'events';
  onTabChange?: (tab: 'home' | 'backup' | 'qr' | 'attendance' | 'events') => void;
  userRole?: 'student' | 'adviser' | 'facilitator';
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'home',
  onTabChange,
  userRole = 'student',
}) => {
  // Map tabs to 0, 1, 2 index for sliding calculation (qr, attendance, events map to 2)
  const activeIndex = activeTab === 'home' ? 0 : activeTab === 'backup' ? 1 : 2;
  const isTab3Active = activeTab === 'qr' || activeTab === 'attendance' || activeTab === 'events';

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-4 left-3 right-3 z-40 max-w-md mx-auto sm:hidden"
    >
      {/* Floating Glassmorphic Dock Container (Strict 1-line layout) */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-1 shadow-[0_12px_36px_-6px_rgba(31,56,31,0.22),0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-stone-900/5">
        
        {/* Subtle Ambient Top Glow Line */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#5d8c55]/40 to-transparent" />

        {/* Grid Container for 3 Equal Single-Line Columns */}
        <div className="relative grid grid-cols-3 gap-1 p-0.5 items-center">
          
          {/* Smooth Sliding Active Background Pill (Green) */}
          <div
            className="absolute top-0.5 bottom-0.5 rounded-xl bg-gradient-to-r from-[#1f381f] to-[#355935] shadow-md shadow-[#355935]/25 border border-[#4d7a4d]/40 transition-all duration-300 ease-out pointer-events-none z-0"
            style={{
              width: 'calc((100% - 0.5rem) / 3)',
              transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 0.25}rem))`,
            }}
          />

          {/* 1. HOME TAB */}
          <button
            type="button"
            onClick={() => onTabChange?.('home')}
            className="relative z-10 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-300 cursor-pointer group select-none min-w-0"
          >
            <div className="flex flex-col items-center gap-0.5 w-full min-w-0">
              <div
                className={`p-1 rounded-lg transition-all duration-300 group-active:scale-90 ${
                  activeTab === 'home'
                    ? 'text-white scale-105'
                    : 'text-stone-400 group-hover:text-stone-700'
                }`}
              >
                <Home className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] tracking-tight transition-colors duration-300 whitespace-nowrap truncate max-w-full ${
                  activeTab === 'home' ? 'text-white font-bold' : 'text-stone-500 font-medium'
                }`}
              >
                Home
              </span>
            </div>
          </button>

          {/* 2. REQUEST BACKUP TAB */}
          <button
            type="button"
            onClick={() => onTabChange?.('backup')}
            className="relative z-10 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-300 cursor-pointer group select-none min-w-0"
          >
            <div className="flex flex-col items-center gap-0.5 w-full min-w-0">
              <div className="relative">
                <div
                  className={`p-1 rounded-lg transition-all duration-300 group-active:scale-90 ${
                    activeTab === 'backup'
                      ? 'text-white scale-105'
                      : 'text-stone-400 group-hover:text-amber-600'
                  }`}
                >
                  <ShieldAlert
                    className={`w-4 h-4 transition-colors duration-300 group-hover:scale-110 ${
                      activeTab === 'backup' ? 'text-white' : 'text-amber-600'
                    }`}
                  />
                </div>
                {/* Live pulse indicator dot */}
                <span className="absolute top-0.5 right-0 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                </span>
              </div>

              <span
                className={`text-[10px] sm:text-[11px] tracking-tight transition-colors duration-300 whitespace-nowrap truncate max-w-full ${
                  activeTab === 'backup' ? 'text-white font-bold' : 'text-stone-500 font-medium'
                }`}
              >
                Request Backup
              </span>
            </div>
          </button>

          {/* 3. ATTENDANCE / EVENTS TAB */}
          <button
            type="button"
            onClick={() => onTabChange?.(userRole === 'facilitator' ? 'events' : 'attendance')}
            className="relative z-10 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-300 cursor-pointer group select-none min-w-0"
          >
            <div className="flex flex-col items-center gap-0.5 w-full min-w-0">
              <div
                className={`p-1 rounded-lg transition-all duration-300 group-active:scale-90 ${
                  isTab3Active
                    ? 'text-white scale-105'
                    : 'text-[#355935] group-hover:text-[#214321]'
                }`}
              >
                {userRole === 'facilitator' ? (
                  <Trophy className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <QrCode className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
              <span
                className={`text-[10px] sm:text-[11px] tracking-tight transition-colors duration-300 whitespace-nowrap truncate max-w-full ${
                  isTab3Active ? 'text-white font-bold' : 'text-stone-500 font-medium'
                }`}
              >
                {userRole === 'adviser' ? 'Verification' : userRole === 'facilitator' ? 'Events' : 'Attendance'}
              </span>
            </div>
          </button>

        </div>
      </div>
    </nav>
  );
};

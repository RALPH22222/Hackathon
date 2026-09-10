import React from 'react';
import { Home, ShieldAlert, QrCode } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'home' | 'backup' | 'qr' | 'attendance';
  onTabChange?: (tab: 'home' | 'backup' | 'qr' | 'attendance') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'home',
  onTabChange,
}) => {
  // Map tabs to 0, 1, 2 index for sliding calculation (qr and attendance map to 2)
  const activeIndex = activeTab === 'home' ? 0 : activeTab === 'backup' ? 1 : 2;

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-4 left-3 right-3 z-40 max-w-md mx-auto sm:hidden"
    >
      {/* Floating Glassmorphic Dock Container */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl p-1.5 shadow-[0_12px_36px_-6px_rgba(31,56,31,0.22),0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-stone-900/5">

        {/* Subtle Ambient Top Glow Line */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#5d8c55]/40 to-transparent" />

        {/* Grid Container for 3 Equal Columns */}
        <div className="relative grid grid-cols-3 gap-1.5 p-1">

          {/* Smooth Sliding Active Background Pill (Green) */}
          <div
            className="absolute top-1 bottom-1 rounded-2xl bg-gradient-to-r from-[#1f381f] to-[#355935] shadow-md shadow-[#355935]/30 border border-[#4d7a4d]/40 transition-all duration-300 ease-out pointer-events-none z-0"
            style={{
              width: 'calc((100% - 0.75rem) / 3)',
              transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 0.375}rem))`,
            }}
          />

          {/* 1. HOME TAB */}
          <button
            type="button"
            onClick={() => onTabChange?.('home')}
            className="relative z-10 flex flex-col items-center justify-center py-2 px-2 rounded-2xl transition-all duration-300 cursor-pointer group select-none"
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 group-active:scale-90 ${activeTab === 'home'
                  ? 'text-white scale-105'
                  : 'text-stone-400 group-hover:text-stone-700'
                  }`}
              >
                <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span
                className={`text-[11px] tracking-tight font-semibold transition-colors duration-300 ${activeTab === 'home' ? 'text-white font-bold' : 'text-stone-500'
                  }`}
              >
                Home
              </span>
            </div>

            {/* Bottom active dot indicator */}
            <span
              className={`absolute bottom-1 w-1 h-1 bg-white rounded-full transition-all duration-300 ${activeTab === 'home' ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
                }`}
            />
          </button>

          {/* 2. REQUEST BACKUP TAB */}
          <button
            type="button"
            onClick={() => {
              onTabChange?.('backup');
              alert('Backup request dispatched to CCS marshals.');
            }}
            className="relative z-10 flex flex-col items-center justify-center py-2 px-2 rounded-2xl transition-all duration-300 cursor-pointer group select-none"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <div
                  className={`p-1.5 rounded-xl transition-all duration-300 group-active:scale-90 ${activeTab === 'backup'
                    ? 'text-white scale-105'
                    : 'text-stone-400 group-hover:text-amber-600'
                    }`}
                >
                  <ShieldAlert
                    className={`w-5 h-5 transition-colors duration-300 group-hover:scale-110 ${activeTab === 'backup' ? 'text-white' : 'text-amber-600'
                      }`}
                  />
                </div>
                {/* Live pulse indicator dot */}
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              </div>

              <span
                className={`text-[11px] tracking-tight font-semibold transition-colors duration-300 ${activeTab === 'backup' ? 'text-white font-bold' : 'text-stone-500'
                  }`}
              >
                Request Backup
              </span>
            </div>

            {/* Bottom active dot indicator */}
            <span
              className={`absolute bottom-1 w-1 h-1 bg-white rounded-full transition-all duration-300 ${activeTab === 'backup' ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
                }`}
            />
          </button>

          {/* 3. ATTENDANCE TAB */}
          <button
            type="button"
            onClick={() => onTabChange?.('attendance')}
            className="relative z-10 flex flex-col items-center justify-center py-2 px-2 rounded-2xl transition-all duration-300 cursor-pointer group select-none"
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 group-active:scale-90 ${
                  activeTab === 'qr' || activeTab === 'attendance'
                    ? 'text-white scale-105'
                    : 'text-[#355935] group-hover:text-[#214321]'
                }`}
                className={`p-1.5 rounded-xl transition-all duration-300 group-active:scale-90 ${activeTab === 'qr'
                  ? 'text-white scale-105'
                  : 'text-[#355935] group-hover:text-[#214321]'
                  }`}
              >
                <QrCode className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span
                className={`text-[11px] tracking-tight font-semibold transition-colors duration-300 ${
                  activeTab === 'qr' || activeTab === 'attendance' ? 'text-white font-bold' : 'text-stone-500'
                }`}
                className={`text-[11px] tracking-tight font-semibold transition-colors duration-300 ${activeTab === 'qr' ? 'text-white font-bold' : 'text-stone-500'
                  }`}
              >
                Attendance
              </span>
            </div>

            {/* Bottom active dot indicator */}
            <span
              className={`absolute bottom-1 w-1 h-1 bg-white rounded-full transition-all duration-300 ${activeTab === 'qr' ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
                }`}
            />
          </button>

        </div>
      </div>
    </nav>
  );
};





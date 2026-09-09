import React from 'react';
import { Home, ShieldAlert, QrCode } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'home' | 'backup' | 'qr';
  onTabChange?: (tab: 'home' | 'backup' | 'qr') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'home',
  onTabChange,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#c5d8c3] px-4 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home */}
        <button
          type="button"
          onClick={() => onTabChange?.('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#214321] font-bold'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <div
            className={`p-1.5 rounded-lg ${
              activeTab === 'home' ? 'bg-[#edf5ec] text-[#214321]' : ''
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Request Backup */}
        <button
          type="button"
          onClick={() => {
            onTabChange?.('backup');
            alert('Backup request dispatched to CCS marshals.');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'backup'
              ? 'text-[#214321] font-bold'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <div
            className={`p-1.5 rounded-lg ${
              activeTab === 'backup' ? 'bg-[#edf5ec] text-[#214321]' : ''
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-[10px] tracking-tight">Request Backup</span>
        </button>

        {/* QR Code */}
        <button
          type="button"
          onClick={() => {
            onTabChange?.('qr');
            alert('Attendance QR Scanner opened.');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'qr'
              ? 'text-[#214321] font-bold'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <div
            className={`p-1.5 rounded-lg ${
              activeTab === 'qr' ? 'bg-[#edf5ec] text-[#214321]' : ''
            }`}
          >
            <QrCode className="w-5 h-5 text-[#355935]" />
          </div>
          <span className="text-[10px] tracking-tight">QR Code</span>
        </button>
      </div>
    </nav>
  );
};

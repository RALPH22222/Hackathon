import React from 'react';
import { QrCode, Camera } from 'lucide-react';

interface AttendanceTabSelectorProps {
  activeTab: 'qr' | 'photo';
  onTabChange: (tab: 'qr' | 'photo') => void;
}

export const AttendanceTabSelector: React.FC<AttendanceTabSelectorProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="minimal-card p-1.5 rounded-2xl bg-white border border-[#c5d8c3]/60 shadow-xs">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onTabChange('qr')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'qr'
              ? 'bg-gradient-to-r from-[#1f381f] to-[#355935] text-white shadow-sm'
              : 'text-stone-600 hover:text-[#1f381f] hover:bg-stone-100/60'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Scan Event QR</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('photo')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'photo'
              ? 'bg-gradient-to-r from-[#1f381f] to-[#355935] text-white shadow-sm'
              : 'text-stone-600 hover:text-[#1f381f] hover:bg-stone-100/60'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Upload Photo Proof</span>
        </button>
      </div>
    </div>
  );
};

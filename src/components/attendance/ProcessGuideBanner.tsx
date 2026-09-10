import React from 'react';
import { CalendarCheck, Camera, ShieldCheck } from 'lucide-react';

export const ProcessGuideBanner: React.FC = () => {
  return (
    <div className="minimal-card rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-white via-[#f7faf6] to-[#edf5ec] border border-[#c5d8c3]/80 space-y-3 shadow-xs">
      <div className="flex items-center justify-between gap-2 flex-nowrap">
        <h3 className="text-xs sm:text-sm font-bold text-[#1f381f] font-display flex items-center gap-1.5 uppercase tracking-wide truncate">
          <ShieldCheck className="w-4 h-4 text-[#355935] shrink-0" />
          <span>How Attendance Verification Works</span>
        </h3>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#edf5ec] text-[#254625] border border-[#c5d8c3] font-bold whitespace-nowrap shrink-0">
          3-Step Verification
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Step 1 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#c5d8c3]/60 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#edf5ec] text-[#355935] flex items-center justify-center font-bold text-xs shrink-0 border border-[#c5d8c3]">
            1
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f381f] flex items-center gap-1 truncate">
              <CalendarCheck className="w-3.5 h-3.5 text-[#355935]" />
              <span>Select Event</span>
            </h4>
            <p className="text-[10px] text-stone-500 truncate">Choose live or upcoming event</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#c5d8c3]/60 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#edf5ec] text-[#355935] flex items-center justify-center font-bold text-xs shrink-0 border border-[#c5d8c3]">
            2
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f381f] flex items-center gap-1 truncate">
              <Camera className="w-3.5 h-3.5 text-[#355935]" />
              <span>Snap Photo / Scan</span>
            </h4>
            <p className="text-[10px] text-stone-500 truncate">Camera photo or Event QR Code</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#c5d8c3]/60 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#edf5ec] text-[#355935] flex items-center justify-center font-bold text-xs shrink-0 border border-[#c5d8c3]">
            3
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f381f] flex items-center gap-1 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auto-Watermarked</span>
            </h4>
            <p className="text-[10px] text-stone-500 truncate">Saved locally with timestamp & GPS</p>
          </div>
        </div>
      </div>
    </div>
  );
};




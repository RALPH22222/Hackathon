import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AttendanceHeaderProps {
  totalCheckIns: number;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  totalCheckIns,
}) => {
  return (
    <div className="minimal-card rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#f7faf6] to-[#edf5ec] border border-[#c5d8c3]/80 relative overflow-hidden shadow-xs space-y-4">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-[#355935]/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1f381f] text-emerald-300 text-xs font-mono font-bold border border-[#5d8c55]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NodeShots Verification Engine • Palaro 2026</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f381f] font-display tracking-tight flex items-center gap-2">
            <span>NodeShots Hub</span>
            <span className="text-[#355935] text-sm font-bold font-mono">"Got proof? Send NodeShots."</span>
          </h2>
          <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
            Official WMSU College of Computing Studies attendance system. Verify Palaro crowd participation by capturing live watermarked venue photos or scanning event QR codes.
          </p>
        </div>

        {/* Total Verified Check-ins Badge */}
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#c5d8c3]/60 shadow-2xs shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1f381f] to-[#355935] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            {totalCheckIns}
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Verified Records</p>
            <p className="text-sm font-bold text-[#1f381f] flex items-center gap-1">
              <span>Palaro 2026 System</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


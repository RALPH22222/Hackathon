import React from 'react';
import { Clock, MapPin } from 'lucide-react';

interface ScheduleItem {
  id: string;
  sport: string;
  time: string;
  venue: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
}

const sectionSchedules: ScheduleItem[] = [
  {
    id: '1',
    sport: 'Basketball Men vs COE',
    time: '10:00 AM',
    venue: 'Gymnasium',
    status: 'In Progress',
  },
  {
    id: '2',
    sport: 'Volleyball Women vs CLA',
    time: '01:30 PM',
    venue: 'Court B',
    status: 'Upcoming',
  },
  {
    id: '3',
    sport: 'MLBB Esports vs CTE',
    time: '03:45 PM',
    venue: 'CCS Lab 3',
    status: 'Upcoming',
  },
  {
    id: '4',
    sport: 'Badminton Doubles vs CCJE',
    time: '05:00 PM',
    venue: 'Covered Court',
    status: 'Upcoming',
  },
];

export const SectionScheduleCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between min-h-[64px]">
        <div>
          <p className="text-[10px] font-mono text-[#5d8c55] font-semibold uppercase tracking-widest mb-0.5">
            Required Attendance
          </p>
          <h2 className="text-sm sm:text-base font-black text-[#142614] tracking-tight leading-none font-display">
            BSCS 4-B
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
          </span>
          <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">1 Live</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 sm:mx-5 h-px bg-[#e5efe4]" />

      {/* List */}
      <div className="flex-1 flex flex-col divide-y divide-[#eef5ed]">
        {sectionSchedules.map((item) => {
          const isLive = item.status === 'In Progress';
          return (
            <div
              key={item.id}
              className={`flex-1 flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-[#f8faf7] transition-colors ${
                isLive ? 'bg-amber-50/50' : ''
              }`}
            >
              {/* Left: status bar */}
              <div
                className={`w-1 self-stretch rounded-full shrink-0 ${
                  isLive ? 'bg-amber-500' : 'bg-[#c5d8c3]'
                }`}
              />

              {/* Middle: Name & venue */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[12px] sm:text-[13px] font-bold leading-snug truncate font-display ${
                    isLive ? 'text-amber-900' : 'text-[#1a2f1a]'
                  }`}
                >
                  {item.sport}
                </p>
                <span className="flex items-center gap-1 text-[10px] text-stone-400 font-mono mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-[#5d8c55] shrink-0" />
                  {item.venue}
                </span>
              </div>

              {/* Right: time + badge */}
              <div className="shrink-0 text-right font-mono">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border font-semibold text-[11px] sm:text-xs shadow-2xs ${
                    isLive ? 'border-amber-300' : 'border-[#c5d8c3]'
                  }`}
                >
                  <Clock
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isLive ? 'text-amber-600' : 'text-[#355935]'
                    }`}
                  />
                  <span className={isLive ? 'text-amber-950 font-bold' : 'text-[#1f381f]'}>
                    {item.time}
                  </span>
                  <span
                    className={`ml-0.5 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                      isLive
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#edf5ec] text-[#355935]'
                    }`}
                  >
                    {isLive ? 'LIVE' : 'SOON'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-2.5 border-t border-[#e5efe4] flex items-center justify-between min-h-[38px]">
        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
          {sectionSchedules.length} events today
        </span>
        <span className="text-[10px] font-mono text-[#5d8c55] font-semibold">PALARO 2026</span>
      </div>
    </div>
  );
};

import React from 'react';
import { Trophy } from 'lucide-react';
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon } from './MedalIcons';

interface CollegeTally {
  rank: number;
  code: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  isCCS?: boolean;
}

const collegeTallies: CollegeTally[] = [
  { rank: 1, code: 'CCS', name: 'College of Computing Studies', gold: 14, silver: 8, bronze: 6, total: 28, isCCS: true },
  { rank: 2, code: 'COE', name: 'College of Engineering', gold: 11, silver: 9, bronze: 5, total: 25 },
  { rank: 3, code: 'CLA', name: 'College of Liberal Arts', gold: 9, silver: 7, bronze: 8, total: 24 },
  { rank: 4, code: 'CTE', name: 'College of Teacher Education', gold: 7, silver: 10, bronze: 6, total: 23 },
  { rank: 5, code: 'CCJE', name: 'College of Criminal Justice Education', gold: 6, silver: 4, bronze: 7, total: 17 },
  { rank: 6, code: 'CSWCD', name: 'College of Social Work', gold: 4, silver: 5, bronze: 3, total: 12 },
];

export const MedalTallyCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#e2ece0]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#edf5ec] flex items-center justify-center border border-[#c5d8c3]">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#355935]" />
          </div>
          <div>
            <h2 className="text-xs sm:text-base font-bold text-[#1f381f] uppercase tracking-wide font-display">
              Palaro Medal Tally
            </h2>
            <p className="text-[11px] text-stone-500 font-mono">Official College Standings</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-600 font-mono">
          <span className="flex items-center gap-1"><GoldMedalIcon className="w-4 h-4" /> Gold</span>
          <span className="flex items-center gap-1"><SilverMedalIcon className="w-4 h-4" /> Silver</span>
          <span className="flex items-center gap-1"><BronzeMedalIcon className="w-4 h-4" /> Bronze</span>
        </div>
      </div>

      {/* College Leaderboard Rows */}
      <div className="space-y-2 overflow-y-auto max-h-[260px] sm:max-h-[320px] pr-1">
        {collegeTallies.map((item) => (
          <div
            key={item.code}
            className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all ${
              item.isCCS
                ? 'bg-gradient-to-r from-[#214321] to-[#355935] text-white shadow-sm ring-1 ring-[#5d8c55]/50'
                : 'bg-[#f9faf9] hover:bg-[#f1f5f0] text-slate-800 border border-[#e8efe6]'
            }`}
          >
            {/* Rank & College Code */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-[140px] sm:min-w-[220px]">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                  item.isCCS
                    ? 'bg-white text-[#214321]'
                    : item.rank <= 3
                    ? 'bg-[#edf5ec] text-[#355935]'
                    : 'text-stone-400'
                }`}
              >
                {item.rank}
              </span>

              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs sm:text-sm font-bold ${item.isCCS ? 'text-white' : 'text-[#1f381f]'}`}>
                    {item.code}
                  </span>
                  {item.isCCS && (
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono text-emerald-100 font-semibold">
                      VENOM
                    </span>
                  )}
                </div>
                <span className={`hidden sm:block text-[11px] truncate ${item.isCCS ? 'text-emerald-100/80' : 'text-stone-500'}`}>
                  {item.name}
                </span>
              </div>
            </div>

            {/* Medals Count & Total */}
            <div className="flex items-center gap-4 sm:gap-8 font-mono text-xs sm:text-sm font-semibold">
              <span className={`w-5 text-center ${item.isCCS ? 'text-amber-200' : 'text-amber-700'}`}>
                {item.gold}
              </span>
              <span className={`w-5 text-center ${item.isCCS ? 'text-slate-200' : 'text-slate-600'}`}>
                {item.silver}
              </span>
              <span className={`w-5 text-center ${item.isCCS ? 'text-orange-200' : 'text-amber-800'}`}>
                {item.bronze}
              </span>
              <span
                className={`w-8 text-right font-bold text-xs sm:text-sm ${
                  item.isCCS ? 'text-white font-mono' : 'text-[#1f381f]'
                }`}
              >
                {item.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

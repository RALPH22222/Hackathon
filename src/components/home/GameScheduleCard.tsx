import React, { useState } from 'react';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';

interface GameItem {
  id: string;
  sport: string;
  opponent: string;
  venue: string;
  timeOrScore: string;
  isWin?: boolean;
  credit?: string;
}

const upcomingGames: GameItem[] = [
  {
    id: '1',
    sport: 'Basketball',
    opponent: 'COE Titans',
    venue: 'WMSU Gym • Court A',
    timeOrScore: 'Today • 2:00 PM',
  },
  {
    id: '2',
    sport: 'Volleyball',
    opponent: 'CLA Phoenix',
    venue: 'Covered Court B',
    timeOrScore: 'Today • 4:30 PM',
  },
  {
    id: '3',
    sport: 'Football',
    opponent: 'CTE Scorpions',
    venue: 'Grandstand Field',
    timeOrScore: 'Tomorrow • 9:00 AM',
  },
  {
    id: '4',
    sport: 'Chess',
    opponent: 'CSWCD Knights',
    venue: 'Student Pavilion',
    timeOrScore: 'Tomorrow • 1:00 PM',
  },
];

const ccsResults: GameItem[] = [
  {
    id: '1',
    sport: 'Basketball',
    opponent: 'COE Titans',
    venue: 'WMSU Gym',
    timeOrScore: '84 – 72',
    isWin: true,
    credit: 'J. Abubakar',
  },
  {
    id: '2',
    sport: 'Sepak Takraw',
    opponent: 'CCJE Enforcers',
    venue: 'Covered Court',
    timeOrScore: '2 – 0',
    isWin: true,
    credit: 'A. Ramos',
  },
  {
    id: '3',
    sport: 'Table Tennis',
    opponent: 'CLA Phoenix',
    venue: 'Activity Center',
    timeOrScore: '1 – 3',
    isWin: false,
    credit: 'M. Reyes',
  },
  {
    id: '4',
    sport: 'MLBB Esports',
    opponent: 'CTE Scorpions',
    venue: 'CCS Lab 3',
    timeOrScore: '2 – 0',
    isWin: true,
    credit: 'P. Tan',
  },
];

export const GameScheduleCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const list = activeTab === 'upcoming' ? upcomingGames : ccsResults;

  const wins = ccsResults.filter(g => g.isWin).length;
  const total = ccsResults.length;

  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 min-h-[64px]">
        <div className="min-w-0">
          <p className="text-[10px] font-mono text-[#5d8c55] font-semibold uppercase tracking-widest mb-0.5">
            CCS Pythons
          </p>
          <h2 className="text-sm sm:text-base font-black text-[#142614] tracking-tight leading-none font-display truncate">
            {activeTab === 'upcoming' ? 'Upcoming Matchups' : 'Game Results'}
          </h2>
        </div>

        {/* Tab Switch */}
        <div className="flex items-center bg-[#f1f5f0] rounded-xl p-0.5 border border-[#dae8d7] shrink-0 text-[11px] font-mono font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-500 hover:text-[#355935]'
            }`}
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-500 hover:text-[#355935]'
            }`}
          >
            Results
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 sm:mx-5 h-px bg-[#e5efe4]" />

      {/* Content List */}
      <div className="flex-1 flex flex-col divide-y divide-[#eef5ed]">
        {list.map((item) => (
          <div
            key={item.id}
            className="flex-1 flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-[#f8faf7] transition-colors"
          >
            {/* Left: accent bar */}
            <div
              className={`w-1 self-stretch rounded-full shrink-0 ${
                activeTab === 'results'
                  ? item.isWin ? 'bg-emerald-500' : 'bg-rose-400'
                  : 'bg-[#5d8c55]'
              }`}
            />

            {/* Middle: sport + matchup */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] sm:text-[13px] font-bold text-[#1a2f1a] font-display truncate leading-snug">
                {item.sport}
              </p>
              <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">
                CCS <span className="text-stone-400">vs</span> {item.opponent}
              </p>
            </div>

            {/* Right: time/score */}
            <div className="shrink-0 text-right font-mono">
              {activeTab === 'upcoming' ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#c5d8c3] text-[#1f381f] font-semibold text-[11px] sm:text-xs shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-[#355935] shrink-0" />
                  <span>{item.timeOrScore}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#c5d8c3] font-semibold text-[11px] sm:text-xs shadow-2xs">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      item.isWin ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  />
                  <span className={item.isWin ? 'text-emerald-800' : 'text-rose-800'}>
                    {item.timeOrScore}
                  </span>
                  <span
                    className={`ml-0.5 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                      item.isWin
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {item.isWin ? 'WIN' : 'LOSS'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-2.5 border-t border-[#e5efe4] flex items-center justify-between min-h-[38px]">
        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
          {activeTab === 'upcoming'
            ? `${upcomingGames.length} scheduled`
            : `${wins}W – ${total - wins}L record`}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
      </div>
    </div>
  );
};

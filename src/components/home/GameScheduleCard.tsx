import React, { useState } from 'react';
import { Swords, Trophy, Clock, CheckCircle2 } from 'lucide-react';

interface GameItem {
  id: string;
  sport: string;
  matchup: string;
  timeOrScore: string;
  isWin?: boolean;
}

const upcomingGames: GameItem[] = [
  { id: '1', sport: 'Basketball (M)', matchup: 'CCS vs COE', timeOrScore: 'Today • 2:00 PM' },
  { id: '2', sport: 'Volleyball (W)', matchup: 'CCS vs CLA', timeOrScore: 'Today • 4:30 PM' },
  { id: '3', sport: 'Football', matchup: 'CCS vs CTE', timeOrScore: 'Tomorrow • 9:00 AM' },
  { id: '4', sport: 'Chess (M/W)', matchup: 'CCS vs CSWCD', timeOrScore: 'Tomorrow • 1:00 PM' },
];

const venomResults: GameItem[] = [
  { id: '1', sport: 'Basketball (M)', matchup: 'CCS vs CAIS', timeOrScore: '84 - 72 (Won)', isWin: true },
  { id: '2', sport: 'Sepak Takraw', matchup: 'CCS vs CCJE', timeOrScore: '2 - 0 (Won)', isWin: true },
  { id: '3', sport: 'Table Tennis', matchup: 'CCS vs CN', timeOrScore: '1 - 3 (Lost)', isWin: false },
  { id: '4', sport: 'MLBB Esports', matchup: 'CCS vs CBA', timeOrScore: '2 - 0 (Won)', isWin: true },
];

export const GameScheduleCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');

  const list = activeTab === 'upcoming' ? upcomingGames : venomResults;

  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] p-3.5 shadow-xs flex flex-col h-full">
      {/* Toggle Controls */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#e2ece0]">
        <div className="flex items-center gap-1.5">
          {activeTab === 'upcoming' ? (
            <Swords className="w-4 h-4 text-[#355935]" />
          ) : (
            <Trophy className="w-4 h-4 text-[#355935]" />
          )}
          <span className="text-xs font-bold text-[#1f381f] uppercase tracking-wide">
            Venom Games
          </span>
        </div>

        {/* Tab switch */}
        <div className="flex bg-[#edf5ec] p-0.5 rounded-lg border border-[#c5d8c3]/60 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-[#355935] hover:text-[#1f381f]'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('results')}
            className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-[#355935] hover:text-[#1f381f]'
            }`}
          >
            Results
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-2 overflow-y-auto max-h-[190px] pr-0.5">
        {list.map((item) => (
          <div
            key={item.id}
            className="p-2 rounded-xl bg-[#f8faf8] border border-[#e2ece0] text-xs space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1f381f] text-[11px] truncate">{item.sport}</span>
              {activeTab === 'results' && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    item.isWin ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.isWin ? 'WIN' : 'LOST'}
                </span>
              )}
            </div>

            <p className="font-semibold text-stone-700 text-[11px]">{item.matchup}</p>

            <div className="flex items-center gap-1 text-[10px] text-stone-500 font-mono">
              {activeTab === 'upcoming' ? (
                <>
                  <Clock className="w-3 h-3 text-[#5d8c55]" />
                  <span>{item.timeOrScore}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-[#5d8c55]" />
                  <span>Final: {item.timeOrScore}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

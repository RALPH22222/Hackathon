import React, { useState } from 'react';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight, X, MapPin, Users, UserRound, ShieldCheck, Award } from 'lucide-react';
import { MatchupTeams, SportIcon, SportName } from './MatchupVisuals';

interface GameItem {
 id: string;
 sport: string;
 opponent: string;
 venue: string;
 timeOrScore: string;
 players?: string[];
 facilitator?: string;
 facilitatorProgram?: 'BSIT' | 'BSCS' | 'ACT';
 coach?: string;
 startTime?: string;
 endTime?: string;
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
  players: ['Ramos Alyssa', 'Abubakar Jamal', 'Santos Michael', 'Tan Paolo', 'Garcia Luis'],
  facilitator: 'Santos Michael',
  facilitatorProgram: 'BSCS',
  coach: 'Villanueva Rafael',
  startTime: '2:00 PM',
  endTime: '3:30 PM',
 },
 {
  id: '2',
  sport: 'Volleyball',
  opponent: 'CLA Phoenix',
  venue: 'Covered Court B',
  timeOrScore: 'Today • 4:30 PM',
  players: ['Flores Nina', 'Dela Cruz Carla', 'Malik Sara', 'Navarro Kara', 'Lim Daniel'],
  facilitator: 'Ramos Alyssa',
  facilitatorProgram: 'BSIT',
  coach: 'Bautista Elena',
  startTime: '4:30 PM',
  endTime: '6:00 PM',
 },
 {
  id: '3',
  sport: 'Football',
  opponent: 'CTE Scorpions',
  venue: 'Grandstand Field',
  timeOrScore: 'Tomorrow • 9:00 AM',
  players: ['Tan Paolo', 'Garcia Rosa', 'Ahmed Tariq', 'Cruz Juan', 'Flores Bea'],
  facilitator: 'Abubakar Jamal',
  facilitatorProgram: 'ACT',
  coach: 'Santiago Marco',
  startTime: '9:00 AM',
  endTime: '11:00 AM',
 },
 {
  id: '4',
  sport: 'Chess',
  opponent: 'CSWCD Knights',
  venue: 'Student Pavilion',
  timeOrScore: 'Tomorrow • 1:00 PM',
  players: ['Tan Liam', 'Reyes Miguel', 'Karim Amir', 'Santos Fiona'],
  facilitator: 'Garcia Luis',
  facilitatorProgram: 'BSCS',
  coach: 'Navarro Carlos',
  startTime: '1:00 PM',
  endTime: '3:00 PM',
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
  credit: 'Jamal Abubakar',
 },
 {
  id: '2',
  sport: 'Sepak Takraw',
  opponent: 'CCJE Enforcers',
  venue: 'Covered Court',
  timeOrScore: '2 – 0',
  isWin: true,
  credit: 'Alyssa Ramos',
 },
 {
  id: '3',
  sport: 'MLBB Esports',
  opponent: 'CLA Phoenix',
  venue: 'Activity Center',
  timeOrScore: '1 – 3',
  isWin: false,
  credit: 'Miguel Reyes',
 },
 {
  id: '4',
  sport: 'MLBB Esports',
  opponent: 'CTE Scorpions',
  venue: 'CCS Lab 3',
  timeOrScore: '2 – 0',
  isWin: true,
  credit: 'Paolo Tan',
 },
];

export const GameScheduleCard: React.FC = () => {
 const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
 const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
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
      Upcoming
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
   <div className="flex-1 flex flex-col gap-1.5">
    {list.map((item) => (
     <div
      key={item.id}
      onClick={() => setSelectedGame(item)}
      onKeyDown={(event) => {
       if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setSelectedGame(item);
       }
      }}
      role="button"
      tabIndex={0}
      className="group flex-1 flex items-center gap-2 sm:gap-3 mx-2 sm:mx-3 my-1.5 px-3 sm:px-5 py-3 rounded-xl bg-[#f8faf8] hover:bg-[#edf5ec] active:bg-[#dff0de] transition-colors cursor-pointer"
     >
      {/* Left: accent bar */}
      <div
       className={`w-1 self-stretch rounded-full shrink-0 ${
        activeTab === 'results'
         ? item.isWin ? 'bg-emerald-500' : 'bg-rose-400'
         : 'bg-[#5d8c55]'
       }`}
      />

      {/* Sport icon */}
      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5ec] text-[#355935]">
       <SportIcon sport={item.sport} className="h-5 w-5" />
      </div>

      {/* Middle: sport + matchup */}
      <div className="flex-1 min-w-0">
       <p className="text-[12px] sm:text-[13px] font-bold text-[#1a2f1a] font-display truncate leading-snug">
        <SportName sport={item.sport} />
       </p>
       <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">
        <MatchupTeams opponent={item.opponent} />
       </p>
      </div>

      {/* Right: time/score + chevron */}
      <div className="shrink-0 flex items-center gap-1.5 font-mono">
       <div className="flex flex-col items-end gap-1 text-right">
        {activeTab === 'upcoming' ? (
         <div className="inline-flex items-center gap-1 px-2 py-1 sm:gap-1.5 sm:px-2.5 rounded-lg bg-white border border-[#c5d8c3] text-[#1f381f] font-semibold text-[10px] sm:text-xs shadow-2xs whitespace-nowrap">
          <Clock className="w-3.5 h-3.5 text-[#355935] shrink-0" />
          <span>{item.timeOrScore}</span>
         </div>
        ) : (
         <div className="inline-flex items-center gap-1 px-2 py-1 sm:gap-1.5 sm:px-2.5 rounded-lg bg-white border border-[#c5d8c3] font-semibold text-[10px] sm:text-xs shadow-2xs whitespace-nowrap">
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
        {activeTab === 'results' && item.credit && (
         <p className="inline-flex self-end translate-y-1 items-center gap-1 rounded-md border border-[#b8d1b3] bg-[#e5f0e3] px-1.5 py-0.5 text-[8.6px] text-[#355935] whitespace-nowrap">
          <Award className="h-3 w-3 shrink-0" />
          Credits: {item.credit}
         </p>
        )}
       </div>
       <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#355935] transition-colors shrink-0" />
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
    {activeTab === 'upcoming' ? (
     <ChevronRight className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
    ) : (
     <ChevronLeft className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
    )}
   </div>

   {selectedGame && (
    <div
     className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/75"
     role="presentation"
     onClick={() => setSelectedGame(null)}
    >
     <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-info-title"
      className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden font-sans max-h-[88vh] flex flex-col"
      onClick={(event) => event.stopPropagation()}
     >
      {/* Header */}
      <div className="bg-[#142614] text-white p-3.5 sm:p-4 border-b border-[#355935] flex items-center justify-between shrink-0">
       <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
         <SportIcon sport={selectedGame.sport} className="h-5 w-5" />
        </div>
        <div className="min-w-0">
         <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22c55e]">
          <span>{activeTab === 'upcoming' ? 'SYS.MATCH // GAME DISPATCH' : 'SYS.RECORD // FINAL RESULT'}</span>
          {activeTab === 'results' && (
           <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase border ${
            selectedGame.isWin
             ? 'bg-emerald-900/50 text-emerald-300 border-emerald-600'
             : 'bg-rose-900/30 text-rose-300 border-rose-700'
           }`}>
            {selectedGame.isWin ? 'Victory' : 'Defeat'}
           </span>
          )}
         </div>
         <h3 id="game-info-title" className="text-sm sm:text-base font-bold font-display uppercase tracking-wide mt-0.5 text-white truncate">
          <SportName sport={selectedGame.sport} />
         </h3>
         <p className="text-[11px] font-mono text-white/60 mt-0.5">
          <MatchupTeams opponent={selectedGame.opponent} />
         </p>
        </div>
       </div>
       <button
        type="button"
        onClick={() => setSelectedGame(null)}
        aria-label="Close game information"
        className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer shrink-0"
       >
        <X className="w-5 h-5" />
       </button>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
       {/* Match Details Pill */}
       <div className="bg-[#f6f9f5] border border-[#d6e5d5] rounded-xl p-2.5 sm:p-3 text-xs font-mono">
        <div className="text-stone-700 flex items-center gap-1.5">
         <MapPin className="w-3.5 h-3.5 text-[#5d8c55] shrink-0" />
         <span className="truncate">{selectedGame.venue}</span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 flex items-center gap-1.5">
         {activeTab === 'upcoming' ? (
          <Clock className="w-3.5 h-3.5 text-[#5d8c55] shrink-0" />
         ) : (
          <CheckCircle2 className={`w-3.5 h-3.5 ${selectedGame.isWin ? 'text-emerald-600' : 'text-rose-600'}`} />
         )}
         <span>{activeTab === 'upcoming' ? `Schedule: ${selectedGame.timeOrScore}` : `Score: ${selectedGame.timeOrScore}`}</span>
        </div>
       </div>

       {activeTab === 'upcoming' ? (
        <>
         {/* Facilitator & Coach Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-mono">
          <div className="rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-2.5 sm:p-3 space-y-1">
           <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-stone-500">
            <Clock className="w-3.5 h-3.5 text-[#355935] shrink-0" />
            <span>MATCH TIMING</span>
           </div>
           <p className="font-semibold text-[#1f381f] text-xs">
            {selectedGame.startTime} - {selectedGame.endTime}
           </p>
           <span className="text-[10px] text-stone-400">Palaro Schedule</span>
          </div>

          <div className="rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-2.5 sm:p-3 space-y-1">
           <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#355935] shrink-0" />
            <span>FACILITATOR</span>
           </div>
           <p className="font-semibold text-[#1f381f] text-xs truncate">
            {selectedGame.facilitator}
           </p>
           <span className="inline-block rounded-md border border-amber-300 bg-amber-100 px-1.5 py-0.2 text-[9px] font-bold uppercase text-amber-800">
            PROF · {selectedGame.facilitatorProgram}
           </span>
          </div>

          <div className="col-span-1 sm:col-span-2 rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-2.5 sm:p-3 space-y-1">
           <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-stone-500">
            <UserRound className="w-3.5 h-3.5 text-[#355935] shrink-0" />
            <span>HEAD COACH</span>
           </div>
           <p className="font-semibold text-[#1f381f] text-xs">
            {selectedGame.coach}
           </p>
           <span className="text-[10px] text-stone-400">CCS Coaching Staff</span>
          </div>
         </div>

         {/* Players Section */}
         {selectedGame.players && selectedGame.players.length > 0 && (
          <div>
           <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
             <Users className="w-3.5 h-3.5 text-[#355935] shrink-0" />
             <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-700">
              Players Lineup ({selectedGame.players.length})
             </h4>
            </div>
            <span className="text-[10px] font-mono text-stone-400">CCS PYTHONS</span>
           </div>
           <div className="grid grid-cols-2 gap-2">
            {selectedGame.players.map((player, index) => (
             <div
              key={player}
              className="rounded-xl border border-[#e5efe4] bg-[#f8faf8] px-2.5 py-2 text-xs font-semibold text-[#1f381f] flex items-center justify-between"
             >
              <span className="truncate">{player}</span>
              <span className="ml-1 shrink-0 rounded-md border border-[#c5d8c3] bg-[#edf5ec] px-1 py-0.2 text-[9px] font-bold font-mono uppercase text-[#355935]">
               {['BSIT', 'BSCS', 'ACT'][index % 3]}
              </span>
             </div>
            ))}
           </div>
          </div>
         )}
        </>
       ) : (
        <div className="space-y-3 font-mono">
         <div className={`rounded-xl border p-3.5 ${selectedGame.isWin
             ? 'border-emerald-300 bg-emerald-50/70'
             : 'border-rose-300 bg-rose-50/70'
           }`}>
          <div className="flex items-center justify-between gap-3">
           <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${selectedGame.isWin
               ? 'bg-emerald-200 text-emerald-900 border border-emerald-300'
               : 'bg-rose-200 text-rose-900 border border-rose-300'
             }`}>
            {selectedGame.isWin ? 'Match Won' : 'Match Conceded'}
           </span>
           <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
            FINAL SCORE: {selectedGame.timeOrScore}
           </span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-stone-200/60">
           <p className="text-[10px] uppercase text-stone-500 font-bold tracking-wider">Player Credit / Highlights</p>
           <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#1f381f]">{selectedGame.credit}</p>
          </div>
         </div>
        </div>
       )}
      </div>

      {/* Action Buttons Footer */}
      <div className="flex items-center justify-end gap-2 p-3 sm:px-5 sm:py-3.5 border-t border-stone-200 bg-stone-50/50 shrink-0">
       <button
        type="button"
        onClick={() => setSelectedGame(null)}
        className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
       >
        CLOSE
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};
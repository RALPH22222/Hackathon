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
  venue: 'WMSU Gym  Court A',
  timeOrScore: 'Today  2:00 PM',
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
  timeOrScore: 'Today  4:30 PM',
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
  timeOrScore: 'Tomorrow  9:00 AM',
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
  timeOrScore: 'Tomorrow  1:00 PM',
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
  timeOrScore: '84  72',
  isWin: true,
  credit: 'Jamal Abubakar',
 },
 {
  id: '2',
  sport: 'Sepak Takraw',
  opponent: 'CCJE Enforcers',
  venue: 'Covered Court',
  timeOrScore: '2  0',
  isWin: true,
  credit: 'Alyssa Ramos',
 },
 {
  id: '3',
  sport: 'MLBB Esports',
  opponent: 'CLA Phoenix',
  venue: 'Activity Center',
  timeOrScore: '1  3',
  isWin: false,
  credit: 'Miguel Reyes',
 },
 {
  id: '4',
  sport: 'MLBB Esports',
  opponent: 'CTE Scorpions',
  venue: 'CCS Lab 3',
  timeOrScore: '2  0',
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
      className="flex-1 flex items-center gap-2 sm:gap-3 mx-2 sm:mx-3 my-1.5 px-3 sm:px-5 py-3 rounded-xl bg-[#f8faf8] hover:bg-[#edf5ec] transition-colors cursor-pointer"
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
      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5ec] text-[#355935]">
       <SportIcon sport={item.sport} className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
       <p className="text-[12px] sm:text-[13px] font-bold text-[#1a2f1a] font-display truncate leading-snug">
        <SportName sport={item.sport} />
       </p>
       <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">
        <MatchupTeams opponent={item.opponent} />
       </p>
      </div>

      {/* Right: time/score */}
      <div className="shrink-0 flex flex-col items-end gap-1 text-right font-mono">
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
     </div>
    ))}
   </div>

   {/* Footer */}
   <div className="px-4 sm:px-5 py-2.5 border-t border-[#e5efe4] flex items-center justify-between min-h-[38px]">
    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
     {activeTab === 'upcoming'
      ? `${upcomingGames.length} scheduled`
      : `${wins}W  ${total - wins}L record`}
    </span>
    {activeTab === 'upcoming' ? (
     <ChevronRight className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
    ) : (
     <ChevronLeft className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
    )}
   </div>

   {selectedGame && (
    <div
     className="fixed inset-0 z-50 flex items-center justify-center bg-[#142614]/45 px-4 py-6 backdrop-blur-sm"
     role="presentation"
     onClick={() => setSelectedGame(null)}
    >
     <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-info-title"
      className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#c5d8c3] shadow-2xl"
      onClick={(event) => event.stopPropagation()}
     >
      <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[#e5efe4]">
       <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf5ec] text-[#355935]">
         <SportIcon sport={selectedGame.sport} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
         <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#5d8c55]">
           {activeTab === 'upcoming' ? 'Game Information' : 'Official Game Result'}
          </p>
          {activeTab === 'results' && (
           <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
             selectedGame.isWin
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-rose-100 text-rose-700 border-rose-300'
            }`}
           >
            {selectedGame.isWin ? 'Victory' : 'Defeat'}
           </span>
          )}
         </div>
         <h3 id="game-info-title" className="mt-1 text-lg font-black text-[#142614] font-display">
          <SportName sport={selectedGame.sport} />
         </h3>
         <MatchupTeams
          opponent={selectedGame.opponent}
          fullTeamNames
          className="mt-1 text-[11px] font-mono text-stone-500"
         />
        </div>
       </div>
       <button
        type="button"
        onClick={() => setSelectedGame(null)}
        aria-label="Close game information"
        className="rounded-full p-1.5 text-stone-500 hover:bg-[#edf5ec] hover:text-[#1f381f] transition-colors cursor-pointer"
       >
        <X className="w-4 h-4" />
       </button>
      </div>

      <div className="space-y-4 px-5 py-5">
       <div className={`grid gap-3 text-sm ${activeTab === 'results' && selectedGame.credit ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
        <div className="rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-3">
         <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-stone-400">
          <MapPin className="w-3 h-3 text-[#5d8c55]" /> Venue
         </div>
         <p className="mt-1 font-semibold text-[#1f381f] truncate">{selectedGame.venue}</p>
        </div>
        <div className="rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-3">
         <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-stone-400">
          {activeTab === 'upcoming' ? <Clock className="w-3 h-3 text-[#5d8c55]" /> : <CheckCircle2 className={`w-3 h-3 ${selectedGame.isWin ? 'text-emerald-600' : 'text-rose-600'}`} />} {activeTab === 'upcoming' ? 'Schedule' : 'Final Score'}
         </div>
         <p className={`mt-1 font-semibold truncate ${activeTab === 'upcoming' ? 'text-[#1f381f]' : selectedGame.isWin ? 'text-emerald-800' : 'text-rose-800'}`}>{selectedGame.timeOrScore}</p>
        </div>
        {activeTab === 'results' && selectedGame.credit && (
         <div className="col-span-2 sm:col-span-1 rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-3">
          <div className="font-semibold text-[#1f381f]">
           <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-stone-400">
            <Award className="h-3.5 w-3.5 shrink-0 text-[#5d8c55]" />
            Credits
           </div>
           <p className="mt-1 truncate">{selectedGame.credit}</p>
          </div>
         </div>
        )}
       </div>

       {activeTab === 'upcoming' ? <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="self-start rounded-xl border border-[#e5efe4] bg-[#f8fbf7] p-2.5">
         <div className="flex items-start gap-2">
          <Clock className="mt-0.5 w-4 h-4 text-[#5d8c55] shrink-0" />
          <div><p className="text-[10px] font-mono uppercase text-stone-400">Start / End</p><p className="font-semibold text-[#1f381f]">{selectedGame.startTime} - {selectedGame.endTime}</p></div>
         </div>
        </div>
        <div className="order-2 rounded-xl border border-[#e5efe4] bg-[#f8fbf7] p-2.5 sm:col-span-2 sm:w-fit sm:max-w-full">
         <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 w-4 h-4 text-[#5d8c55] shrink-0" />
          <div><p className="text-[10px] font-mono uppercase text-stone-400">Facilitator</p><p className="flex flex-wrap items-center gap-1.5 font-semibold text-[#1f381f] sm:flex-nowrap sm:whitespace-nowrap"><span className="inline-flex rounded-md border border-amber-300 bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">PROF {selectedGame.facilitatorProgram}</span>{selectedGame.facilitator}</p></div>
         </div>
        </div>
        <div className="order-1 self-start rounded-xl border border-[#e5efe4] bg-[#f8fbf7] p-2.5">
         <div className="flex items-start gap-2">
          <UserRound className="mt-0.5 w-4 h-4 text-[#5d8c55] shrink-0" />
          <div><p className="text-[10px] font-mono uppercase text-stone-400">Coach</p><p className="font-semibold text-[#1f381f]">{selectedGame.coach}</p></div>
         </div>
        </div>
       </div> : null}

       {activeTab === 'upcoming' && <div>
        <div className="flex items-center gap-1.5 mb-2">
         <Users className="w-4 h-4 text-[#5d8c55]" />
         <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">Players</h4>
        </div>
        <div className="flex items-start gap-2">
         {[0, 1].map((column) => (
          <div key={column} className="min-w-0 flex-1 space-y-1">
           {selectedGame.players?.filter((_, index) => index % 2 === column).map((player, index) => {
            const playerIndex = index * 2 + column;
            return (
             <div key={player} className="min-w-0 rounded-lg border border-[#e5efe4] bg-[#fcfdfc] px-2.5 py-1.5 text-sm font-semibold leading-tight text-[#1f381f]">
              <span className="mr-1.5 inline-flex rounded-md border border-[#c5d8c3] bg-[#edf5ec] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#355935]">{['BSIT', 'BSCS', 'ACT'][playerIndex % 3]}</span>{player}
             </div>
            );
           })}
          </div>
         ))}
        </div>
       </div>}
      </div>
     </div>
    </div>
   )}
  </div>
 );
};
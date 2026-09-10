import { useState } from 'react';
import { Flame, Trophy } from 'lucide-react';
import { HomeHeader } from '../components/home/HomeHeader';
import { SectionScheduleCard } from '../components/home/SectionScheduleCard';
import { GameScheduleCard } from '../components/home/GameScheduleCard';
import { MedalTallyCard } from '../components/home/MedalTallyCard';
import { BottomNav } from '../components/BottomNav';
import { Attendance } from './Attendance';
import { BackupRequest } from './BackupRequest';

export function Home() {
  const [activeNav, setActiveNav] = useState<'home' | 'backup' | 'qr' | 'attendance'>('home');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf4ee] text-slate-800 font-sans pb-24 md:pb-10 select-none">
      <div
        className="fixed inset-0 pointer-events-none z-0 select-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(53, 89, 53, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(53, 89, 53, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(93,140,85,0.12),_transparent_45%)] z-0" />

      <div className="relative z-10">
        {/* 1. Header Bar: Left (Logo), Middle (Nav Buttons), Right (Live Status) */}
        <HomeHeader activeTab={activeNav} onTabChange={setActiveNav} />

        {/* 2. Main Dashboard Content */}
        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {activeNav === 'home' && (
            <>
              {/* Telemetry Header: Command Center Overview (Unified with Backup page) */}
              <div className="bg-white rounded-2xl border border-[#c5d8c3] overflow-hidden shadow-xs">
                <div className="p-3.5 sm:p-5 space-y-3">
                  {/* Top Telemetry Strip */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono border-b border-[#e5efe4] pb-2 sm:pb-3">
                    <div className="flex items-center gap-1.5 text-[#355935]">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                      </span>
                      <span className="font-bold tracking-wider uppercase truncate">SYS.TELEMETRY // LIVE DASHBOARD FEED</span>
                    </div>
                    <div className="text-stone-500 font-mono text-[9px] sm:text-[10px] shrink-0">
                      <span>FREQ: 104.8 PYTHONS</span>
                    </div>
                  </div>

                  {/* Title & Action Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#edf5ec] text-[#254625] border border-[#c5d8c3] text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider">
                          PALARO 2026
                        </span>
                        <span className="text-[10px] sm:text-xs text-stone-400 font-mono">STANDINGS // WMSU</span>
                      </div>
                      <h1 className="text-lg sm:text-2xl font-black text-[#142614] tracking-tight uppercase font-display mt-0.5 sm:mt-1 flex items-center gap-2">
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#355935] shrink-0" />
                        Palaro Command Center
                      </h1>
                      <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 sm:mt-1 max-w-2xl leading-relaxed">
                        Track live athletic matchups, mandatory section attendance milestones, and official college medal tallies for the CCS Pythons.
                      </p>
                    </div>
                  </div>

                  {/* HUD Metrics Bar */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t border-[#e5efe4] text-center font-mono">
                    <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-1.5 sm:p-2">
                      <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block truncate">Scheduled Matches</span>
                      <span className="text-xs sm:text-base font-bold text-[#142614] block truncate">4 TODAY</span>
                    </div>
                    <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-1.5 sm:p-2">
                      <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block truncate">Attendance Section</span>
                      <span className="text-xs sm:text-base font-bold text-[#355935] block truncate">BSCS 4-B (1 LIVE)</span>
                    </div>
                    <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-1.5 sm:p-2">
                      <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block truncate">Current Standing</span>
                      <span className="text-xs sm:text-base font-bold text-amber-700 flex items-center justify-center gap-0.5 truncate">
                        <Trophy className="w-3 h-3 text-amber-600 shrink-0" />
                        RANK #1 (28 MEDALS)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Row: 2 Cards (Assigned Schedule & Venom Upcoming/Results) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <SectionScheduleCard />
                <GameScheduleCard />
              </div>

              {/* Big Leaderboard Card: Palaro Medal Tally */}
              <MedalTallyCard />
            </>
          )}

          {activeNav === 'backup' && <BackupRequest />}

          {(activeNav === 'qr' || activeNav === 'attendance') && <Attendance />}
        </main>

        {/* 3. Bottom Navigation (Mobile Only) */}
        <BottomNav activeTab={activeNav} onTabChange={setActiveNav} />
      </div>
    </div>
  );
}

export default Home;

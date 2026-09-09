import { useState } from 'react';
import { HomeHeader } from '../components/home/HomeHeader';
import { SectionScheduleCard } from '../components/home/SectionScheduleCard';
import { GameScheduleCard } from '../components/home/GameScheduleCard';
import { MedalTallyCard } from '../components/home/MedalTallyCard';
import { BottomNav } from '../components/BottomNav';

export function Home() {
  const [activeNav, setActiveNav] = useState<'home' | 'backup' | 'qr'>('home');

  return (
    <div className="min-h-screen bg-[#f3f7f2] text-slate-800 font-sans pb-24 md:pb-10 select-none">
      {/* 1. Header Bar: Left (Logo), Middle (Nav Buttons), Right (Live Status) */}
      <HomeHeader activeTab={activeNav} onTabChange={setActiveNav} />

      {/* 2. Main Dashboard Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        
        {/* Top Row: 2 Cards (Assigned Schedule & Venom Upcoming/Results) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <SectionScheduleCard />
          <GameScheduleCard />
        </div>

        {/* Big Leaderboard Card: Palaro Medal Tally */}
        <MedalTallyCard />

      </main>

      {/* 3. Bottom Navigation (Mobile Only) */}
      <BottomNav activeTab={activeNav} onTabChange={setActiveNav} />
    </div>
  );
}

export default Home;

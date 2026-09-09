import { useState } from 'react';
import { HomeHeader } from '../../components/home/HomeHeader';
import { SectionScheduleCard } from '../../components/home/SectionScheduleCard';
import { GameScheduleCard } from '../../components/home/GameScheduleCard';
import { MedalTallyCard } from '../../components/home/MedalTallyCard';
import { BottomNav } from '../../components/home/BottomNav';

export function Home() {
  const [activeNav, setActiveNav] = useState<'home' | 'backup' | 'qr'>('home');

  return (
    <div className="min-h-screen bg-[#f3f7f2] text-slate-800 font-sans pb-24 select-none">
      {/* 1. Header Bar with CCS Logo */}
      <HomeHeader />

      {/* 2. Main Mobile Content */}
      <main className="max-w-md mx-auto p-3.5 space-y-3.5">
        
        {/* Top Row: 2 Cards (Assigned Schedule by Section & Venom Upcoming/Results) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SectionScheduleCard />
          <GameScheduleCard />
        </div>

        {/* Big Box: Medal Tally Leaderboard */}
        <MedalTallyCard />

      </main>

      {/* 3. Fixed Bottom Navigation */}
      <BottomNav activeTab={activeNav} onTabChange={setActiveNav} />
    </div>
  );
}

export default Home;

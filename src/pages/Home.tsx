import { useState } from 'react';
import { HomeHeader } from '../components/home/HomeHeader';
import { SectionScheduleCard } from '../components/home/SectionScheduleCard';
import { GameScheduleCard } from '../components/home/GameScheduleCard';
import { MedalTallyCard } from '../components/home/MedalTallyCard';
import { BottomNav } from '../components/BottomNav';
import { BackupRequest } from './BackupRequest';
import { QrCode } from 'lucide-react';

export function Home() {
  const [activeNav, setActiveNav] = useState<'home' | 'backup' | 'qr'>('home');

  return (
    <div className="min-h-screen bg-[#f3f7f2] text-slate-800 font-sans pb-24 md:pb-10 select-none">
      {/* 1. Header Bar: Left (Logo), Middle (Nav Buttons), Right (Live Status) */}
      <HomeHeader activeTab={activeNav} onTabChange={setActiveNav} />

      {/* 2. Main Mobile Content */}
      <main className="max-w-md mx-auto p-3.5 space-y-3.5">
        {activeNav === 'home' && (
          <>
            {/* Top Row: 2 Cards (Assigned Schedule by Section & Venom Upcoming/Results) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SectionScheduleCard />
              <GameScheduleCard />
            </div>

            {/* Big Box: Medal Tally Leaderboard */}
            <MedalTallyCard />
          </>
        )}

        {/* Request Backup Page View */}
        {activeNav === 'backup' && <BackupRequest />}

        {/* QR Code Tab View */}
        {activeNav === 'qr' && (
          <div className="bg-white rounded-2xl border border-[#c5d8c3] p-6 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#edf5ec] text-[#355935] flex items-center justify-center mx-auto border border-[#c5d8c3]">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1f381f] font-display">Palaro Attendance Scanner</h2>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Scan section marshals or match venue QR codes to confirm your crowd attendance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveNav('home')}
              className="py-2.5 px-5 bg-[#355935] hover:bg-[#2a482a] text-white font-semibold rounded-xl text-xs shadow-sm cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </main>

      {/* 3. Bottom Navigation (Mobile Only) */}
      <BottomNav activeTab={activeNav} onTabChange={setActiveNav} />
    </div>
  );
}

export default Home;

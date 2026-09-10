import { useState, useEffect } from 'react';
import { HomeHeader } from '../components/home/HomeHeader';
import { SectionScheduleCard } from '../components/home/SectionScheduleCard';
import { GameScheduleCard } from '../components/home/GameScheduleCard';
import { MedalTallyCard } from '../components/home/MedalTallyCard';
import { BottomNav } from '../components/BottomNav';
import { Attendance } from './Attendance';
import { AdviserAttendance } from './AdviserAttendance';
import { BackupRequest } from './BackupRequest';

interface HomeProps {
  userRole?: 'student' | 'adviser';
  onLogout?: () => void;
}

export function Home({ userRole: initialRole = 'student', onLogout }: HomeProps = {}) {
  const [activeNav, setActiveNav] = useState<'home' | 'backup' | 'qr' | 'attendance'>('home');
  const [userRole, setUserRole] = useState<'student' | 'adviser'>(initialRole);

  useEffect(() => {
    setUserRole(initialRole);
  }, [initialRole]);

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
        {/* 1. Header Bar: Logo, Tabs, Active Role Badge & Logout */}
        <HomeHeader
          activeTab={activeNav}
          onTabChange={setActiveNav}
          userRole={userRole}
          onLogout={onLogout}
        />

        {/* 2. Main Dashboard Content */}
        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {activeNav === 'home' && (
            <>
              {/* Top Row: 2 Cards (Assigned Schedule & Venom Upcoming/Results) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <SectionScheduleCard
                  userRole={userRole}
                  onNavigateToAttendance={() => setActiveNav('attendance')}
                />
                <GameScheduleCard />
              </div>

              {/* Big Leaderboard Card: Palaro Medal Tally */}
              <MedalTallyCard />
            </>
          )}

          {activeNav === 'backup' && <BackupRequest />}

          {(activeNav === 'qr' || activeNav === 'attendance') &&
            (userRole === 'adviser' ? <AdviserAttendance /> : <Attendance />)}
        </main>

        {/* 3. Bottom Navigation (Mobile Only) */}
        <BottomNav activeTab={activeNav} onTabChange={setActiveNav} userRole={userRole} />
      </div>
    </div>
  );
}

export default Home;

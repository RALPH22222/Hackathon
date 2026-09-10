import React, { useState } from 'react';
import { Clock, MapPin, CheckCircle2, ArrowRight, ChevronDown, UserCheck, X, Users, UserRound, ShieldCheck } from 'lucide-react';

import messengerLogo from '../../assets/messenger.png';

interface ScheduleItem {
  id: string;
  sport: string;
  time: string;
  venue: string;
  facilitator: string;
  facilitatorProgram: 'BSIT' | 'BSCS' | 'ACT';
  players: string[];
  coach: string;
  startTime: string;
  endTime: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
}

const sectionSchedules: ScheduleItem[] = [
  {
    id: '1',
    sport: 'Basketball Men vs COE',
    time: '10:00 AM',
    venue: 'Gymnasium',
    facilitator: 'Facilitator: Santos Michael',
    facilitatorProgram: 'BSCS',
    players: ['Ramos Alyssa', 'Abubakar Jamal', 'Santos Michael', 'Tan Paolo', 'Garcia Luis'],
    coach: 'Villanueva Rafael',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    status: 'In Progress',
  },
  {
    id: '2',
    sport: 'Volleyball Women vs CLA',
    time: '01:30 PM',
    venue: 'Court B',
    facilitator: 'Facilitator: Ramos Alyssa',
    facilitatorProgram: 'BSIT',
    players: ['Flores Nina', 'Dela Cruz Carla', 'Malik Sara', 'Navarro Kara', 'Lim Daniel'],
    coach: 'Bautista Elena',
    startTime: '1:30 PM',
    endTime: '3:00 PM',
    status: 'Upcoming',
  },
  {
    id: '3',
    sport: 'MLBB Esports vs CTE',
    time: '03:45 PM',
    venue: 'CCS Lab 3',
    facilitator: 'Facilitator: Abubakar Jamal',
    facilitatorProgram: 'ACT',
    players: ['Tan Paolo', 'Garcia Rosa', 'Ahmed Tariq', 'Cruz Juan', 'Flores Bea'],
    coach: 'Santiago Marco',
    startTime: '3:45 PM',
    endTime: '5:15 PM',
    status: 'Upcoming',
  },
  {
    id: '4',
    sport: 'Badminton Doubles vs CCJE',
    time: '05:00 PM',
    venue: 'Covered Court',
    facilitator: 'Facilitator: Garcia Luis',
    facilitatorProgram: 'BSCS',
    players: ['Tan Liam', 'Reyes Miguel', 'Karim Amir', 'Santos Fiona'],
    coach: 'Navarro Carlos',
    startTime: '5:00 PM',
    endTime: '6:30 PM',
    status: 'Upcoming',
  },
];

interface SectionAdviserData {
  sectionName: string;
  totalStudents: number;
  checkedInTotal: number;
  pendingCount: number;
  events: {
    id: string;
    sport: string;
    time: string;
    venue: string;
    status: 'In Progress' | 'Upcoming' | 'Completed';
    checkedIn: number;
    pendingCount: number;
    note?: string;
  }[];
}

const sectionAdviserRecords: Record<string, SectionAdviserData> = {
  'BSCS 4-B': {
    sectionName: 'BSCS 4-B',
    totalStudents: 38,
    checkedInTotal: 34,
    pendingCount: 4,
    events: [
      {
        id: '1',
        sport: 'Basketball Men vs COE',
        time: '10:00 AM',
        venue: 'Gymnasium',
        status: 'In Progress',
        checkedIn: 34,
        pendingCount: 2,
        note: 'Live check-ins streaming',
      },
      {
        id: '2',
        sport: 'Volleyball Women vs CLA',
        time: '01:30 PM',
        venue: 'Court B',
        status: 'Upcoming',
        checkedIn: 0,
        pendingCount: 1,
        note: '1 proof submitted early',
      },
      {
        id: '3',
        sport: 'MLBB Esports vs CTE',
        time: '03:45 PM',
        venue: 'CCS Lab 3',
        status: 'Upcoming',
        checkedIn: 0,
        pendingCount: 1,
        note: '1 proof queued',
      },
      {
        id: '4',
        sport: 'Badminton Doubles vs CCJE',
        time: '05:00 PM',
        venue: 'Covered Court',
        status: 'Upcoming',
        checkedIn: 0,
        pendingCount: 0,
        note: 'Check-in opens 04:30 PM',
      },
    ],
  },
  'BSIT 3-A': {
    sectionName: 'BSIT 3-A',
    totalStudents: 35,
    checkedInTotal: 29,
    pendingCount: 2,
    events: [
      {
        id: '1',
        sport: 'Basketball Men vs COE',
        time: '10:00 AM',
        venue: 'Gymnasium',
        status: 'In Progress',
        checkedIn: 29,
        pendingCount: 1,
        note: 'Live check-ins streaming',
      },
      {
        id: '2',
        sport: 'Volleyball Women vs CLA',
        time: '01:30 PM',
        venue: 'Court B',
        status: 'Upcoming',
        checkedIn: 0,
        pendingCount: 1,
        note: '1 proof submitted early',
      },
      {
        id: '3',
        sport: 'MLBB Esports vs CTE',
        time: '03:45 PM',
        venue: 'CCS Lab 3',
        status: 'Upcoming',
        checkedIn: 0,
        pendingCount: 0,
        note: 'Opens 03:15 PM',
      },
      {
        id: '4',
        sport: 'Badminton Doubles vs CCJE',
        time: '05:00 PM',
        venue: 'Covered Court',
        status: 'Upcoming',
        checkedIn: 0,
        pendingCount: 0,
        note: 'Opens 04:30 PM',
      },
    ],
  },
};

const facilitatorHandledMatches = [
  {
    id: 'f1',
    sport: 'Basketball Men vs COE',
    assignedSection: 'BSCS 4-B',
    time: '10:00 AM',
    venue: 'WMSU Main Gymnasium',
    status: 'In Progress',
  },
  {
    id: 'f2',
    sport: 'Volleyball Women vs CLA',
    assignedSection: 'BSIT 3-A',
    time: '01:30 PM',
    venue: 'Covered Court B',
    status: 'Upcoming',
  },
  {
    id: 'f3',
    sport: 'MLBB Esports vs CTE',
    assignedSection: 'BSCS 3-A',
    time: '03:45 PM',
    venue: 'CCS Lab 3',
    status: 'Upcoming',
  },
  {
    id: 'f4',
    sport: 'Sepak Takraw vs CCJE',
    assignedSection: 'BSIT 4-B',
    time: '08:00 AM',
    venue: 'Quadrangle Grounds',
    status: 'Completed',
  },
];

interface SectionScheduleCardProps {
  userRole?: 'student' | 'adviser' | 'facilitator';
  onNavigateToAttendance?: () => void;
}

export const SectionScheduleCard: React.FC<SectionScheduleCardProps> = ({
  userRole = 'student',
  onNavigateToAttendance,
}) => {
  const [selectedSection, setSelectedSection] = useState<'BSCS 4-B' | 'BSIT 3-A'>('BSCS 4-B');
  const [selectedAttendance, setSelectedAttendance] = useState<ScheduleItem | null>(null);
  const adviserData = sectionAdviserRecords[selectedSection];

  // FACILITATOR VIEW
  if (userRole === 'facilitator') {
    return (
      <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between min-h-[64px] bg-[#fcfdfc] border-b border-[#eef5ed]">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono text-[#5d8c55] font-bold uppercase tracking-wider">
                Matches Handled & Supervised
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#1b4332] text-white text-[9px] font-mono font-bold">
                FACILITATOR
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#142614] tracking-tight leading-none font-display">
              Palaro Sports Matches
            </h2>
          </div>

          {onNavigateToAttendance && (
            <button
              type="button"
              onClick={onNavigateToAttendance}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1b4332] text-white hover:bg-[#122e22] text-[10.5px] font-mono font-bold transition-all cursor-pointer shadow-2xs"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Quick Stats Ribbon */}
        <div className="grid grid-cols-3 divide-x divide-[#eef5ed] bg-[#f8faf8] border-b border-[#eef5ed] py-2 px-3 sm:px-4 text-center">
          <div className="px-1">
            <p className="text-[9.5px] font-mono uppercase text-stone-400 font-medium">Handled Matches</p>
            <p className="text-xs sm:text-sm font-black font-display text-[#1f381f] mt-0.5">
              {facilitatorHandledMatches.length} <span className="text-[10px] font-mono font-normal text-stone-500">Events</span>
            </p>
          </div>
          <div className="px-1">
            <p className="text-[9.5px] font-mono uppercase text-stone-400 font-medium">Assigned Sections</p>
            <p className="text-xs sm:text-sm font-black font-display text-[#355935] mt-0.5">
              4 <span className="text-[10px] font-mono font-normal text-stone-500">Classes</span>
            </p>
          </div>
          <div className="px-1">
            <p className="text-[9.5px] font-mono uppercase text-stone-400 font-medium">Active Status</p>
            <p className="text-xs sm:text-sm font-black font-display text-amber-700 mt-0.5">
              1 <span className="text-[10px] font-mono font-normal text-stone-500">Live Game</span>
            </p>
          </div>
        </div>

        {/* List of Handled Matches */}
        <div className="flex-1 flex flex-col divide-y divide-[#eef5ed]">
          {facilitatorHandledMatches.map((item) => {
            const isLive = item.status === 'In Progress';
            const isCompleted = item.status === 'Completed';

            return (
              <div
                key={item.id}
                className={`flex-1 flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-[#f8faf7] transition-colors ${
                  isLive ? 'bg-amber-50/50' : ''
                }`}
              >
                {/* Left status bar */}
                <div
                  className={`w-1 self-stretch rounded-full shrink-0 ${
                    isLive ? 'bg-amber-500' : isCompleted ? 'bg-emerald-500' : 'bg-[#c5d8c3]'
                  }`}
                />

                {/* Middle: Match & Assigned Section */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[12px] sm:text-[13px] font-bold leading-snug truncate font-display ${
                      isLive ? 'text-amber-950' : 'text-[#1a2f1a]'
                    }`}
                  >
                    {item.sport}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-mono mt-0.5">
                    <span className="flex items-center gap-0.5 text-stone-500">
                      <MapPin className="w-2.5 h-2.5 text-[#5d8c55] shrink-0" />
                      {item.venue}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#edf5ec] text-[#1f381f] font-bold border border-[#c5d8c3]">
                      Sec: {item.assignedSection}
                    </span>
                  </div>
                </div>

                {/* Right: time / status */}
                <div className="shrink-0 text-right font-mono">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border font-semibold text-[11px] sm:text-xs shadow-2xs ${
                      isLive ? 'border-amber-300' : 'border-[#c5d8c3]'
                    }`}
                  >
                    <Clock
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isLive ? 'text-amber-600' : 'text-[#355935]'
                      }`}
                    />
                    <span className={isLive ? 'text-amber-950 font-bold' : 'text-[#1f381f]'}>
                      {item.time}
                    </span>
                    <span
                      className={`ml-0.5 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                        isLive
                          ? 'bg-amber-100 text-amber-800'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#edf5ec] text-[#355935]'
                      }`}
                    >
                      {isLive ? 'LIVE' : isCompleted ? 'DONE' : 'SOON'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-2.5 border-t border-[#e5efe4] bg-[#fcfdfc] flex items-center justify-between min-h-[42px]">
          {onNavigateToAttendance ? (
            <button
              type="button"
              onClick={onNavigateToAttendance}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#254625] hover:text-emerald-700 transition-colors group cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#5d8c55] group-hover:scale-110 transition-transform" />
              <span>Control Desk & Venue Updates</span>
              <ArrowRight className="w-3 h-3 text-[#5d8c55] group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
              {facilitatorHandledMatches.length} Matches Supervised
            </span>
          )}

          <span className="text-[10px] font-mono text-[#5d8c55] font-semibold">
            PALARO 2026
          </span>
        </div>
      </div>
    );
  }

  // ADVISER VIEW
  if (userRole === 'adviser') {
    const turnoutPercent = Math.round(
      (adviserData.checkedInTotal / adviserData.totalStudents) * 100
    );

    return (
      <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between min-h-[64px] bg-[#fcfdfc] border-b border-[#eef5ed]">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono text-[#5d8c55] font-bold uppercase tracking-wider">
                Advisory Attendance Monitor
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100/70 border border-emerald-300/60 text-[#1f381f] text-[9px] font-mono font-bold">
                ADVISER
              </span>
            </div>

            {/* Section Switcher Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedSection}
                aria-label="Select Advisory Section"
                onChange={(e) => setSelectedSection(e.target.value as 'BSCS 4-B' | 'BSIT 3-A')}
                className="text-sm sm:text-base font-black text-[#142614] tracking-tight leading-none font-display bg-transparent border-none pr-5 py-0.5 focus:outline-hidden cursor-pointer appearance-none"
              >
                <option value="BSCS 4-B">BSCS 4-B (Main Advisory)</option>
                <option value="BSIT 3-A">BSIT 3-A (Assisted)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Pending Reviews Badge */}
          {adviserData.pendingCount > 0 ? (
            <button
              type="button"
              onClick={onNavigateToAttendance}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100/80 transition-all cursor-pointer shadow-2xs group"
              title="Click to review pending student submissions"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-[10.5px] font-mono font-bold uppercase">
                {adviserData.pendingCount} Pending
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-mono font-bold uppercase">All Verified</span>
            </div>
          )}
        </div>

        {/* Quick Stats Ribbon */}
        <div className="grid grid-cols-3 divide-x divide-[#eef5ed] bg-[#f8faf8] border-b border-[#eef5ed] py-2 px-3 sm:px-4 text-center">
          <div className="px-1">
            <p className="text-[9.5px] font-mono uppercase text-stone-400 font-medium">Turnout Rate</p>
            <p className="text-xs sm:text-sm font-black font-display text-[#1f381f] mt-0.5">
              {turnoutPercent}% <span className="text-[10px] font-mono font-normal text-stone-500">({adviserData.checkedInTotal}/{adviserData.totalStudents})</span>
            </p>
          </div>
          <div className="px-1">
            <p className="text-[9.5px] font-mono uppercase text-stone-400 font-medium">Pending Review</p>
            <p className="text-xs sm:text-sm font-black font-display text-amber-700 mt-0.5">
              {adviserData.pendingCount} <span className="text-[10px] font-mono font-normal text-stone-500">Students</span>
            </p>
          </div>
          <div className="px-1">
            <p className="text-[9.5px] font-mono uppercase text-stone-400 font-medium">Active Event</p>
            <p className="text-xs sm:text-sm font-black font-display text-emerald-700 mt-0.5">
              1 <span className="text-[10px] font-mono font-normal text-stone-500">Live Now</span>
            </p>
          </div>
        </div>

        {/* Event List with Class Attendance Status */}
        <div className="flex-1 flex flex-col divide-y divide-[#eef5ed]">
          {adviserData.events.map((item) => {
            const isLive = item.status === 'In Progress';
            const progress = Math.round((item.checkedIn / adviserData.totalStudents) * 100);

            return (
              <div
                key={item.id}
                className={`flex-1 flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 transition-colors ${
                  isLive ? 'bg-amber-50/40' : 'hover:bg-[#f8faf7]'
                }`}
              >
                {/* Status Bar */}
                <div
                  className={`w-1 self-stretch rounded-full shrink-0 ${
                    isLive ? 'bg-amber-500' : 'bg-[#c5d8c3]'
                  }`}
                />

                {/* Event & Class Stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <p
                      className={`text-[12px] sm:text-[13px] font-bold leading-snug truncate font-display ${
                        isLive ? 'text-amber-950' : 'text-[#1a2f1a]'
                      }`}
                    >
                      {item.sport}
                    </p>
                  </div>

                  {/* Venue and note */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-stone-400 font-mono mt-0.5">
                    <span className="flex items-center gap-1 text-stone-500">
                      <MapPin className="w-2.5 h-2.5 text-[#5d8c55] shrink-0" />
                      {item.venue}
                    </span>
                    {item.pendingCount > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-amber-700 font-semibold">
                        • {item.pendingCount} to verify
                      </span>
                    )}
                  </div>

                  {/* Mini Progress Bar for Live / Active Event */}
                  {isLive && (
                    <div className="mt-1.5 space-y-0.5">
                      <div className="flex items-center justify-between text-[9.5px] font-mono">
                        <span className="text-amber-900 font-bold">
                          {item.checkedIn}/{adviserData.totalStudents} Present ({progress}%)
                        </span>
                        <span className="text-stone-400">Class Progress</span>
                      </div>
                      <div className="h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Time & Badge */}
                <div className="shrink-0 text-right font-mono">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border font-semibold text-[10.5px] sm:text-xs shadow-2xs ${
                      isLive ? 'border-amber-300' : 'border-[#c5d8c3]'
                    }`}
                  >
                    <Clock
                      className={`w-3 h-3 shrink-0 ${
                        isLive ? 'text-amber-600' : 'text-[#355935]'
                      }`}
                    />
                    <span className={isLive ? 'text-amber-950 font-bold' : 'text-[#1f381f]'}>
                      {item.time}
                    </span>
                    <span
                      className={`ml-0.5 text-[8.5px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                        isLive
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#edf5ec] text-[#355935]'
                      }`}
                    >
                      {isLive ? 'LIVE' : 'SOON'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Quick Review Action */}
        <div className="px-4 sm:px-5 py-2.5 border-t border-[#e5efe4] bg-[#fcfdfc] flex items-center justify-between gap-2 min-h-[42px]">
          {onNavigateToAttendance ? (
            <button
              type="button"
              onClick={onNavigateToAttendance}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#254625] hover:text-emerald-700 transition-colors group cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#5d8c55] group-hover:scale-110 transition-transform" />
              <span>Review Submissions ({adviserData.pendingCount})</span>
              <ArrowRight className="w-3 h-3 text-[#5d8c55] group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
              {adviserData.totalStudents} Enrolled in {selectedSection}
            </span>
          )}

          <span className="text-[10px] font-mono text-[#5d8c55] font-semibold">
            PALARO 2026
          </span>
        </div>
      </div>
    );
  }

  // STUDENT VIEW (Original)
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between min-h-[64px]">
        <div>
          <p className="text-[10px] font-mono text-[#5d8c55] font-semibold uppercase tracking-widest mb-0.5">
            Required Attendance
          </p>
          <h2 className="text-sm sm:text-base font-black text-[#142614] tracking-tight leading-none font-display">
            BSCS 4-B
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
          </span>
          <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">1 Live</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 sm:mx-5 h-px bg-[#e5efe4]" />

      {/* List */}
      <div className="flex-1 flex flex-col divide-y divide-[#eef5ed]">
        {sectionSchedules.map((item) => {
          const isLive = item.status === 'In Progress';
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAttendance(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedAttendance(item);
                }
              }}
              role="button"
              tabIndex={0}
              className={`flex-1 flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-[#f8faf7] transition-colors ${
                isLive ? 'bg-amber-50/50 ' : ''
              } cursor-pointer`}
            >
              {/* Left: status bar */}
              <div
                className={`w-1 self-stretch rounded-full shrink-0 ${
                  isLive ? 'bg-amber-500' : 'bg-[#c5d8c3]'
                }`}
              />

              {/* Middle: Name & venue */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[12px] sm:text-[13px] font-bold leading-snug truncate font-display ${
                    isLive ? 'text-amber-900' : 'text-[#1a2f1a]'
                  }`}
                >
                  {item.sport}
                </p>
                <span className="flex items-center gap-1 text-[10px] text-stone-400 font-mono mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-[#5d8c55] shrink-0" />
                  {item.venue}
                </span>
                <div className="flex items-center gap-2 mt-1 text-[9.5px] font-mono">
                  <span className="text-stone-500 truncate">{item.facilitator}</span>
                  <a
                    href="https://m.me/ccspythons"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    aria-label={`Message ${item.facilitator}`}
                    title="Message facilitator on Facebook Messenger"
                    className="inline-flex cursor-pointer items-center justify-center transition-transform hover:scale-110 shrink-0"
                  >
                    <img src={messengerLogo} alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
                  </a>
                </div>
              </div>

              {/* Right: time + badge */}
              <div className="shrink-0 text-right font-mono">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border font-semibold text-[11px] sm:text-xs shadow-2xs ${
                    isLive ? 'border-amber-300' : 'border-[#c5d8c3]'
                  }`}
                >
                  <Clock
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isLive ? 'text-amber-600' : 'text-[#355935]'
                    }`}
                  />
                  <span className={isLive ? 'text-amber-950 font-bold' : 'text-[#1f381f]'}>
                    {item.time}
                  </span>
                  <span
                    className={`ml-0.5 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                      isLive
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#edf5ec] text-[#355935]'
                    }`}
                  >
                    {isLive ? 'LIVE' : 'SOON'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-2.5 border-t border-[#e5efe4] flex items-center justify-between min-h-[38px]">
        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
          {sectionSchedules.length} events today
        </span>
        <span className="text-[10px] font-mono text-[#5d8c55] font-semibold">PALARO 2026</span>
      </div>

      {selectedAttendance && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142614]/45 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedAttendance(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-info-title"
            className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#c5d8c3] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[#e5efe4]">
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#5d8c55]">
                  Attendance Information
                </p>
                <h3 id="attendance-info-title" className="mt-1 text-lg font-black text-[#142614] font-display">
                  {selectedAttendance.sport}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAttendance(null)}
                aria-label="Close attendance information"
                className="rounded-full p-1.5 text-stone-500 hover:bg-[#edf5ec] hover:text-[#1f381f] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-stone-400">
                    <MapPin className="w-3 h-3 text-[#5d8c55]" /> Venue
                  </div>
                  <p className="mt-1 font-semibold text-[#1f381f]">{selectedAttendance.venue}</p>
                </div>
                <div className="rounded-xl bg-[#f8faf8] border border-[#e5efe4] p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-stone-400">
                    <Clock className="w-3 h-3 text-[#5d8c55]" /> Schedule
                  </div>
                  <p className="mt-1 font-semibold text-[#1f381f]">{selectedAttendance.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 w-4 h-4 text-[#5d8c55] shrink-0" />
                  <div><p className="text-[10px] font-mono uppercase text-stone-400">Start / End</p><p className="font-semibold text-[#1f381f]">{selectedAttendance.startTime} - {selectedAttendance.endTime}</p></div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 w-4 h-4 text-[#5d8c55] shrink-0" />
                  <div><p className="text-[10px] font-mono uppercase text-stone-400">Facilitator</p><p className="flex flex-wrap items-center gap-1.5 font-semibold text-[#1f381f]"><span className="inline-flex rounded-md border border-amber-300 bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">PROF · {selectedAttendance.facilitatorProgram}</span>{selectedAttendance.facilitator.replace('Facilitator: ', '')}</p></div>
                </div>
                <div className="flex items-start gap-2 col-span-2">
                  <UserRound className="mt-0.5 w-4 h-4 text-[#5d8c55] shrink-0" />
                  <div><p className="text-[10px] font-mono uppercase text-stone-400">Coach</p><p className="font-semibold text-[#1f381f]">{selectedAttendance.coach}</p></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className="w-4 h-4 text-[#5d8c55]" />
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">Players</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedAttendance.players.map((player, index) => (
                    <div key={player} className="rounded-lg border border-[#e5efe4] bg-[#fcfdfc] px-3 py-2 text-sm font-semibold text-[#1f381f]">
                      <span className="mr-1.5 inline-flex rounded-md border border-[#c5d8c3] bg-[#edf5ec] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#355935]">{['BSIT', 'BSCS', 'ACT'][index % 3]}</span>{player}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

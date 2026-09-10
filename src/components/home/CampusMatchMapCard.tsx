import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Trophy,
  Clock,
  Layers,
  Search,
  Play,
  Sparkles,
  Gamepad2,
  Crosshair,
  Crown,
  Activity,
  Flame,
  Target,
  Zap,
  Timer,
  Medal,
  Calendar,
  Map as MapIcon,
  ListFilter,
} from 'lucide-react';

export type SportCategoryType =
  | 'basketball'
  | 'badminton'
  | 'volleyball'
  | 'sepak-takraw'
  | 'football'
  | 'track'
  | 'esports'
  | 'shooter'
  | 'chess'
  | 'table-tennis';

export interface CampusMatch {
  id: string;
  sport: string;
  category: string;
  teamA: string;
  teamB: string;
  time: string;
  date: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  facilitator: string;
  facilitatorProgram: 'BSCS' | 'BSIT' | 'ACT';
  coach: string;
  sportType: SportCategoryType;
}

export interface CampusVenue {
  id: string;
  name: string;
  shortName: string;
  zone: string;
  description: string;
  svgCoords: { x: number; y: number };
  matches: CampusMatch[];
}

export const SportIcon: React.FC<{
  type: SportCategoryType | string;
  className?: string;
}> = ({ type, className = 'w-4 h-4' }) => {
  switch (type) {
    case 'basketball':
      return <Trophy className={className} />;
    case 'badminton':
      return <Zap className={className} />;
    case 'volleyball':
      return <Activity className={className} />;
    case 'sepak-takraw':
      return <Target className={className} />;
    case 'football':
      return <Flame className={className} />;
    case 'track':
      return <Timer className={className} />;
    case 'esports':
      return <Gamepad2 className={className} />;
    case 'shooter':
      return <Crosshair className={className} />;
    case 'chess':
      return <Crown className={className} />;
    case 'table-tennis':
      return <Target className={className} />;
    default:
      return <Medal className={className} />;
  }
};

const campusVenuesData: CampusVenue[] = [
  {
    id: 'wmsu-gym',
    name: 'WMSU Gymnasium (Main Arena)',
    shortName: 'Gymnasium',
    zone: 'Central Sports Complex',
    description: 'Premier indoor multi-sport arena with air cooling, digital scoreboard, and bleacher seating.',
    svgCoords: { x: 310, y: 310 },
    matches: [
      {
        id: 'gm-1',
        sport: 'Basketball Men',
        category: "Men's 5v5 • Elimination Round",
        teamA: 'CCS Venom',
        teamB: 'COE Titans',
        time: '10:00 AM',
        date: 'Today',
        status: 'Live',
        facilitator: 'Santos Carlo',
        facilitatorProgram: 'BSCS',
        coach: 'Ramos Dennis',
        sportType: 'basketball',
      },
      {
        id: 'gm-2',
        sport: 'Basketball Women',
        category: "Women's 5v5 • Quarterfinals",
        teamA: 'CCS Venom',
        teamB: 'CBA Phoenix',
        time: '02:30 PM',
        date: 'Today',
        status: 'Upcoming',
        facilitator: 'Santos Carlo',
        facilitatorProgram: 'BSCS',
        coach: 'Ramos Dennis',
        sportType: 'basketball',
      },
      {
        id: 'gm-3',
        sport: 'Palaro Championship Finals',
        category: "Championship Awarding & Trophy Ceremony",
        teamA: 'CCS Venom',
        teamB: 'All Colleges',
        time: '04:00 PM',
        date: 'Day 5',
        status: 'Upcoming',
        facilitator: 'Bernardo E.',
        facilitatorProgram: 'BSCS',
        coach: 'Faculty Adviser',
        sportType: 'basketball',
      },
    ],
  },
  {
    id: 'covered-court-b',
    name: 'Covered Court B (Multi-Sport)',
    shortName: 'Court B',
    zone: 'South Athletic Quad',
    description: 'High-ceiling all-weather outdoor court dedicated to volleyball and multi-discipline games.',
    svgCoords: { x: 490, y: 260 },
    matches: [
      {
        id: 'gm-4',
        sport: 'Volleyball Women',
        category: "Women's Volleyball • Best of 3",
        teamA: 'CCS Venom',
        teamB: 'CLA Pythons',
        time: '01:30 PM',
        date: 'Today',
        status: 'Upcoming',
        facilitator: 'Gomez Elena',
        facilitatorProgram: 'BSIT',
        coach: 'Gutierrez Bea',
        sportType: 'volleyball',
      },
      {
        id: 'gm-10',
        sport: 'Sepak Takraw',
        category: "Regu Tournament • Elimination",
        teamA: 'CCS Venom',
        teamB: 'CCJE Warriors',
        time: '04:15 PM',
        date: 'Tomorrow',
        status: 'Upcoming',
        facilitator: 'Reyes Marco',
        facilitatorProgram: 'BSIT',
        coach: 'Villanueva Jose',
        sportType: 'sepak-takraw',
      },
    ],
  },
  {
    id: 'grandstand-oval',
    name: 'University Grandstand & Oval',
    shortName: 'Grandstand',
    zone: 'East Athletic Grounds',
    description: 'Full 400m synthetic running oval, football pitch, and bleachers with 8,000 capacity.',
    svgCoords: { x: 570, y: 135 },
    matches: [
      {
        id: 'gm-5',
        sport: 'Football Men',
        category: "Men's 11v11 • Semifinals",
        teamA: 'CCS Venom',
        teamB: 'CLA Panthers',
        time: '08:00 AM',
        date: 'Today',
        status: 'Upcoming',
        facilitator: 'Tan Paolo',
        facilitatorProgram: 'BSCS',
        coach: 'Santiago Marco',
        sportType: 'football',
      },
      {
        id: 'gm-6',
        sport: 'Track & Field',
        category: "100m Sprint & Relay Finals",
        teamA: 'CCS Sprinters',
        teamB: 'All Colleges',
        time: '07:30 AM',
        date: 'Tomorrow',
        status: 'Upcoming',
        facilitator: 'Tan Paolo',
        facilitatorProgram: 'BSCS',
        coach: 'Mendoza Arturo',
        sportType: 'track',
      },
    ],
  },
  {
    id: 'ccs-tech-lab',
    name: 'CCS Building • Computer Lab 3',
    shortName: 'CCS Lab 3',
    zone: 'Tech & Computing Wing',
    description: 'Dedicated high-performance esports arena with gigabit fiber LAN and streaming production.',
    svgCoords: { x: 740, y: 340 },
    matches: [
      {
        id: 'gm-7',
        sport: 'MLBB Esports',
        category: "Mobile Legends 5v5 • Best of 3",
        teamA: 'CCS Venom',
        teamB: 'CTE Scorpions',
        time: '03:45 PM',
        date: 'Today',
        status: 'Upcoming',
        facilitator: 'Abubakar Jamal',
        facilitatorProgram: 'ACT',
        coach: 'De Leon Kyle',
        sportType: 'esports',
      },
      {
        id: 'gm-8',
        sport: 'Valorant Tournament',
        category: "PC Tactical FPS • Bracket Phase",
        teamA: 'CCS Venom',
        teamB: 'COE Titans',
        time: '06:00 PM',
        date: 'Tomorrow',
        status: 'Upcoming',
        facilitator: 'Garcia Luis',
        facilitatorProgram: 'BSCS',
        coach: 'De Leon Kyle',
        sportType: 'shooter',
      },
    ],
  },
  {
    id: 'student-pavilion',
    name: 'Student Center & Activity Pavilion',
    shortName: 'Student Pavilion',
    zone: 'Student Life Quad',
    description: 'Covered open-air student hall hosting mind sports, board games, and table tennis.',
    svgCoords: { x: 190, y: 215 },
    matches: [
      {
        id: 'gm-9',
        sport: 'Chess Masters',
        category: "Classical & Rapid Tournament",
        teamA: 'CCS Venom',
        teamB: 'CSWCD Knights',
        time: '09:00 AM',
        date: 'Today',
        status: 'Upcoming',
        facilitator: 'Dela Cruz Ana',
        facilitatorProgram: 'BSCS',
        coach: 'Soriano Felix',
        sportType: 'chess',
      },
    ],
  },
  {
    id: 'covered-court-a',
    name: 'Covered Court A (Badminton)',
    shortName: 'Court A',
    zone: 'West Athletic Pavilion',
    description: 'Specialized hardwood courts with 4 badminton lanes and electronic scoring consoles.',
    svgCoords: { x: 170, y: 350 },
    matches: [
      {
        id: 'gm-11',
        sport: 'Badminton Doubles',
        category: "Men's Doubles • Quarterfinals",
        teamA: 'CCS Venom',
        teamB: 'CCJE Warriors',
        time: '11:15 AM',
        date: 'Today',
        status: 'Upcoming',
        facilitator: 'Dizon Angelique',
        facilitatorProgram: 'BSIT',
        coach: 'Villanueva Jose',
        sportType: 'badminton',
      },
    ],
  },
];

export const CampusMatchMapCard: React.FC = () => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>('wmsu-gym');
  const [hoveredVenueId, setHoveredVenueId] = useState<string | null>(null);
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileTab, setMobileTab] = useState<'map' | 'details'>('map');

  // Filter venues by sport and search
  const filteredVenues = useMemo(() => {
    return campusVenuesData.filter((venue) => {
      const matchesSport =
        sportFilter === 'all' ||
        venue.matches.some(
          (m) => m.sportType === sportFilter || m.sport.toLowerCase().includes(sportFilter.toLowerCase())
        );

      const matchesSearch =
        searchQuery.trim() === '' ||
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.matches.some(
          (m) =>
            m.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.teamB.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesSport && matchesSearch;
    });
  }, [sportFilter, searchQuery]);

  // Selected venue object
  const selectedVenue = useMemo(() => {
    return (
      campusVenuesData.find((v) => v.id === selectedVenueId) ||
      campusVenuesData[0]
    );
  }, [selectedVenueId]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#c5d8c3] overflow-hidden shadow-sm transition-all duration-300">
      {/* Top Header & Fast Filter Bar */}
      <div className="p-3.5 sm:p-5 border-b border-[#e5efe4] bg-[#f8faf8]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Title and Telemetry */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#edf5ec] text-[#254625] border border-[#c5d8c3] text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wide">
                <MapPin className="w-3 h-3 text-[#355935]" />
                WMSU MAIN CAMPUS
              </span>
              <span className="text-[10.5px] font-mono text-stone-400">
                BALIWASAN // NORMAL ROAD
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-[#142614] tracking-tight uppercase font-display flex items-center gap-2">
              <span>Match Locations & Venues</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1f381f] text-white">
                {campusVenuesData.length} Venues
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5">
              Interactive GPS campus pinpoint locator for all Palaro tournament events.
            </p>
          </div>

          {/* Search & Sport Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-44 min-w-[130px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search venue or sport..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs font-sans rounded-xl border border-[#c5d8c3] bg-white text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#355935]"
              />
            </div>

            {/* Sport Quick Selector */}
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-mono font-semibold rounded-xl border border-[#c5d8c3] bg-white text-[#1f381f] focus:outline-none focus:border-[#355935] cursor-pointer"
            >
              <option value="all">All Sports</option>
              <option value="basketball">Basketball</option>
              <option value="volleyball">Volleyball</option>
              <option value="football">Football</option>
              <option value="track">Track & Field</option>
              <option value="esports">Esports (MLBB/Valorant)</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
            </select>
          </div>
        </div>

        {/* Mobile View Toggle Switcher (Prioritizes Mobile Navigation) */}
        <div className="flex md:hidden items-center gap-1 mt-3 bg-[#eef4ee] p-1 rounded-xl border border-[#c5d8c3]">
          <button
            type="button"
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'map'
                ? 'bg-[#1f381f] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Interactive Campus Map</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('details')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'details'
                ? 'bg-[#1f381f] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Venue Matches ({selectedVenue.matches.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Map Canvas + Venue Match Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e5efe4]">
        {/* LEFT: SVG Interactive Campus Vector Map */}
        <div
          className={`lg:col-span-7 p-3 sm:p-5 flex flex-col justify-between bg-[#f2f7f1]/60 ${
            mobileTab === 'details' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Map Surface Viewport */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#edf4ec] rounded-2xl border border-[#c5d8c3] overflow-hidden shadow-inner flex items-center justify-center">
            {/* SVG MAP VISUAL */}
            <svg
              viewBox="0 0 900 520"
              className="w-full h-full select-none cursor-grab active:cursor-grabbing"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="campus-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e5d4" strokeWidth="0.8" />
                </pattern>
                <linearGradient id="gym-roof" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#355935" />
                  <stop offset="100%" stopColor="#1f381f" />
                </linearGradient>
              </defs>

              {/* Campus Base Green Grass Surface */}
              <rect x="0" y="0" width="900" height="520" fill="#e8f3e7" />
              <rect x="0" y="0" width="900" height="520" fill="url(#campus-grid)" opacity="0.6" />

              {/* Normal Road (Main Highway South) */}
              <path d="M 10 470 L 890 470" stroke="#d3ded2" strokeWidth="32" strokeLinecap="round" />
              <path d="M 10 470 L 890 470" stroke="#ffffff" strokeWidth="2" strokeDasharray="14 10" />
              <text x="450" y="474" fill="#6d886c" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                NORMAL ROAD (MAIN HIGHWAY ENTRANCE)
              </text>

              {/* Baliwasan Ave (West) */}
              <path d="M 60 10 L 60 510" stroke="#d3ded2" strokeWidth="22" strokeLinecap="round" />
              <text x="36" y="260" fill="#789078" fontSize="10" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 36 260)" textAnchor="middle">
                BALIWASAN UNIVERSITY AVENUE
              </text>

              {/* Internal Campus Drive Loops */}
              <path d="M 100 450 Q 250 430 450 440 T 800 450" fill="none" stroke="#cddccd" strokeWidth="14" strokeLinecap="round" />
              <path d="M 310 440 L 310 380 Q 310 350 350 350 L 530 350 Q 580 350 580 280 L 580 180" fill="none" stroke="#cddccd" strokeWidth="12" strokeLinecap="round" />

              {/* Central Admin Quadrangle */}
              <rect x="230" y="380" width="160" height="50" rx="10" fill="#d9ebd8" stroke="#bcd4bb" strokeWidth="1.5" />
              <text x="310" y="410" fill="#4d734c" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Admin Quadrangle
              </text>

              {/* Campus Gates */}
              <g transform="translate(450, 480)">
                <rect x="-35" y="-10" width="70" height="20" rx="5" fill="#1f381f" />
                <text x="0" y="3" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  GATE 1
                </text>
              </g>

              <g transform="translate(140, 480)">
                <rect x="-32" y="-10" width="64" height="20" rx="5" fill="#355935" />
                <text x="0" y="3" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  GATE 2
                </text>
              </g>

              <g transform="translate(760, 480)">
                <rect x="-32" y="-10" width="64" height="20" rx="5" fill="#355935" />
                <text x="0" y="3" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  GATE 3
                </text>
              </g>

              {/* 1. Grandstand & Track Oval */}
              <g transform="translate(570, 135)">
                <ellipse cx="0" cy="0" rx="145" ry="72" fill="#fde68a" stroke="#d97706" strokeWidth="12" />
                <ellipse cx="0" cy="0" rx="130" ry="58" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 4" />
                <ellipse cx="0" cy="0" rx="115" ry="46" fill="#4ade80" stroke="#22c55e" strokeWidth="2" />
                <rect x="-55" y="-24" width="110" height="48" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <text x="0" y="4" fill="#14532d" fontSize="10.5" fontFamily="display" fontWeight="900" textAnchor="middle">
                  WMSU GRANDSTAND OVAL
                </text>
              </g>

              {/* 2. WMSU Gymnasium Graphic */}
              <g transform="translate(310, 310)">
                <rect x="-85" y="-55" width="170" height="110" rx="14" fill="url(#gym-roof)" stroke="#5d8c55" strokeWidth="2.5" />
                <rect x="-65" y="-40" width="130" height="80" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="16" fill="none" stroke="#d97706" strokeWidth="1.5" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#d97706" strokeWidth="1.5" />
                <text x="0" y="-44" fill="#ffffff" fontSize="10" fontFamily="display" fontWeight="800" textAnchor="middle">
                  WMSU GYMNASIUM
                </text>
              </g>

              {/* 3. Covered Court B */}
              <g transform="translate(490, 260)">
                <rect x="-65" y="-45" width="130" height="90" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                <rect x="-50" y="-32" width="100" height="64" rx="6" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.2" />
                <line x1="0" y1="-32" x2="0" y2="32" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="-36" fill="#0369a1" fontSize="9.5" fontFamily="display" fontWeight="800" textAnchor="middle">
                  COVERED COURT B
                </text>
              </g>

              {/* 4. CCS Building Complex */}
              <g transform="translate(740, 340)">
                <rect x="-75" y="-50" width="150" height="100" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
                <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#1f381f" />
                <text x="0" y="-5" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                  CCS COMPLEX
                </text>
                <text x="0" y="14" fill="#a7f3d0" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  LAB 3 • ESPORTS HUB
                </text>
              </g>

              {/* 5. Student Pavilion */}
              <g transform="translate(190, 215)">
                <circle cx="0" cy="0" r="48" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2" />
                <circle cx="0" cy="0" r="36" fill="#fae8ff" stroke="#a855f7" strokeWidth="1.5" />
                <text x="0" y="-3" fill="#7e22ce" fontSize="10" fontFamily="display" fontWeight="800" textAnchor="middle">
                  STUDENT
                </text>
                <text x="0" y="12" fill="#7e22ce" fontSize="9" fontFamily="display" fontWeight="800" textAnchor="middle">
                  PAVILION
                </text>
              </g>

              {/* 6. Covered Court A */}
              <g transform="translate(170, 350)">
                <rect x="-55" y="-35" width="110" height="70" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
                <text x="0" y="4" fill="#854d0e" fontSize="9" fontFamily="display" fontWeight="800" textAnchor="middle">
                  COVERED COURT A
                </text>
              </g>

              {/* Other Landmark Buildings */}
              <g transform="translate(360, 160)">
                <rect x="-38" y="-20" width="76" height="40" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <text x="0" y="3" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  COE BLDG
                </text>
              </g>
              <g transform="translate(730, 170)">
                <rect x="-40" y="-20" width="80" height="40" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <text x="0" y="3" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  CTE BLDG
                </text>
              </g>

              {/* PINPOINT MARKERS */}
              {campusVenuesData.map((venue) => {
                const isSelected = selectedVenueId === venue.id;
                const isHovered = hoveredVenueId === venue.id;
                const hasLiveMatch = venue.matches.some((m) => m.status === 'Live');
                const nextMatch = venue.matches[0];

                return (
                  <g
                    key={venue.id}
                    transform={`translate(${venue.svgCoords.x}, ${venue.svgCoords.y - 12})`}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => {
                      setSelectedVenueId(venue.id);
                      setMobileTab('details');
                    }}
                    onMouseEnter={() => setHoveredVenueId(venue.id)}
                    onMouseLeave={() => setHoveredVenueId(null)}
                  >
                    {/* Invisible Mobile Touch Circle */}
                    <circle cx="0" cy="-8" r="44" fill="transparent" />

                    {/* Glowing Live Ping */}
                    {hasLiveMatch && (
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 42 : 30}
                        className="animate-ping pointer-events-none"
                        fill="rgba(245, 158, 11, 0.45)"
                      />
                    )}

                    {/* Selected Halo */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 36 : 28}
                        fill="none"
                        stroke={hasLiveMatch ? '#f59e0b' : '#355935'}
                        strokeWidth="3.5"
                        className="pointer-events-none"
                      />
                    )}

                    {/* Pin Marker Shape */}
                    <path
                      d="M 0 -34 C -18 -34 -18 -10 0 18 C 18 -10 18 -34 0 -34 Z"
                      fill={
                        isSelected
                          ? hasLiveMatch
                            ? '#d97706'
                            : '#1f381f'
                          : hasLiveMatch
                          ? '#f59e0b'
                          : '#355935'
                      }
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="filter drop-shadow-md pointer-events-none"
                    />

                    {/* Sport Vector Icon inside Pin */}
                    <foreignObject
                      x="-8"
                      y={isSelected ? -25 : -22}
                      width="16"
                      height="16"
                      className="pointer-events-none select-none"
                    >
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <SportIcon
                          type={nextMatch?.sportType || 'basketball'}
                          className="w-3.5 h-3.5 text-white"
                        />
                      </div>
                    </foreignObject>

                    {/* Venue Tag Pill */}
                    <g
                      transform={`translate(0, ${isSelected ? -48 : -42})`}
                      className="pointer-events-none select-none"
                    >
                      <rect
                        x="-50"
                        y="-12"
                        width="100"
                        height="20"
                        rx="10"
                        fill={isSelected ? '#142614' : 'rgba(255, 255, 255, 0.95)'}
                        stroke={isSelected ? '#5d8c55' : '#c5d8c3'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="2"
                        fill={isSelected ? '#ffffff' : '#142614'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {venue.shortName.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Fast Venue Picker (Horizontal scroll for mobile thumbs) */}
          <div className="pt-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
              <span className="text-[9.5px] font-mono font-bold text-stone-400 uppercase shrink-0 mr-0.5 flex items-center gap-1">
                <Layers className="w-3 h-3" /> Venues:
              </span>
              {campusVenuesData.map((v) => {
                const isSelected = selectedVenueId === v.id;
                const isLive = v.matches.some((m) => m.status === 'Live');
                const firstMatch = v.matches[0];

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVenueId(v.id)}
                    className={`min-h-[32px] px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1f381f] text-white border-[#1f381f] shadow-xs'
                        : 'bg-white text-stone-700 border-[#c5d8c3] hover:border-[#5d8c55]'
                    }`}
                  >
                    <SportIcon
                      type={firstMatch?.sportType || 'basketball'}
                      className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#355935]'}`}
                    />
                    <span className="truncate">{v.shortName}</span>
                    {isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Selected Venue & Upcoming Matches Showcase */}
        <div
          className={`lg:col-span-5 p-3.5 sm:p-5 flex flex-col justify-between bg-white ${
            mobileTab === 'map' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Venue Overview Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[10.5px] font-mono text-[#5d8c55] font-bold uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-[#5d8c55]" />
                  {selectedVenue.zone}
                </span>

                {selectedVenue.matches.some((m) => m.status === 'Live') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[9.5px] font-mono font-bold shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    LIVE NOW
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#142614] font-display leading-tight">
                {selectedVenue.name}
              </h3>

              {/* Day Indicator */}
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#254625] font-bold bg-[#edf5ec] border border-[#c5d8c3] px-2 py-0.5 rounded-md">
                  <Calendar className="w-3 h-3 text-[#5d8c55]" />
                  Day 2 of 5 • Palaro 2026
                </span>
                <span className="text-[10.5px] font-mono text-stone-400">• Thursday, Sep 10</span>
              </div>
            </div>

            {/* Matches Scheduled at This Venue */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] sm:text-xs font-mono font-bold text-[#1f381f] uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-3 h-3 text-[#5d8c55]" />
                  Upcoming Matches ({selectedVenue.matches.length})
                </h4>
                <span className="text-[9.5px] font-mono text-stone-400">Palaro 2026</span>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                {selectedVenue.matches.map((match) => {
                  const isLive = match.status === 'Live';

                  return (
                    <div
                      key={match.id}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all ${
                        isLive
                          ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                          : 'bg-[#fbfcfb] border-[#e2ece0] hover:border-[#5d8c55]'
                      }`}
                    >
                      {/* Top Sport & Status */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className="text-xs sm:text-[13px] font-black text-[#142614] font-display truncate">
                          {match.sport}
                        </span>

                        <div className="shrink-0 flex items-center gap-1">
                          {isLive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono font-bold text-[9px] sm:text-[9.5px]">
                              <Play className="w-2 h-2 fill-white" />
                              IN PROGRESS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#edf5ec] text-[#254625] font-mono font-bold text-[9px] sm:text-[9.5px]">
                              <Clock className="w-2.5 h-2.5 text-[#355935]" />
                              {match.time}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Opponent Matchup (Responsive to mobile screens) */}
                      <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs py-1.5 px-2.5 rounded-lg sm:rounded-xl bg-white border border-[#e5efe4] font-mono">
                        <span className="font-bold text-[#1f381f] truncate max-w-[44%]">{match.teamA}</span>
                        <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase font-semibold shrink-0">VS</span>
                        <span className="font-bold text-amber-900 truncate max-w-[44%] text-right">{match.teamB}</span>
                      </div>

                      {/* Facilitator Info (Coach removed per user request) */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pt-1.5 mt-1 border-t border-[#f0f4ef]">
                        <span className="truncate">
                          Facilitator: <span className="text-[#142614] font-semibold">{match.facilitator} ({match.facilitatorProgram})</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Card Navigation & Summary */}
          <div className="mt-3 pt-2.5 border-t border-[#e5efe4] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1 text-stone-500">
              <Sparkles className="w-3 h-3 text-[#5d8c55]" />
              <span className="text-[10px] sm:text-[11px]">Tap pin to view venue matches</span>
            </div>

            <span className="text-[10px] sm:text-[10.5px] font-bold text-[#254625] uppercase tracking-wide">
              {filteredVenues.length} Venues Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMatchMapCard;

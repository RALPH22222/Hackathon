import React, { useState, useMemo } from 'react';
import { 
  Users, 
  MapPin, 
  Megaphone, 
  Check, 
  Flame, 
  Radio, 
  Send, 
  X, 
  Plus, 
  Clock, 
  Share2, 
  Activity, 
  MessageSquarePlus 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// College Logos
import ccsLogo from '../assets/CCS.png';
import coeLogo from '../assets/coe.png';
import claLogo from '../assets/cla.png';
import cteLogo from '../assets/cte.png';
import crimLogo from '../assets/crim.png';
import swLogo from '../assets/sw.png';

interface GameBackup {
  id: string;
  sport: string;
  category: 'basketball' | 'volleyball' | 'esports' | 'other';
  code: string;
  opponent: string;
  opponentCollege: string;
  opponentLogo: string;
  venue: string;
  startTime: string;
  urgency: 'Critical' | 'High' | 'Moderate';
  supportersGoing: number;
  supportersGoal: number;
  hasJoined?: boolean;
  backupRequested?: boolean;
  backupReason?: string;
  backupAuthor?: string;
  backupTime?: string;
}

const INITIAL_GAMES: GameBackup[] = [
  {
    id: 'game-1',
    sport: 'Basketball (Men)',
    category: 'basketball',
    code: 'BB-M-FINALS',
    opponent: 'COE Titans',
    opponentCollege: 'College of Engineering',
    opponentLogo: coeLogo,
    venue: 'WMSU Gym • Court A',
    startTime: 'Today • 2:00 PM',
    urgency: 'Critical',
    supportersGoing: 58,
    supportersGoal: 85,
    hasJoined: false,
    backupRequested: true,
    backupReason: 'COE student section is deafening and game is coming down to the wire! We need all CCS students to flood Court A and make noise on defense!',
    backupAuthor: 'Pythons Cheer Squad',
    backupTime: '3m ago',
  },
  {
    id: 'game-2',
    sport: 'Volleyball (Women)',
    category: 'volleyball',
    code: 'VB-W-SEMIS',
    opponent: 'CLA Phoenix',
    opponentCollege: 'College of Liberal Arts',
    opponentLogo: claLogo,
    venue: 'Covered Court B',
    startTime: 'Today • 4:30 PM',
    urgency: 'High',
    supportersGoing: 34,
    supportersGoal: 60,
    hasJoined: false,
    backupRequested: false,
  },
  {
    id: 'game-3',
    sport: 'MLBB Esports',
    category: 'esports',
    code: 'ESP-ML-R3',
    opponent: 'CBA Vipers',
    opponentCollege: 'College of Business Admin',
    opponentLogo: cteLogo,
    venue: 'CCS Computer Lab 3',
    startTime: 'Today • 6:00 PM',
    urgency: 'Moderate',
    supportersGoing: 45,
    supportersGoal: 70,
    hasJoined: false,
    backupRequested: false,
  },
];

const QUICK_REASON_PRESETS = [
  '📣 Opponent crowd is louder! Need volume now!',
  '🔥 Clutch moments! Need Pythons hype!',
  '⚠️ Hostile crowd chanting, team needs energy!',
  '🏆 Deciding match! Come rally with us!',
  '🥁 Need drums & chants at the sideline!',
  '⚡ Stand up and make noise for CCS Pythons!',
];

// Simple, noticeable athletic micro-stripe patterns for card outlines
const PATTERN_RED = {
  backgroundImage: 'repeating-linear-gradient(-45deg, #b91c1c, #b91c1c 4px, #ef4444 4px, #ef4444 8px)',
};

const PATTERN_AMBER = {
  backgroundImage: 'repeating-linear-gradient(-45deg, #b45309, #b45309 4px, #f59e0b 4px, #f59e0b 8px)',
};

const PATTERN_GREEN = {
  backgroundImage: 'repeating-linear-gradient(-45deg, #1a331a, #1a331a 4px, #355935 4px, #355935 8px)',
};

/**
 * AutoSlideText: If the text is wider than its container and getting cut off,
 * it smoothly and slowly slides horizontally back and forth to reveal the full text.
 */
function AutoSlideText({
  text,
  className = '',
  maxWidth = '115px',
}: {
  text: string;
  className?: string;
  maxWidth?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [overflowDistance, setOverflowDistance] = React.useState(0);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const diff = textRef.current.scrollWidth - containerRef.current.clientWidth;
        setOverflowDistance(diff > 3 ? diff : 0);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    const timer = setTimeout(checkOverflow, 120);
    return () => {
      window.removeEventListener('resize', checkOverflow);
      clearTimeout(timer);
    };
  }, [text, maxWidth]);

  const duration = Math.max(5, Math.round(overflowDistance * 0.15));

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap block ${className}`}
      style={{ maxWidth }}
      title={text}
    >
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
        style={
          overflowDistance > 0
            ? {
                animation: `auto-slide-reveal ${duration}s ease-in-out infinite alternate`,
                ['--slide-dist' as string]: `-${overflowDistance + 6}px`,
              }
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
}

export function BackupRequest() {
  const [games, setGames] = useState<GameBackup[]>(INITIAL_GAMES);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'basketball' | 'volleyball' | 'esports'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Backup Request Dialog State
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameBackup | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [customUrgency, setCustomUrgency] = useState<'Critical' | 'High' | 'Moderate'>('Critical');
  const [authorAlias, setAuthorAlias] = useState('');

  // New Match Callout State
  const [isNewMatchModalOpen, setIsNewMatchModalOpen] = useState(false);
  const [newSport, setNewSport] = useState('');
  const [newOpponent, setNewOpponent] = useState('COE Titans');
  const [newVenue, setNewVenue] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newUrgency, setNewUrgency] = useState<'Critical' | 'High' | 'Moderate'>('High');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      if (selectedFilter === 'critical') return game.urgency === 'Critical' || game.backupRequested;
      if (selectedFilter === 'basketball') return game.category === 'basketball';
      if (selectedFilter === 'volleyball') return game.category === 'volleyball';
      if (selectedFilter === 'esports') return game.category === 'esports';
      return true;
    });
  }, [games, selectedFilter]);

  // Overall Statistics
  const totalSupporters = useMemo(() => {
    return games.reduce((acc, g) => acc + g.supportersGoing, 0);
  }, [games]);

  const activeAlertsCount = useMemo(() => {
    return games.filter(g => g.backupRequested).length;
  }, [games]);

  // Toggle Going with celebratory micro-confetti
  const handleToggleGoing = (gameId: string) => {
    setGames(prev =>
      prev.map(game => {
        if (game.id === gameId) {
          const nextJoined = !game.hasJoined;
          if (nextJoined) {
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.85 },
              colors: ['#355935', '#5d8c55', '#22c55e', '#ffffff'],
            });
            showToast(`RALLY CONFIRMED: You are supporting ${game.sport}! 🐍`);
          }
          return {
            ...game,
            hasJoined: nextJoined,
            supportersGoing: nextJoined ? game.supportersGoing + 1 : game.supportersGoing - 1,
          };
        }
        return game;
      })
    );
  };

  // Open Backup Modal
  const openBackupDialog = (game: GameBackup) => {
    setSelectedGame(game);
    setCustomReason(game.backupReason || '');
    setCustomUrgency(game.urgency || 'Critical');
    setAuthorAlias(game.backupAuthor || 'CCS Supporter');
    setIsBackupModalOpen(true);
  };

  // Submit typed reason for backup
  const handleSubmitBackup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame) return;

    const trimmedReason = customReason.trim();
    const finalReason = trimmedReason.length > 0 
      ? trimmedReason 
      : 'Urgent crowd reinforcement requested! Need CCS voices right now!';

    setGames(prev =>
      prev.map(game => {
        if (game.id === selectedGame.id) {
          return {
            ...game,
            backupRequested: true,
            urgency: customUrgency,
            backupReason: finalReason,
            backupAuthor: authorAlias.trim() || 'Pythons Section',
            backupTime: 'Just now',
            supportersGoing: game.hasJoined ? game.supportersGoing : game.supportersGoing + 1,
            hasJoined: true,
          };
        }
        return game;
      })
    );

    setIsBackupModalOpen(false);
    showToast(`DISPATCH BROADCASTED: Alert deployed for ${selectedGame.sport}! 🚨`);
  };

  // Add Preset phrase
  const handleSelectPreset = (preset: string) => {
    setCustomReason(prev => {
      if (!prev.trim()) return preset;
      return `${prev} • ${preset}`;
    });
  };

  // Handle New Match Dispatch
  const handleCreateNewMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSport || !newVenue) return;

    const newGameEntry: GameBackup = {
      id: `game-${Date.now()}`,
      sport: newSport,
      category: newSport.toLowerCase().includes('basket') ? 'basketball' : newSport.toLowerCase().includes('volley') ? 'volleyball' : newSport.toLowerCase().includes('esport') ? 'esports' : 'other',
      code: `LIVE-${Math.floor(100 + Math.random() * 900)}`,
      opponent: newOpponent,
      opponentCollege: 'Opponent Division',
      opponentLogo: newOpponent.includes('Titan') ? coeLogo : newOpponent.includes('Phoenix') ? claLogo : (newOpponent.includes('CCJE') || newOpponent.includes('Enforcer')) ? crimLogo : newOpponent.includes('CTE') ? cteLogo : swLogo,
      venue: newVenue,
      startTime: newStartTime || 'Today • Live',
      urgency: newUrgency,
      supportersGoing: 1,
      supportersGoal: 50,
      hasJoined: true,
      backupRequested: true,
      backupReason: newReason.trim() || 'Urgent reinforcement requested for our athletes!',
      backupAuthor: 'On-site Fan',
      backupTime: 'Just now',
    };

    setGames(prev => [newGameEntry, ...prev]);
    setIsNewMatchModalOpen(false);
    setNewSport('');
    setNewVenue('');
    setNewStartTime('');
    setNewReason('');
    showToast(`NEW MATCH DISPATCH: Backup requested for ${newGameEntry.sport}! 🚨`);
  };

  return (
    <div className="relative space-y-3 sm:space-y-4 max-w-4xl mx-auto pb-28 sm:pb-12">
      {/* Computer Science Grid Background (like in the Login page) */}
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

      {/* Scoped Keyframes for Auto-Sliding Text Overflow */}
      <style>{`
        @keyframes auto-slide-reveal {
          0%, 25% {
            transform: translateX(0);
          }
          75%, 100% {
            transform: translateX(var(--slide-dist, 0px));
          }
        }
      `}</style>

      {/* Mobile Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-11/12 max-w-md z-50 bg-[#142614] border border-[#355935] text-white px-3.5 py-2.5 rounded-xl shadow-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span className="font-semibold tracking-wide truncate">{toastMessage}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)}
            className="text-stone-300 hover:text-white p-1 ml-2 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Telemetry Header (Mobile Optimized) */}
      <div className="relative z-10 bg-white rounded-2xl border border-[#c5d8c3] p-3.5 sm:p-5 shadow-xs">
        {/* Top Telemetry Strip */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono border-b border-[#e5efe4] pb-2 sm:pb-3 mb-2.5 sm:mb-3.5">
          <div className="flex items-center gap-1.5 text-[#355935]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span className="font-bold tracking-wider uppercase truncate">SYS.TELEMETRY // DISPATCH</span>
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
                TACTICAL OPS
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-mono">CODE: PYTHONS-CROWD</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-[#142614] tracking-tight uppercase font-display mt-0.5 sm:mt-1 flex items-center gap-2">
              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-[#355935] shrink-0" />
              Arena Crowd Dispatch
            </h1>
            <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 sm:mt-1 max-w-xl leading-relaxed">
              Monitor real-time crowd pressure, rally CCS Pythons student battalions, or dispatch emergency backup calls with custom tactical field reports.
            </p>
          </div>

          {/* Call Backup CTA Button */}
          <div className="sm:self-center shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsNewMatchModalOpen(true)}
              className="w-full sm:w-auto px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#1f381f] text-white hover:bg-[#2c522c] text-xs font-bold font-mono uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#355935] shadow-xs active:scale-98"
            >
              <Plus className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Broadcast Callout</span>
            </button>
          </div>
        </div>

        {/* HUD Metrics Bar */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 pt-2.5 sm:pt-3 border-t border-[#e5efe4] text-center font-mono">
          <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-1.5 sm:p-2">
            <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block truncate">Active Matches</span>
            <span className="text-xs sm:text-base font-bold text-[#142614] block truncate">{games.length} ARENAS</span>
          </div>
          <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-1.5 sm:p-2">
            <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block truncate">Total Rallied</span>
            <span className="text-xs sm:text-base font-bold text-[#355935] block truncate">{totalSupporters} SUPPORTERS</span>
          </div>
          <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-1.5 sm:p-2">
            <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block truncate">Urgent Calls</span>
            <span className="text-xs sm:text-base font-bold text-amber-700 flex items-center justify-center gap-0.5 truncate">
              <Flame className="w-3 h-3 text-amber-600 shrink-0" />
              {activeAlertsCount} ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs - Responsive with Desktop Counter */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white border border-[#c5d8c3] rounded-xl shadow-xs overflow-x-auto pb-1 scrollbar-none touch-pan-x">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#edf5ec]'
            }`}
          >
            [ALL SQUADS]
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('critical')}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
              selectedFilter === 'critical'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-red-700 hover:bg-red-50'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>CRITICAL ONLY</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('basketball')}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'basketball'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#edf5ec]'
            }`}
          >
            BASKETBALL
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('volleyball')}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'volleyball'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#edf5ec]'
            }`}
          >
            VOLLEYBALL
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('esports')}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'esports'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#edf5ec]'
            }`}
          >
            ESPORTS
          </button>
        </div>

        <span className="text-[11px] font-mono text-stone-500 hidden sm:inline shrink-0">
          SHOWING {filteredGames.length} OF {games.length} MATCHES
        </span>
      </div>

      {/* Game Cards List with Responsive Layouts */}
      <div className="relative z-10 space-y-3 sm:space-y-3.5">
        {filteredGames.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#c5d8c3] p-8 text-center font-mono">
            <Activity className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-700">NO ACTIVE CALLOUTS UNDER THIS FILTER</p>
            <p className="text-xs text-stone-500 mt-1">Switch filter or broadcast a new match dispatch.</p>
          </div>
        ) : (
          filteredGames.map(game => {
            const crowdPercent = Math.min(100, Math.round((game.supportersGoing / game.supportersGoal) * 100));
            const isAlertActive = game.backupRequested;

            return (
              <div
                key={game.id}
                className={`overflow-hidden bg-white rounded-2xl border transition-all shadow-xs ${
                  isAlertActive 
                    ? game.urgency === 'Critical'
                      ? 'border-red-400 ring-1 ring-red-200'
                      : 'border-amber-400 ring-1 ring-amber-200'
                    : 'border-[#c5d8c3] hover:border-[#355935]'
                }`}
              >
                {/* Simple Noticeable Pattern Accent Strip */}
                <div 
                  className="h-1.5 w-full"
                  style={
                    isAlertActive && game.urgency === 'Critical'
                      ? PATTERN_RED
                      : isAlertActive
                      ? PATTERN_AMBER
                      : PATTERN_GREEN
                  }
                />

                <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-3.5">
                  {/* Top Header: Code, Sport, Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 shrink-0">
                        {game.code}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#142614] font-display uppercase tracking-wide truncate">
                        {game.sport}
                      </span>
                    </div>

                    {/* Urgency Badge */}
                    <div className="shrink-0">
                      {isAlertActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
                          <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600 shrink-0" />
                          <span>BACKUP DISPATCHED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold bg-[#edf5ec] text-[#254625] border border-[#c5d8c3]">
                          <Activity className="w-2.5 h-2.5 text-[#355935] shrink-0" />
                          <span>STANDBY</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Teams Matchup Card: Desktop & Mobile Responsive */}
                  <div className="bg-[#f7faf6] border border-[#e0ece0] rounded-xl p-3 sm:p-3.5">
                    {/* 1. Desktop Layout (sm:flex) */}
                    <div className="hidden sm:flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                        {/* CCS Pythons */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center border border-stone-200 shadow-xs shrink-0">
                            <img src={ccsLogo} alt="CCS" className="w-7 h-7 object-contain" />
                          </div>
                          <div>
                            <span className="text-sm font-black text-[#142614] font-display uppercase tracking-wider block">
                              CCS PYTHONS
                            </span>
                            <span className="text-[10px] font-mono text-stone-500">HOME SQUAD</span>
                          </div>
                        </div>

                        {/* VS Divider */}
                        <div className="px-2 py-1 bg-white border border-[#c5d8c3] rounded text-[10px] font-mono font-bold text-stone-400 shrink-0">
                          VS
                        </div>

                        {/* Opponent */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center border border-stone-200 shadow-xs shrink-0">
                            <img src={game.opponentLogo} alt={game.opponent} className="w-7 h-7 object-contain" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-sm font-bold text-stone-800 font-display uppercase tracking-wider block truncate">
                              {game.opponent}
                            </span>
                            <AutoSlideText 
                              text={game.opponentCollege} 
                              className="text-[10px] font-mono text-stone-500" 
                              maxWidth="140px" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Location & Game Start Time */}
                      <div className="text-right font-mono shrink-0">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#c5d8c3] text-[#1f381f] font-semibold text-xs">
                          <Clock className="w-3.5 h-3.5 text-[#355935]" />
                          <span>{game.startTime}</span>
                        </div>
                        <div className="text-xs text-stone-600 flex items-center justify-end gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#5d8c55]" />
                          <AutoSlideText text={game.venue} maxWidth="160px" />
                        </div>
                      </div>
                    </div>

                    {/* 2. Mobile Layout (sm:hidden) */}
                    <div className="sm:hidden space-y-2">
                      <div className="grid grid-cols-11 items-center gap-1">
                        {/* Left: CCS Pythons (5 cols) */}
                        <div className="col-span-5 flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center border border-stone-200 shadow-xs shrink-0">
                            <img src={ccsLogo} alt="CCS" className="w-6 h-6 object-contain" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-black text-[#142614] font-display uppercase tracking-wider block truncate">
                              CCS PYTHONS
                            </span>
                            <span className="text-[9px] font-mono text-stone-500 block">HOME</span>
                          </div>
                        </div>

                        {/* VS Divider (1 col) */}
                        <div className="col-span-1 text-center font-mono text-[10px] font-bold text-stone-400">
                          VS
                        </div>

                        {/* Right: Opponent (5 cols) */}
                        <div className="col-span-5 flex items-center justify-end text-right gap-2 min-w-0">
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-stone-800 font-display uppercase tracking-wider block truncate">
                              {game.opponent}
                            </span>
                            <AutoSlideText 
                              text={game.opponentCollege} 
                              className="text-[9px] font-mono text-stone-500" 
                              maxWidth="100px" 
                            />
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center border border-stone-200 shadow-xs shrink-0">
                            <img src={game.opponentLogo} alt={game.opponent} className="w-6 h-6 object-contain" />
                          </div>
                        </div>
                      </div>

                      {/* Sub-row: Start Time & Venue */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-[#e5efe4] text-xs font-mono">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-[#c5d8c3] text-[#1f381f] font-semibold text-[10px] shrink-0">
                          <Clock className="w-3 h-3 text-[#355935] shrink-0" />
                          <span>{game.startTime}</span>
                        </div>
                        <div className="text-[10px] text-stone-600 flex items-center gap-1 min-w-0">
                          <MapPin className="w-3 h-3 text-[#5d8c55] shrink-0" />
                          <AutoSlideText text={game.venue} maxWidth="135px" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FIELD TRANSMISSION: The User's Reason Why Backup is Needed */}
                  {isAlertActive && game.backupReason && (
                    <div className="bg-[#fffdfa] border border-amber-300 rounded-xl p-2.5 sm:p-3.5 space-y-1 sm:space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
                        <div className="flex items-center gap-1 sm:gap-1.5 text-amber-900 font-bold uppercase tracking-wider">
                          <Radio className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>FIELD DISPATCH REPORT // REASON FOR CALLOUT</span>
                        </div>
                        <span className="text-amber-800/70">
                          {game.backupTime || 'Active'}
                        </span>
                      </div>

                      {/* Custom reason typed by user */}
                      <p className="text-xs sm:text-[13px] text-stone-900 font-medium leading-relaxed pl-2 border-l-2 border-amber-500 italic">
                        "{game.backupReason}"
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[9px] sm:text-[10px] font-mono text-stone-500">
                        <span className="text-amber-800">
                          DISPATCHED BY: <strong>{game.backupAuthor || 'CCS Supporter'}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => openBackupDialog(game)}
                          className="text-stone-700 hover:text-stone-950 underline font-semibold cursor-pointer shrink-0"
                        >
                          [Update Reason / Dispatch]
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Crowd Quota Bar & Live Attendance */}
                  <div className="space-y-1 font-mono text-[10px] sm:text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-stone-600">
                        <Users className="w-3.5 h-3.5 text-[#355935] shrink-0" />
                        <span>CCS BATTALION: <strong className="text-[#142614]">{game.supportersGoing}</strong> / {game.supportersGoal} Target</span>
                      </span>
                      <span className="font-bold text-[#355935]">{crowdPercent}% MOBILIZED</span>
                    </div>

                    <div className="w-full h-1.5 bg-[#edf5ec] rounded-full overflow-hidden border border-[#c5d8c3]/40">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          crowdPercent >= 80 ? 'bg-[#22c55e]' : crowdPercent >= 50 ? 'bg-[#355935]' : 'bg-[#5d8c55]'
                        }`}
                        style={{ width: `${crowdPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Desktop Action Bar */}
                  <div className="hidden sm:flex items-center justify-between gap-2 pt-2 border-t border-[#eaf2e8]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openBackupDialog(game)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                          isAlertActive
                            ? 'bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100'
                            : 'bg-white border border-stone-300 text-stone-800 hover:border-amber-400 hover:text-amber-800'
                        }`}
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{isAlertActive ? 'Edit Backup Reason' : 'Call Backup + Reason'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          showToast(`COPIED DISPATCH: Link to ${game.sport} copied to clipboard!`);
                        }}
                        className="p-1.5 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 text-xs transition-colors cursor-pointer"
                        title="Share Match Callout"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* I'm Going Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleGoing(game.id)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                        game.hasJoined
                          ? 'bg-[#142614] text-[#22c55e] border border-[#355935]'
                          : 'bg-[#355935] hover:bg-[#274427] text-white'
                      }`}
                    >
                      {game.hasJoined ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                          <span>GOING TO ARENA</span>
                        </>
                      ) : (
                        <>
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span>I'M GOING TO SUPPORT</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mobile Action Bar */}
                  <div className="grid grid-cols-12 gap-1.5 sm:hidden pt-2 border-t border-[#eaf2e8]">
                    <button
                      type="button"
                      onClick={() => openBackupDialog(game)}
                      className={`col-span-5 px-2 py-2 rounded-xl text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                        isAlertActive
                          ? 'bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100'
                          : 'bg-white border border-stone-300 text-stone-800 hover:border-amber-400 hover:text-amber-800'
                      }`}
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{isAlertActive ? 'Edit Reason' : 'Call Backup'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        showToast(`COPIED: Link to ${game.sport} copied!`);
                      }}
                      className="col-span-2 p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 text-xs flex items-center justify-center transition-colors cursor-pointer"
                      title="Share Match Callout"
                    >
                      <Share2 className="w-3.5 h-3.5 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleGoing(game.id)}
                      className={`col-span-5 px-2 py-2 rounded-xl text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                        game.hasJoined
                          ? 'bg-[#142614] text-[#22c55e] border border-[#355935]'
                          : 'bg-[#355935] hover:bg-[#274427] text-white'
                      }`}
                    >
                      {game.hasJoined ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                          <span className="truncate">GOING</span>
                        </>
                      ) : (
                        <>
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">I'M GOING</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: Call For Backup & Type Reason (Mobile Bottom-Sheet Style) */}
      {isBackupModalOpen && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-[#c5d8c3] shadow-2xl overflow-hidden font-sans max-h-[88vh] flex flex-col">
            {/* Header */}
            <div className="bg-[#142614] text-white p-3.5 sm:p-4 border-b border-[#355935] flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22c55e]">
                  <Radio className="w-3 h-3 shrink-0" />
                  <span>DISPATCH TRANSMISSION</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold font-display uppercase tracking-wide mt-0.5">
                  Request Crowd Backup
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBackupModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitBackup} className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
              {/* Match Details Pill */}
              <div className="bg-[#f6f9f5] border border-[#d6e5d5] rounded-xl p-2.5 sm:p-3 text-xs font-mono">
                <div className="text-[#355935] font-bold uppercase">{selectedGame.sport}</div>
                <div className="text-stone-700 mt-0.5 truncate">
                  CCS Pythons vs {selectedGame.opponent} • {selectedGame.venue}
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5">
                  Start Time: {selectedGame.startTime}
                </div>
              </div>

              {/* Urgency Level Selector */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                  Select Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Critical', 'High', 'Moderate'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCustomUrgency(lvl)}
                      className={`p-2 rounded-xl text-[11px] sm:text-xs font-mono font-semibold border transition-colors text-center cursor-pointer ${
                        customUrgency === lvl
                          ? lvl === 'Critical'
                            ? 'bg-red-50 border-red-400 text-red-700 ring-1 ring-red-300'
                            : lvl === 'High'
                            ? 'bg-amber-50 border-amber-400 text-amber-800 ring-1 ring-amber-300'
                            : 'bg-[#edf5ec] border-[#355935] text-[#1f381f] ring-1 ring-[#355935]'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {lvl === 'Critical' ? '🚨 Critical' : lvl === 'High' ? '⚡ High Need' : '📣 Crowd Boost'}
                    </button>
                  ))}
                </div>
              </div>

              {/* User types Reason for Backup */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] sm:text-xs font-mono font-bold text-stone-800 uppercase flex items-center gap-1">
                    <MessageSquarePlus className="w-3.5 h-3.5 text-[#355935] shrink-0" />
                    <span>Why is backup needed?</span>
                  </label>
                  <span className="text-[10px] font-mono text-stone-400">
                    {customReason.length}/200
                  </span>
                </div>

                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value.slice(0, 200))}
                  rows={3}
                  placeholder="e.g. Opponent section brought drums and is chanting loud! We need 30+ CCS supporters to make noise right now!"
                  className="w-full text-xs sm:text-sm p-2.5 sm:p-3 rounded-xl border border-stone-300 focus:border-[#355935] focus:ring-2 focus:ring-[#355935]/20 outline-none transition-all resize-none bg-stone-50/50"
                  required
                />
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 block mb-1">
                  Tap to add quick tactical callouts:
                </span>
                <div className="flex flex-wrap gap-1">
                  {QUICK_REASON_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="px-2 py-1 rounded-lg text-[10px] sm:text-[11px] bg-[#edf5ec] hover:bg-[#dcecd9] text-[#1f381f] border border-[#c5d8c3] font-medium transition-colors cursor-pointer text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Callsign Input */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono font-semibold text-stone-600 mb-1">
                  Your Alias / Callsign (Optional)
                </label>
                <input
                  type="text"
                  value={authorAlias}
                  onChange={(e) => setAuthorAlias(e.target.value)}
                  placeholder="e.g. Pythons Bench, Fan in Bleachers"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#355935] outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsBackupModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#142614] text-[#22c55e] hover:bg-[#1f381f] border border-[#355935] flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>BROADCAST ALERT</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create a New Match Dispatch (Mobile Bottom-Sheet Style) */}
      {isNewMatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-[#c5d8c3] shadow-2xl overflow-hidden font-sans max-h-[88vh] flex flex-col">
            {/* Header */}
            <div className="bg-[#142614] text-white p-3.5 sm:p-4 border-b border-[#355935] flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22c55e]">
                  <Plus className="w-3 h-3 shrink-0" />
                  <span>NEW MATCH DISPATCH</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold font-display uppercase tracking-wide mt-0.5">
                  Broadcast Ongoing Game
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewMatchModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewMatch} className="p-4 sm:p-5 space-y-3 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                    Sport Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value)}
                    placeholder="e.g. Badminton Singles"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#355935] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                    Opponent *
                  </label>
                  <select
                    value={newOpponent}
                    onChange={(e) => setNewOpponent(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#355935] outline-none bg-white"
                  >
                    <option value="COE Titans">COE Titans (Engineering)</option>
                    <option value="CLA Phoenix">CLA Phoenix (Liberal Arts)</option>
                    <option value="CTE Warriors">CTE (Education)</option>
                    <option value="CCJE Enforcers">CCJE (Criminology)</option>
                    <option value="CSWCD Social Work">CSWCD</option>
                    <option value="CBA Vipers">CBA Vipers (Business)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                    Venue *
                  </label>
                  <input
                    type="text"
                    required
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g. WMSU Gym Court B"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#355935] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                    Game Start Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    placeholder="e.g. Today • 3:30 PM"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#355935] outline-none"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                  Reason for Backup *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="Describe why crowd backup is needed right now..."
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#355935] outline-none resize-none"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                  Urgency Level
                </label>
                <div className="flex gap-1.5">
                  {(['Critical', 'High', 'Moderate'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setNewUrgency(lvl)}
                      className={`flex-1 py-2 px-2 rounded-xl text-[11px] sm:text-xs font-mono font-semibold border text-center cursor-pointer ${
                        newUrgency === lvl
                          ? 'bg-[#142614] text-[#22c55e] border-[#355935]'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsNewMatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#142614] text-[#22c55e] hover:bg-[#1f381f] border border-[#355935] flex items-center gap-1.5 shadow-md cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>DEPLOY</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackupRequest;

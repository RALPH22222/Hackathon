import { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Megaphone, 
  Check, 
  Flame, 
  BellRing
} from 'lucide-react';

interface GameBackup {
  id: string;
  sport: string;
  opponent: string;
  venue: string;
  score: string;
  urgency: 'Critical' | 'High' | 'Moderate';
  supportersGoing: number;
  hasJoined?: boolean;
  backupRequested?: boolean;
}

export function BackupRequest() {
  const [games, setGames] = useState<GameBackup[]>([
    {
      id: 'game-1',
      sport: 'Basketball (Men)',
      opponent: 'COE Titans',
      venue: 'WMSU Gym',
      score: '4th Qtr • CCS 78 - 76 COE',
      urgency: 'Critical',
      supportersGoing: 54,
      hasJoined: false,
      backupRequested: true,
    },
    {
      id: 'game-2',
      sport: 'Volleyball (Women)',
      opponent: 'CLA Phoenix',
      venue: 'Court B',
      score: 'Set 2 • 18 - 20',
      urgency: 'High',
      supportersGoing: 32,
      hasJoined: false,
      backupRequested: false,
    },
    {
      id: 'game-3',
      sport: 'MLBB Esports',
      opponent: 'CBA Vipers',
      venue: 'Lab 3',
      score: 'Game 3 • Tied 1-1',
      urgency: 'Moderate',
      supportersGoing: 45,
      hasJoined: false,
      backupRequested: false,
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleGoing = (gameId: string) => {
    setGames(prev =>
      prev.map(game => {
        if (game.id === gameId) {
          const nextJoined = !game.hasJoined;
          if (nextJoined) {
            showToast(`Marked as going to support ${game.sport}! 🐍`);
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

  const handleRequestBackup = (gameId: string) => {
    setGames(prev =>
      prev.map(game => {
        if (game.id === gameId) {
          showToast(`Backup requested for ${game.sport}!`);
          return {
            ...game,
            backupRequested: true,
            supportersGoing: game.hasJoined ? game.supportersGoing : game.supportersGoing + 1,
            hasJoined: true,
          };
        }
        return game;
      })
    );
  };

  return (
    <div className="space-y-3">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-[#355935] text-white text-xs font-semibold flex items-center justify-between shadow-md">
          <span>{toastMessage}</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">Updated</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#c5d8c3] p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-[#1f381f] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#355935]" />
              Game Backup
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Support CCS Venom athletes or call for crowd backup.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#edf5ec] text-[#254625] border border-[#c5d8c3]">
            {games.length} Live
          </span>
        </div>
      </div>

      {/* Game Cards */}
      <div className="space-y-2.5">
        {games.map(game => (
          <div
            key={game.id}
            className="bg-white rounded-2xl border border-[#c5d8c3] p-3.5 shadow-xs space-y-3 hover:border-[#5d8c55] transition-colors"
          >
            {/* Top row: Matchup & Urgency */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#1f381f] block">
                  {game.sport}
                </span>
                <p className="text-xs font-semibold text-stone-700">
                  CCS Venom <span className="text-stone-400 font-normal">vs</span> {game.opponent}
                </p>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  game.urgency === 'Critical'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : game.urgency === 'High'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#edf5ec] text-[#254625] border-[#c5d8c3]'
                }`}
              >
                {game.urgency === 'Critical' ? '🚨 Urgent' : `${game.urgency} Need`}
              </span>
            </div>

            {/* Score & Venue */}
            <div className="flex items-center justify-between text-xs bg-[#f8faf8] border border-[#e8f0e7] rounded-xl px-3 py-2">
              <span className="font-semibold text-[#224422] font-mono">
                {game.score}
              </span>
              <span className="text-stone-600 flex items-center gap-1 text-[11px]">
                <MapPin className="w-3 h-3 text-[#5d8c55]" />
                {game.venue}
              </span>
            </div>

            {/* Supporters Count & Actions */}
            <div className="flex items-center justify-between pt-1 gap-2">
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                <Users className="w-3.5 h-3.5 text-[#355935]" />
                <span>
                  <strong className="text-[#1f381f]">{game.supportersGoing}</strong> going
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {!game.backupRequested ? (
                  <button
                    type="button"
                    onClick={() => handleRequestBackup(game.id)}
                    className="py-1.5 px-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Flame className="w-3 h-3 text-amber-600" />
                    <span>Need Backup</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg flex items-center gap-1">
                    <BellRing className="w-2.5 h-2.5" />
                    Alerted
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleToggleGoing(game.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    game.hasJoined
                      ? 'bg-[#355935] text-white shadow-xs'
                      : 'border border-[#355935] text-[#355935] hover:bg-[#edf5ec]'
                  }`}
                >
                  {game.hasJoined ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Going</span>
                    </>
                  ) : (
                    <span>I'm Going</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BackupRequest;

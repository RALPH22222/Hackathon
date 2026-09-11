import React, { useState } from 'react';
import { ExternalLink, Trophy, X } from 'lucide-react';
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon } from './MedalIcons';
import { SportIcon } from './MatchupVisuals';

import ccsLogo from '../../assets/ccs-whitie.png';
import coeLogo from '../../assets/coe.png';
import claLogo from '../../assets/cla.png';
import cteLogo from '../../assets/cte.png';
import crimLogo from '../../assets/crim.png';
import swLogo from '../../assets/sw.png';

interface CollegeTally {
  rank: number;
  code: string;
  name: string;
  logo: string;
  bgGradient: string;
  borderColor: string;
  logoOpacity: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  medalsByGame: {
    game: string;
    gold: number;
    silver: number;
    bronze: number;
  }[];
  isCCS?: boolean;
}

const collegeTallies: CollegeTally[] = [
  {
    rank: 1,
    code: 'CCS',
    name: 'College of Computing Studies',
    logo: ccsLogo,
    bgGradient: 'bg-gradient-to-r from-[#0d2e16] via-[#14421f] to-[#1e5c2d]',
    borderColor: 'border-[#3f8f53]/70',
    logoOpacity: 'opacity-35 brightness-150 contrast-125',
    gold: 14,
    silver: 8,
    bronze: 6,
    total: 28,
    medalsByGame: [
      { game: 'Basketball Men', gold: 5, silver: 2, bronze: 1 },
      { game: 'Volleyball Women', gold: 3, silver: 2, bronze: 2 },
      { game: 'MLBB Esports', gold: 4, silver: 2, bronze: 1 },
      { game: 'Badminton Doubles', gold: 2, silver: 2, bronze: 2 },
    ],
    isCCS: true,
  },
  {
    rank: 2,
    code: 'COE',
    name: 'College of Engineering',
    logo: coeLogo,
    bgGradient: 'bg-gradient-to-r from-[#5a0c0c] via-[#751313] to-[#8f1919]',
    borderColor: 'border-[#b91c1c]/60',
    logoOpacity: 'opacity-25',
    gold: 11,
    silver: 9,
    bronze: 5,
    total: 25,
    medalsByGame: [
      { game: 'Basketball Men', gold: 4, silver: 3, bronze: 1 },
      { game: 'Volleyball Men', gold: 3, silver: 2, bronze: 2 },
      { game: 'Chess Team', gold: 2, silver: 2, bronze: 1 },
      { game: 'Athletics', gold: 2, silver: 2, bronze: 1 },
    ],
  },
  {
    rank: 3,
    code: 'CLA',
    name: 'College of Liberal Arts',
    logo: claLogo,
    bgGradient: 'bg-gradient-to-r from-[#854d0e] via-[#ca8a04] to-[#d97706]',
    borderColor: 'border-[#facc15]/70',
    logoOpacity: 'opacity-25 brightness-110',
    gold: 9,
    silver: 7,
    bronze: 8,
    total: 24,
    medalsByGame: [
      { game: 'Sepak Takraw', gold: 3, silver: 2, bronze: 2 },
      { game: 'Table Tennis', gold: 2, silver: 2, bronze: 2 },
      { game: 'Badminton Singles', gold: 2, silver: 1, bronze: 3 },
      { game: 'Debate', gold: 2, silver: 2, bronze: 1 },
    ],
  },
  {
    rank: 4,
    code: 'CTE',
    name: 'College of Teacher Education',
    logo: cteLogo,
    bgGradient: 'bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#2563eb]',
    borderColor: 'border-[#3b82f6]/60',
    logoOpacity: 'opacity-25',
    gold: 7,
    silver: 10,
    bronze: 6,
    total: 23,
    medalsByGame: [
      { game: 'Volleyball Women', gold: 3, silver: 3, bronze: 2 },
      { game: 'Basketball Women', gold: 2, silver: 2, bronze: 1 },
      { game: 'Chess Team', gold: 1, silver: 3, bronze: 2 },
      { game: 'Athletics', gold: 1, silver: 2, bronze: 1 },
    ],
  },
  {
    rank: 5,
    code: 'CCJE',
    name: 'College of Criminal Justice Education',
    logo: crimLogo,
    bgGradient: 'bg-gradient-to-r from-[#881337] via-[#be123c] to-[#6e102b]',
    borderColor: 'border-[#f43f5e]/50',
    logoOpacity: 'opacity-25',
    gold: 6,
    silver: 4,
    bronze: 7,
    total: 17,
    medalsByGame: [
      { game: 'Arnis', gold: 3, silver: 1, bronze: 2 },
      { game: 'Boxing', gold: 2, silver: 1, bronze: 2 },
      { game: 'Basketball Men', gold: 1, silver: 1, bronze: 2 },
      { game: 'Darts', gold: 0, silver: 1, bronze: 1 },
    ],
  },
  {
    rank: 6,
    code: 'CSWCD',
    name: 'College of Social Work and Community Development',
    logo: swLogo,
    bgGradient: 'bg-gradient-to-r from-[#0f4642] via-[#115e59] to-[#0d9488]',
    borderColor: 'border-[#14b8a6]/60',
    logoOpacity: 'opacity-25',
    gold: 4,
    silver: 5,
    bronze: 3,
    total: 12,
    medalsByGame: [
      { game: 'Volleyball Men', gold: 2, silver: 2, bronze: 1 },
      { game: 'Chess Team', gold: 1, silver: 1, bronze: 1 },
      { game: 'Badminton Doubles', gold: 1, silver: 2, bronze: 1 },
    ],
  },
];

export const MedalTallyCard: React.FC = () => {
  const [selectedCollege, setSelectedCollege] = useState<CollegeTally | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs overflow-hidden">
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 flex items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-mono text-[#5d8c55] font-semibold uppercase tracking-widest">
                PALARO MEDAL TALLY
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#142614] tracking-tight uppercase font-display leading-none">
              Official College Standings
            </h2>
            <div className="sm:hidden mt-2">
              <a
                href="https://www.facebook.com/thevenompub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-500 hover:text-[#355935] transition-colors group whitespace-nowrap"
              >
                <span>Source: The Venom Publication</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <a
            href="https://www.facebook.com/thevenompub"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-stone-500 hover:text-[#355935] transition-colors group shrink-0 whitespace-nowrap"
          >
            <span>Source: The Venom Publication</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
          </a>
        </div>

        <div className="mx-4 sm:mx-6 h-px bg-[#e5efe4] mb-2" />

        <div className="px-4 sm:px-6 pb-4 sm:pb-5">
          <div className="flex items-center justify-between mt-3 mb-3 text-[10px] font-mono font-bold text-stone-400 pr-1">
            <span className="uppercase tracking-widest text-[9.5px] sm:text-[10px] ml-3 sm:ml-3.5">
              Rank
            </span>

            <div className="grid grid-cols-4 w-[136px] sm:w-[240px] text-center font-mono font-bold shrink-0 items-center mr-3 sm:mr-[26px]">
              <div className="flex items-center justify-center">
                <GoldMedalIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-xs" />
              </div>
              <div className="flex items-center justify-center">
                <SilverMedalIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-xs" />
              </div>
              <div className="flex items-center justify-center">
                <BronzeMedalIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-xs" />
              </div>
              <div className="flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-mono font-black text-stone-600 uppercase tracking-wider">
                  Total
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[340px] sm:max-h-[380px] pr-1">
            {collegeTallies.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedCollege(item)}
                aria-label={`View ${item.name} medal details`}
                className={`relative w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl border ${item.bgGradient} ${item.borderColor} text-white shadow-sm overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a3f] focus-visible:ring-offset-2 text-left`}
              >
                {item.isCCS && (
                  <div className="absolute right-0 top-0 bottom-0 w-44 bg-gradient-to-l from-emerald-400/20 via-emerald-500/10 to-transparent pointer-events-none" />
                )}

                <img
                  src={item.logo}
                  alt=""
                  aria-hidden="true"
                  className={`absolute -right-3 -bottom-5 w-28 h-28 sm:w-32 sm:h-32 object-contain pointer-events-none filter drop-shadow-md ${item.logoOpacity}`}
                />

                <div className="relative z-10 flex items-center gap-2 sm:gap-3 min-w-0 pr-1 sm:pr-2">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-xs font-bold font-mono text-white shrink-0 border border-white/30 shadow-2xs">
                    {item.rank}
                  </span>

                  <div className="min-w-0">
                    <span className="sm:hidden font-bold text-[15px] leading-none tracking-wide text-white block mb-0.5">
                      {item.code}
                    </span>
                    <span className="font-semibold text-[9.5px] sm:text-[14.5px] leading-[1.05] sm:leading-tight text-white/90 sm:text-white block break-words">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-4 w-[136px] sm:w-[240px] text-center font-mono font-bold text-xs sm:text-base shrink-0 items-center">
                  <span className="text-amber-300 drop-shadow-2xs">{item.gold}</span>
                  <span className="text-zinc-100 drop-shadow-2xs">{item.silver}</span>
                  <span className="text-[#fed7aa] drop-shadow-2xs">{item.bronze}</span>
                  <span className="text-white font-extrabold text-sm sm:text-lg drop-shadow-2xs">{item.total}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedCollege && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/75"
          role="presentation"
          onClick={() => setSelectedCollege(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[88vh] flex flex-col font-sans"
            role="dialog"
            aria-modal="true"
            aria-labelledby="college-standing-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`relative overflow-hidden px-5 pb-4 pt-4 text-white sm:px-8 ${selectedCollege.bgGradient}`}>
              <img
                src={selectedCollege.logo}
                alt=""
                aria-hidden="true"
                className={`absolute right-5 top-1/2 h-32 w-32 -translate-y-1/2 object-contain filter drop-shadow-lg ${selectedCollege.logoOpacity}`}
              />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 font-mono text-lg font-bold backdrop-blur-xs">
                    {selectedCollege.rank}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                      Official standing
                    </p>
                    <h3 id="college-standing-title" className="mt-1 max-w-[320px] text-lg font-black leading-tight tracking-tight sm:text-xl">
                      {selectedCollege.name}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCollege(null)}
                  aria-label="Close medal details"
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative z-10 mt-4 grid grid-cols-4 rounded-xl bg-black/10 py-2.5 text-center backdrop-blur-xs">
                <div>
                  <GoldMedalIcon className="mx-auto h-5 w-5" />
                  <p className="mt-1 font-mono text-lg font-black">{selectedCollege.gold}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/65">Gold</p>
                </div>
                <div>
                  <SilverMedalIcon className="mx-auto h-5 w-5" />
                  <p className="mt-1 font-mono text-lg font-black">{selectedCollege.silver}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/65">Silver</p>
                </div>
                <div>
                  <BronzeMedalIcon className="mx-auto h-5 w-5" />
                  <p className="mt-1 font-mono text-lg font-black">{selectedCollege.bronze}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/65">Bronze</p>
                </div>
                <div>
                  <Trophy className="mx-auto h-5 w-5 text-amber-300" aria-hidden="true" />
                  <p className="mt-1 font-mono text-lg font-black">{selectedCollege.total}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/65">Total</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 bg-white">
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5d8c55]">Medal breakdown</p>
                  <h4 className="mt-1 text-base font-black uppercase tracking-tight text-[#142614]">Results by game</h4>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400">{selectedCollege.total} medals</span>
              </div>

              <div className="space-y-2">
                {selectedCollege.medalsByGame.map((result) => (
                  <div key={result.game} className="flex items-center justify-between gap-3 rounded-xl border border-[#dce9da] bg-white px-3 py-3 shadow-xs">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf5ec] text-[#355935]">
                        <SportIcon sport={result.game} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 text-sm font-bold text-[#263c27]">{result.game}</span>
                    </div>
                    <div className="grid shrink-0 grid-cols-3 gap-2 text-center font-mono text-xs font-bold">
                      <span className="flex min-w-8 flex-col items-center gap-0.5 text-amber-600"><GoldMedalIcon className="h-4 w-4" />{result.gold}</span>
                      <span className="flex min-w-8 flex-col items-center gap-0.5 text-slate-500"><SilverMedalIcon className="h-4 w-4" />{result.silver}</span>
                      <span className="flex min-w-8 flex-col items-center gap-0.5 text-orange-700"><BronzeMedalIcon className="h-4 w-4" />{result.bronze}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] leading-relaxed text-stone-400">
                Medal counts are based on the official college standings published by The Venom Publication.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
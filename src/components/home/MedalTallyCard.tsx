import React from 'react';
import { Trophy, ExternalLink } from 'lucide-react';
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon } from './MedalIcons';

// College Logos from assets
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
  },
];

export const MedalTallyCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] p-4 sm:p-6 shadow-xs">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#e2ece0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#edf5ec] flex items-center justify-center border border-[#c5d8c3]">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#355935]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-base font-bold text-[#1f381f] uppercase tracking-wide font-display">
                Palaro Medal Tally
              </h2>
              <p className="text-[11px] text-stone-500 font-mono">Official College Standings</p>
            </div>
          </div>

          {/* Source Link directly below subtitle */}
          <div className="mt-1.5 ml-10.5">
            <a
              href="https://www.facebook.com/thevenompub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#edf5ec] hover:bg-[#ddeadc] border border-[#5d8c55]/40 text-[#254625] text-[10.5px] font-mono font-semibold transition-all group shadow-2xs cursor-pointer"
            >
              <span>Source: The Venom Publication</span>
              <ExternalLink className="w-3 h-3 text-[#355935] opacity-75 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Medal Legend Column Headers */}
        <div className="self-end sm:self-center pr-4 sm:pr-4.5">
          <div className="grid grid-cols-4 w-[136px] sm:w-[240px] text-center text-xs font-mono font-bold text-stone-600">
            <div className="flex items-center justify-center gap-1">
              <GoldMedalIcon className="w-[18px] h-[18px] sm:w-4 sm:h-4" />
              <span className="sm:hidden font-sans text-[9px] leading-none">G</span>
              <span className="hidden sm:inline font-sans text-xs">Gold</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <SilverMedalIcon className="w-[18px] h-[18px] sm:w-4 sm:h-4" />
              <span className="sm:hidden font-sans text-[9px] leading-none">S</span>
              <span className="hidden sm:inline font-sans text-xs">Silver</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <BronzeMedalIcon className="w-[18px] h-[18px] sm:w-4 sm:h-4" />
              <span className="sm:hidden font-sans text-[9px] leading-none">B</span>
              <span className="hidden sm:inline font-sans text-xs">Bronze</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-sans text-xs font-bold text-stone-700">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* College Leaderboard Rows */}
      <div className="space-y-2.5 overflow-y-auto max-h-[340px] sm:max-h-[380px] pr-1">
        {collegeTallies.map((item) => (
          <div
            key={item.code}
            className={`relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl border ${item.bgGradient} ${item.borderColor} text-white shadow-sm overflow-hidden transition-transform duration-150`}
          >
            {/* Right Side Watermark Emblem Logo with Ambient Radial Highlights for CCS */}
            {item.isCCS && (
              <div className="absolute right-0 top-0 bottom-0 w-44 bg-gradient-to-l from-emerald-400/20 via-emerald-500/10 to-transparent pointer-events-none" />
            )}

            <img
              src={item.logo}
              alt=""
              aria-hidden="true"
              className={`absolute -right-3 -bottom-5 w-28 h-28 sm:w-32 sm:h-32 object-contain pointer-events-none filter drop-shadow-md ${item.logoOpacity}`}
            />

            {/* Left: Rank & College Name (Naturally wrapping on mobile) */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-3 min-w-0 pr-1 sm:pr-2">
              {/* Rank Number Badge */}
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-xs font-bold font-mono text-white shrink-0 border border-white/30 shadow-2xs">
                {item.rank}
              </span>

              {/* Mobile shows the college code above its full name. */}
              <div className="min-w-0">
                <span className="sm:hidden font-bold text-[15px] leading-none tracking-wide text-white block mb-0.5">
                  {item.code}
                </span>
                <span className="font-semibold text-[9.5px] sm:text-[14.5px] leading-[1.05] sm:leading-tight text-white/90 sm:text-white block break-words">
                  {item.name}
                </span>
              </div>
            </div>

            {/* Right: Medals Count & Total */}
            <div className="relative z-10 grid grid-cols-4 w-[136px] sm:w-[240px] text-center font-mono font-bold text-xs sm:text-base shrink-0 items-center">
              <span className="text-amber-200 drop-shadow-2xs">{item.gold}</span>
              <span className="text-slate-100 drop-shadow-2xs">{item.silver}</span>
              <span className="text-orange-200 drop-shadow-2xs">{item.bronze}</span>
              <span className="text-white font-extrabold text-sm sm:text-lg drop-shadow-2xs">{item.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

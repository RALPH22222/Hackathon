import React from 'react';
import { ExternalLink } from 'lucide-react';
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
    bgGradient: 'bg-gradient-to-r from-[#092212] via-[#0d341b] to-[#124926]',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    logoOpacity: 'opacity-35 brightness-125 contrast-125',
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
    bgGradient: 'bg-gradient-to-r from-[#3a0808] via-[#540d0d] to-[#6d1212]',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
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
    bgGradient: 'bg-gradient-to-r from-[#442805] via-[#633a06] to-[#804b08]',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
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
    bgGradient: 'bg-gradient-to-r from-[#0a1b42] via-[#102a66] to-[#163a8c]',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
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
    bgGradient: 'bg-gradient-to-r from-[#3a0818] via-[#540d23] to-[#6f112e]',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
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
    bgGradient: 'bg-gradient-to-r from-[#05211f] via-[#093532] to-[#0e4844]',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    logoOpacity: 'opacity-25',
    gold: 4,
    silver: 5,
    bronze: 3,
    total: 12,
  },
];

export const MedalTallyCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 flex items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-mono text-[#5d8c55] font-semibold uppercase tracking-widest">
              SYS.STANDINGS // PALARO 2026
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-black text-[#142614] tracking-tight uppercase font-display leading-none">
            Official Medal Tally
          </h2>
          {/* Phone View: Link positioned cleanly below the title */}
          <div className="sm:hidden mt-2">
            <a
              href="https://www.facebook.com/thevenompub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-400 hover:text-[#355935] transition-colors group whitespace-nowrap"
            >
              <span>FEED // The Venom Pub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* Desktop View: Link on the right side */}
        <a
          href="https://www.facebook.com/thevenompub"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-stone-400 hover:text-[#355935] transition-colors group shrink-0 whitespace-nowrap"
        >
          <span>FEED // The Venom Pub</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
        </a>
      </div>

      {/* Thin divider */}
      <div className="mx-4 sm:mx-6 h-px bg-[#e5efe4] mb-2" />

      {/* College Leaderboard Rows Container */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-5 space-y-2.5 overflow-y-auto max-h-[380px] sm:max-h-[420px] pr-2 sm:pr-3 card-scrollbar">
        {/* Table Column Headers (Directly matching row layout for exact alignment) */}
        <div className="flex items-center justify-between px-2.5 sm:px-3 text-[10px] font-mono font-bold text-stone-400">
          <span className="uppercase tracking-widest text-[9.5px] sm:text-[10px]">RANK // COLLEGE UNIT</span>

          {/* Right: Exact same grid structure as rows */}
          <div className="grid grid-cols-4 w-[136px] sm:w-[230px] text-center font-mono font-bold shrink-0 items-center">
            {/* Gold */}
            <div className="flex items-center justify-center">
              <GoldMedalIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-xs" />
            </div>

            {/* Silver */}
            <div className="flex items-center justify-center">
              <SilverMedalIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-xs" />
            </div>

            {/* Bronze */}
            <div className="flex items-center justify-center">
              <BronzeMedalIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-xs" />
            </div>

            {/* Total */}
            <div className="flex items-center justify-center">
              <span className="text-[10px] sm:text-xs font-mono font-black text-stone-600 uppercase tracking-wider">
                TOTAL
              </span>
            </div>
          </div>
        </div>
        {collegeTallies.map((item) => (
          <div
            key={item.code}
            className={`relative flex items-center justify-between p-2.5 sm:p-3 rounded-xl border ${item.bgGradient} ${item.borderColor} text-white shadow-xs overflow-hidden transition-all duration-150 hover:brightness-110`}
          >
            {/* Subtle Right-side Ambient Contrast Glow */}
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Right Side College Logo in the color layout */}
            <img
              src={item.logo}
              alt=""
              aria-hidden="true"
              className={`absolute right-1 -bottom-3.5 w-24 h-24 sm:w-28 sm:h-28 object-contain pointer-events-none filter drop-shadow-md ${item.logoOpacity}`}
            />

            {/* Left: Terminal Rank & College Name */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
              {/* Computerish Minimalist Rank Badge */}
              <span
                className={`font-mono text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md flex items-center justify-center shrink-0 border ${
                  item.isCCS
                    ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/50 shadow-2xs'
                    : item.rank === 2
                    ? 'bg-slate-200/20 text-slate-200 border-slate-300/40'
                    : item.rank === 3
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'bg-black/30 text-white/80 border-white/20'
                }`}
              >
                #{String(item.rank).padStart(2, '0')}
              </span>

              {/* College Code Prefix & Name */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono font-bold text-[11px] sm:text-xs text-white/60 tracking-wider">
                    {item.code} //
                  </span>
                  <span className="font-sans sm:font-mono font-bold text-xs sm:text-[13.5px] text-white tracking-wide truncate">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Monospace Medals Count & Terminal Total Box */}
            <div className="relative z-10 grid grid-cols-4 w-[136px] sm:w-[230px] text-center font-mono font-bold text-xs sm:text-sm shrink-0 items-center">
              <span className="text-amber-300 drop-shadow-2xs">{item.gold}</span>
              <span className="text-slate-200 drop-shadow-2xs">{item.silver}</span>
              <span className="text-amber-500 drop-shadow-2xs">{item.bronze}</span>
              <div className="flex justify-center">
                <span className="px-2 py-0.5 rounded bg-black/40 border border-white/25 font-mono font-extrabold text-white text-xs sm:text-sm shadow-inner drop-shadow-2xs">
                  {item.total}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon } from './MedalIcons';

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
            <div
              key={item.code}
              className={`relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl border ${item.bgGradient} ${item.borderColor} text-white shadow-sm overflow-hidden transition-transform duration-150`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import {
  ChessKnight,
  CircleDotDashed,
  Dumbbell,
  Feather,
  Gamepad2,
  Goal,
  Shield,
  Trophy,
  Volleyball,
} from 'lucide-react';

import ccsLogo from '../../assets/ccs-whitie.png';
import coeLogo from '../../assets/coe.png';
import claLogo from '../../assets/cla.png';
import cteLogo from '../../assets/cte.png';
import crimLogo from '../../assets/crim.png';
import cswcdLogo from '../../assets/sw.png';
import basketballIcon from '../../assets/basketball.png';
import sepakIcon from '../../assets/sepak.png';
import badmintonIcon from '../../assets/badminton.png';
import soccerIcon from '../../assets/soccer.png';

const collegeLogos: Record<string, string> = {
  CCS: ccsLogo,
  COE: coeLogo,
  CLA: claLogo,
  CTE: cteLogo,
  CCJE: crimLogo,
  CSWCD: cswcdLogo,
};

const collegeNames: Record<string, string> = {
  CCS: 'College of Computing Studies',
  COE: 'College of Engineering',
  CLA: 'College of Liberal Arts',
  CTE: 'College of Teacher Education',
  CCJE: 'College of Criminal Justice Education',
  CSWCD: 'College of Social Work and Community Development',
};

const teamNames: Record<string, string> = {
  CCS: 'CCS Pixels',
  COE: 'COE Titans',
  CLA: 'CLA Phoenix',
  CTE: 'CTE Scorpions',
  CCJE: 'CCJE Enforcers',
  CSWCD: 'CSWCD Knights',
};

function getCollegeCode(value: string) {
  return value.match(/\b(CCS|COE|CLA|CTE|CCJE|CSWCD)\b/i)?.[1]?.toUpperCase() ?? 'CCS';
}

function getSportName(value: string) {
  return value.split(/\s+vs\s+/i)[0].replace(/\s+(Men|Women)$/i, '').trim();
}

export function SportIcon({ sport, className = 'h-5 w-5' }: { sport: string; className?: string }) {
  const normalizedSport = getSportName(sport).toLowerCase();
  const sportAsset = normalizedSport.includes('basketball')
    ? basketballIcon
    : normalizedSport.includes('sepak')
      ? sepakIcon
      : normalizedSport.includes('badminton')
        ? badmintonIcon
        : normalizedSport.includes('football') || normalizedSport.includes('soccer')
          ? soccerIcon
        : null;

  if (sportAsset) {
    return <img src={sportAsset} alt="" aria-hidden="true" className={`${className} sport-asset-icon shrink-0 object-contain`} />;
  }

  const Icon = normalizedSport.includes('basketball')
    ? CircleDotDashed
    : normalizedSport.includes('volleyball')
      ? Volleyball
      : normalizedSport.includes('football')
        ? Goal
        : normalizedSport.includes('chess')
          ? ChessKnight
          : normalizedSport.includes('badminton')
            ? Feather
            : normalizedSport.includes('table tennis')
              ? CircleDotDashed
              : normalizedSport.includes('mlbb')
                ? Gamepad2
                : normalizedSport.includes('sepak') || normalizedSport.includes('arnis') || normalizedSport.includes('boxing')
                  ? Dumbbell
                  : Trophy;

  return <Icon className={className} aria-hidden="true" />;
}

export function CollegeLogo({ college, className = 'h-9 w-9' }: { college: string; className?: string }) {
  const code = getCollegeCode(college);
  const logo = collegeLogos[code];

  return logo ? (
    <img
      src={logo}
      alt={`${collegeNames[code]} crest`}
      className={`${className} shrink-0 object-contain`}
    />
  ) : (
    <span className={`${className} flex shrink-0 items-center justify-center rounded-full bg-[#edf5ec] text-[#355935]`}>
      <Shield className="h-1/2 w-1/2" aria-hidden="true" />
    </span>
  );
}

export function CollegeLabel({ college, className = '' }: { college: string; className?: string }) {
  const code = getCollegeCode(college);
  return <span className={className}>{code}</span>;
}

export function SportName({ sport, className = '' }: { sport: string; className?: string }) {
  return <span className={className}>{getSportName(sport)}</span>;
}

export function MatchupTeams({
  opponent,
  className = '',
  fullTeamNames = false,
  opponentOnly = false,
}: {
  opponent: string;
  className?: string;
  fullTeamNames?: boolean;
  opponentOnly?: boolean;
}) {
  const opponentCode = getCollegeCode(opponent);
  const opponentName = teamNames[opponentCode] ?? opponent;
  const matchupLogoClassName = fullTeamNames
    ? 'h-5 w-5 rounded-full bg-white p-0.5'
    : 'h-5 w-5';

  // Compact mode keeps mobile rows short while showing full team names on desktop.
  if (opponentOnly) {
    return (
      <span className={`inline-flex shrink-0 items-center gap-1 ${className}`}>
        <CollegeLogo college={opponent} className="h-4 w-4" />
        <span className="font-semibold text-stone-600 md:hidden">{opponentCode}</span>
        <span className="font-semibold text-stone-600 hidden md:inline">{opponentName}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex min-w-0 max-w-full items-center gap-1.5 ${fullTeamNames ? 'flex-nowrap whitespace-nowrap' : 'flex-wrap'} ${className}`}>
      <span className="inline-flex shrink-0 items-center gap-1">
        <CollegeLogo college="CCS" className={matchupLogoClassName} />
        {fullTeamNames ? (
          <span>CCS Pixels</span>
        ) : (
          <>
            <span className="md:hidden">CCS</span>
            <span className="hidden md:inline">CCS Pixels</span>
          </>
        )}
      </span>
      <span className="text-stone-400">vs</span>
      <span className="inline-flex shrink-0 items-center gap-1">
        <CollegeLogo college={opponent} className={matchupLogoClassName} />
        {fullTeamNames ? (
          <span>{opponentName}</span>
        ) : (
          <>
            <span className="md:hidden"><CollegeLabel college={opponent} /></span>
            <span className="hidden md:inline">{opponentName}</span>
          </>
        )}
      </span>
    </div>
  );
}
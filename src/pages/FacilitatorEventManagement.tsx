import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Trophy, 
  MapPin, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Megaphone,
  X,
  Users,
  Award,
  QrCode,
  Power,
  Copy,
  RotateCw,
  Eye,
  EyeOff,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Radio,
  Check
} from 'lucide-react';

export interface FacilitatorEvent {
  id: string;
  sport: string;
  category: string; // e.g. 'Men', 'Women', 'Co-ed'
  opponent: string;
  assignedSection: string;
  venue: string;
  isVenueChanged?: boolean;
  venueChangeReason?: string;
  time: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
  result?: {
    isWin: boolean;
    score: string;
    mvp?: string;
    announcedAt?: string;
  };
  secretCode: string;
  isScanDisabled: boolean;
}

const INITIAL_EVENTS: FacilitatorEvent[] = [
  {
    id: 'evt-1',
    sport: 'Basketball',
    category: "Men's Tournament",
    opponent: 'COE Titans',
    assignedSection: 'BSCS 4-B',
    venue: 'WMSU Main Gymnasium',
    isVenueChanged: false,
    time: '10:00 AM Today',
    status: 'In Progress',
    secretCode: 'BSK-9482',
    isScanDisabled: false,
  },
  {
    id: 'evt-2',
    sport: 'Volleyball',
    category: "Women's League",
    opponent: 'CLA Phoenix',
    assignedSection: 'BSIT 3-A',
    venue: 'Covered Court B',
    isVenueChanged: true,
    venueChangeReason: 'Moved to Court B due to rain on Field A',
    time: '01:30 PM Today',
    status: 'Upcoming',
    secretCode: 'VOL-3105',
    isScanDisabled: false,
  },
  {
    id: 'evt-3',
    sport: 'MLBB Esports',
    category: 'Open Division',
    opponent: 'CTE Scorpions',
    assignedSection: 'BSCS 3-A',
    venue: 'CCS Computer Lab 3',
    isVenueChanged: false,
    time: '03:45 PM Today',
    status: 'Upcoming',
    secretCode: 'MLB-7294',
    isScanDisabled: false,
  },
  {
    id: 'evt-4',
    sport: 'Sepak Takraw',
    category: "Men's Finals",
    opponent: 'CCJE Enforcers',
    assignedSection: 'BSIT 4-B',
    venue: 'Quadrangle Grounds',
    isVenueChanged: false,
    time: '08:00 AM Today',
    status: 'Completed',
    result: {
      isWin: true,
      score: '2 – 0',
      mvp: 'A. Ramos (BSIT 4-B)',
      announcedAt: '09:45 AM',
    },
    secretCode: 'TAK-1084',
    isScanDisabled: false,
  },
  {
    id: 'evt-5',
    sport: 'Table Tennis',
    category: 'Singles Match',
    opponent: 'CLA Phoenix',
    assignedSection: 'BSEMC 2-A',
    venue: 'Student Activity Center',
    isVenueChanged: false,
    time: 'Yesterday',
    status: 'Completed',
    result: {
      isWin: false,
      score: '1 – 3',
      mvp: 'M. Reyes (BSEMC 2-A)',
      announcedAt: 'Yesterday 04:15 PM',
    },
    secretCode: 'TTN-5521',
    isScanDisabled: false,
  },
];

const AVAILABLE_SECTIONS = [
  'BSCS 4-B (Main Advisory)',
  'BSIT 3-A',
  'BSCS 3-A',
  'BSIT 4-B',
  'BSEMC 2-A',
  'BSCS 1-A',
  'BSIT 2-C',
  'BSEMC 4-A',
];

export function FacilitatorEventManagement() {
  const [events, setEvents] = useState<FacilitatorEvent[]>(INITIAL_EVENTS);
  const [filterTab, setFilterTab] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Global Scan Switch across all events handled by facilitator
  const [globalScanEnabled, setGlobalScanEnabled] = useState(true);

  // Active editing modal state
  const [editingSectionEvent, setEditingSectionEvent] = useState<FacilitatorEvent | null>(null);
  const [editingVenueEvent, setEditingVenueEvent] = useState<FacilitatorEvent | null>(null);
  const [announcingResultEvent, setAnnouncingResultEvent] = useState<FacilitatorEvent | null>(null);

  // QR Code & Secret Code Modal state
  const [selectedQrEvent, setSelectedQrEvent] = useState<FacilitatorEvent | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Form states for modals
  const [selectedSection, setSelectedSection] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [venueReason, setVenueReason] = useState('');
  
  // Result announcement state
  const [isWin, setIsWin] = useState(true);
  const [scoreInput, setScoreInput] = useState('');
  const [mvpInput, setMvpInput] = useState('');

  // Toast alert notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate QR Code data URL when selectedQrEvent changes
  useEffect(() => {
    if (selectedQrEvent) {
      const payload = `PALARO2026:ATTENDANCE:${selectedQrEvent.id}:${selectedQrEvent.sport}:${selectedQrEvent.secretCode}`;
      QRCode.toDataURL(payload, {
        width: 320,
        margin: 2,
        color: {
          dark: '#142614',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => {
          console.error('Failed to generate QR code:', err);
          setQrDataUrl('');
        });
    } else {
      setQrDataUrl('');
    }
  }, [selectedQrEvent]);

  // Keep selectedQrEvent in sync with events state updates
  useEffect(() => {
    if (selectedQrEvent) {
      const updated = events.find((e) => e.id === selectedQrEvent.id);
      if (updated) {
        setSelectedQrEvent(updated);
      }
    }
  }, [events]);

  // Toggle QR Scan option for a specific event
  const handleToggleEventScan = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const nextDisabled = !e.isScanDisabled;
          showToast(
            nextDisabled
              ? `QR Scanning TURNED OFF for ${e.sport}. Facilitator set to Busy Mode.`
              : `QR Scanning ENABLED for ${e.sport}. Students can scan now!`
          );
          return { ...e, isScanDisabled: nextDisabled };
        }
        return e;
      })
    );
  };

  // Toggle Global Scan switch for facilitator account
  const handleToggleGlobalScan = () => {
    const nextState = !globalScanEnabled;
    setGlobalScanEnabled(nextState);
    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        isScanDisabled: !nextState,
      }))
    );
    showToast(
      nextState
        ? 'GLOBAL SCANNERS ENABLED: All sports QR scanners are active.'
        : 'GLOBAL BUSY MODE ACTIVATED: All sport QR scanners paused!'
    );
  };

  // Regenerate secret attendance code
  const handleRegenerateCode = (eventId: string) => {
    const prefix = events.find((e) => e.id === eventId)?.sport.substring(0, 3).toUpperCase() || 'PAL';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `${prefix}-${randNum}`;

    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, secretCode: newCode } : e))
    );

    showToast(`New Secret Passcode generated: ${newCode}`);
  };

  // Copy secret code to clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast(`Passcode "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filter events based on tab & search query
  const filteredEvents = events.filter((evt) => {
    const matchesFilter =
      filterTab === 'all'
        ? true
        : filterTab === 'live'
        ? evt.status === 'In Progress'
        : filterTab === 'upcoming'
        ? evt.status === 'Upcoming'
        : evt.status === 'Completed';

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      evt.sport.toLowerCase().includes(q) ||
      evt.opponent.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.assignedSection.toLowerCase().includes(q) ||
      evt.secretCode.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  // Handler: Assign Section
  const handleAssignSection = () => {
    if (!editingSectionEvent || !selectedSection) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingSectionEvent.id ? { ...e, assignedSection: selectedSection } : e
      )
    );

    showToast(`Assigned ${selectedSection} to ${editingSectionEvent.sport}!`);
    setEditingSectionEvent(null);
  };

  // Handler: Change Venue (Emergency Change)
  const handleVenueChange = () => {
    if (!editingVenueEvent || !newVenue) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingVenueEvent.id
          ? {
              ...e,
              venue: newVenue,
              isVenueChanged: true,
              venueChangeReason: venueReason || 'Sudden venue shift by Facilitators',
            }
          : e
      )
    );

    showToast(`ALERT: Venue changed to "${newVenue}" for ${editingVenueEvent.sport}!`);
    setEditingVenueEvent(null);
  };

  // Handler: Announce Match Outcome (Win / Loss)
  const handleAnnounceResult = () => {
    if (!announcingResultEvent || !scoreInput) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setEvents((prev) =>
      prev.map((e) =>
        e.id === announcingResultEvent.id
          ? {
              ...e,
              status: 'Completed',
              result: {
                isWin,
                score: scoreInput,
                mvp: mvpInput || 'CCS Team Effort',
                announcedAt: `Today ${now}`,
              },
            }
          : e
      )
    );

    showToast(
      `OFFICIAL RESULT ANNOUNCED: CCS Venom ${isWin ? 'WON' : 'LOST'} (${scoreInput}) vs ${
        announcingResultEvent.opponent
      }!`
    );
    setAnnouncingResultEvent(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-bounce pointer-events-none">
          <div className="bg-[#1f381f] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center gap-3 text-xs sm:text-sm font-mono font-semibold">
            <Megaphone className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="flex-1">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1a331a] via-[#284828] to-[#3b663b] rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>FACILITATOR OPERATIONS</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>LIVE DESK</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-display tracking-tight text-white">
              Event & QR Attendance Control Desk
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl font-sans">
              Display live sport QR codes, manage secret passcodes, toggle scanning mode when busy, and update match results.
            </p>
          </div>

          {/* Facilitator Global Scan Status & Controls Pill Container - Strictly One Line Only */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/30 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 rounded-2xl shrink-0 self-start md:self-auto flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-none max-w-full">
            {/* Global Scan Switch */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleToggleGlobalScan}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs border whitespace-nowrap ${
                  globalScanEnabled
                    ? 'bg-emerald-600/90 hover:bg-emerald-600 text-white border-emerald-400/50'
                    : 'bg-amber-600/90 hover:bg-amber-600 text-white border-amber-400/50'
                }`}
                title="Toggle QR scanning on/off for all your handled sports"
              >
                <Power className={`w-3.5 h-3.5 ${globalScanEnabled ? 'text-emerald-200' : 'text-amber-200'}`} />
                <span>{globalScanEnabled ? 'QR SCANS: ACTIVE' : 'BUSY MODE: SCANS PAUSED'}</span>
              </button>
            </div>

            <div className="w-px h-7 bg-white/15 shrink-0" />

            {/* Quick Counter Badges */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="px-2 py-0.5 text-center">
                <p className="text-[9px] font-mono uppercase text-emerald-200/70 leading-none">Total</p>
                <p className="text-sm sm:text-base font-black font-mono text-white leading-tight">{events.length}</p>
              </div>
              <div className="px-2 py-0.5 text-center">
                <p className="text-[9px] font-mono uppercase text-amber-300 leading-none">Live</p>
                <p className="text-sm sm:text-base font-black font-mono text-amber-300 leading-tight">
                  {events.filter((e) => e.status === 'In Progress').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filter Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-[#c5d8c3] shadow-xs">
        {/* Filter Tabs */}
        <div className="flex items-center bg-[#edf5ec] p-1 rounded-xl border border-[#c5d8c3]/60 text-xs font-mono font-bold overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filterTab === 'all'
                ? 'bg-[#1f381f] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#1f381f]'
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('live')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              filterTab === 'live'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-700'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Live ({events.filter((e) => e.status === 'In Progress').length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filterTab === 'upcoming'
                ? 'bg-[#355935] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#1f381f]'
            }`}
          >
            Upcoming ({events.filter((e) => e.status === 'Upcoming').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('completed')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filterTab === 'completed'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-emerald-900'
            }`}
          >
            Results ({events.filter((e) => e.status === 'Completed').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sport, code, venue..."
            className="w-full bg-[#f8faf8] border border-[#c5d8c3] focus:border-[#355935] focus:bg-white text-xs font-mono px-3 py-2 pl-9 rounded-xl outline-none transition-all placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Events List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-dashed border-[#c5d8c3] p-8 text-center text-stone-500 font-mono">
            <Trophy className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-bold text-sm">No events match your current filter.</p>
            <p className="text-xs text-stone-400 mt-1">Try clearing search or switching filter tabs.</p>
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const isLive = evt.status === 'In Progress';
            const isCompleted = evt.status === 'Completed';
            const isScanOff = evt.isScanDisabled || !globalScanEnabled;

            return (
              <div
                key={evt.id}
                className={`bg-white rounded-2xl border shadow-xs transition-all overflow-hidden flex flex-col justify-between ${
                  evt.isVenueChanged
                    ? 'border-amber-300 ring-2 ring-amber-400/20'
                    : isLive
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-[#c5d8c3]'
                }`}
              >
                {/* Sudden Venue Change Top Alert Ribbon */}
                {evt.isVenueChanged && (
                  <div className="bg-amber-500 text-white text-[11px] font-mono font-bold px-4 py-1.5 flex items-center justify-between gap-2 shadow-inner">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                      <span className="truncate">SUDDEN VENUE CHANGE ALERT: {evt.venue}</span>
                    </div>
                    <span className="text-[9px] bg-amber-700/60 px-2 py-0.5 rounded-full shrink-0 uppercase">
                      UPDATED
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="p-4 sm:p-5 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#5d8c55] tracking-wider">
                        {evt.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-black font-display text-[#142614] leading-tight">
                        {evt.sport}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-stone-600 mt-0.5">
                        CCS Venom <span className="text-stone-400 font-normal">vs</span> {evt.opponent}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>LIVE NOW</span>
                        </span>
                      ) : isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-mono font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>COMPLETED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#edf5ec] border border-[#c5d8c3] text-[#355935] text-[10px] font-mono font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{evt.time}</span>
                        </span>
                      )}

                      {/* Scanner Status Badge on Card */}
                      {isScanOff ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[9px] font-mono font-bold">
                          <ShieldAlert className="w-3 h-3 text-amber-600" />
                          <span>SCANS PAUSED (BUSY)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[9px] font-mono font-bold">
                          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                          <span>SCANNER OPEN</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Grid: Venue & Assigned Section */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#f8faf8] border border-[#e5efe4] rounded-xl p-3 text-xs font-mono">
                    {/* Venue */}
                    <div className="min-w-0">
                      <p className="text-[9.5px] uppercase text-stone-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#5d8c55]" />
                        <span>Venue Location</span>
                      </p>
                      <p className={`font-bold truncate mt-0.5 ${evt.isVenueChanged ? 'text-amber-900 font-black' : 'text-[#1a2f1a]'}`}>
                        {evt.venue}
                      </p>
                      {evt.venueChangeReason && (
                        <p className="text-[10px] text-amber-700 italic truncate mt-0.5">
                          "{evt.venueChangeReason}"
                        </p>
                      )}
                    </div>

                    {/* Assigned Section */}
                    <div className="min-w-0 border-t sm:border-t-0 sm:border-l border-[#e5efe4] pt-2 sm:pt-0 sm:pl-2.5">
                      <p className="text-[9.5px] uppercase text-stone-400 font-medium flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#5d8c55]" />
                        <span>Assigned Section</span>
                      </p>
                      <p className="font-bold text-[#1f381f] truncate mt-0.5">
                        {evt.assignedSection || 'None assigned'}
                      </p>
                    </div>
                  </div>

                  {/* Dedicated Facilitator Attendance Bar for this Sport - Strictly One Line */}
                  <div className="mt-3 bg-[#edf5ec]/80 border border-[#c5d8c3] rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-none">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[#355935] text-emerald-300 shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase text-stone-500 hidden xs:inline">Passcode:</span>
                        <span className="text-xs font-mono font-black text-[#1f381f] bg-white px-2 py-0.5 rounded border border-[#c5d8c3] tracking-wider shrink-0">
                          {evt.secretCode}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* View QR Code Modal Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedQrEvent(evt)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#1f381f] hover:bg-[#142614] text-white text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                      >
                        <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                        <span>QR & Passcode Kiosk</span>
                      </button>

                      {/* Quick Toggle Scan Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleEventScan(evt.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer border shrink-0 ${
                          isScanOff
                            ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                        }`}
                        title={isScanOff ? 'Scanning Disabled (Facilitator Busy) - Click to Enable' : 'Scanning Enabled - Click to Disable (Busy Mode)'}
                      >
                        {isScanOff ? <EyeOff className="w-4 h-4 text-amber-700" /> : <Eye className="w-4 h-4 text-emerald-700" />}
                      </button>
                    </div>
                  </div>

                  {/* Result Announcement Preview (if completed) */}
                  {isCompleted && evt.result && (
                    <div
                      className={`mt-3 p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono ${
                        evt.result.isWin
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Award className={`w-4 h-4 shrink-0 ${evt.result.isWin ? 'text-emerald-600' : 'text-rose-600'}`} />
                          <span>
                            {evt.result.isWin ? 'VICTORY' : 'DEFEAT'}: {evt.result.score}
                          </span>
                        </div>
                        {evt.result.mvp && (
                          <p className="text-[10.5px] opacity-80 truncate mt-0.5">
                            MVP: {evt.result.mvp}
                          </p>
                        )}
                      </div>
                      <span className="text-[9.5px] font-bold opacity-60 uppercase shrink-0">
                        {evt.result.announcedAt}
                      </span>
                    </div>
                  )}
                </div>

                {/* Facilitator Action Bar */}
                <div className="bg-[#fcfdfc] border-t border-[#e5efe4] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Assign Section Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSectionEvent(evt);
                        setSelectedSection(evt.assignedSection);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#edf5ec] hover:bg-[#dbebd9] text-[#1f381f] text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 border border-[#c5d8c3]"
                      title="Assign section attendance for this sport"
                    >
                      <Users className="w-3.5 h-3.5 text-[#355935]" />
                      <span>Assign Section</span>
                    </button>

                    {/* Change Venue Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingVenueEvent(evt);
                        setNewVenue(evt.venue);
                        setVenueReason('');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 border border-amber-300"
                      title="Update venue for sudden location changes"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>Change Venue</span>
                    </button>
                  </div>

                  {/* Announce Win/Loss Result Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setAnnouncingResultEvent(evt);
                      setIsWin(evt.result ? evt.result.isWin : true);
                      setScoreInput(evt.result ? evt.result.score : '');
                      setMvpInput(evt.result ? evt.result.mvp || '' : '');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#355935] hover:bg-[#284528] text-white text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isCompleted ? 'Edit Result' : 'Announce Result'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ================= MODAL: LIVE ATTENDANCE QR & SECRET CODE KIOSK ================= */}
      {selectedQrEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#142614] text-white rounded-2xl sm:rounded-3xl border border-emerald-500/30 max-w-md sm:max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-3 sm:space-y-4 relative overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="overflow-y-auto pr-1 space-y-3 sm:space-y-4 scrollbar-none">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5 relative z-10">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-900/50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-500/30">
                        ATTENDANCE KIOSK
                      </span>
                      {selectedQrEvent.status === 'In Progress' && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black font-display text-white mt-0.5 truncate">{selectedQrEvent.sport}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedQrEvent(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition-all cursor-pointer shrink-0 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live Scan Mode Status Banner */}
              <div
                className={`p-3 rounded-xl sm:rounded-2xl border text-xs font-mono font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  selectedQrEvent.isScanDisabled || !globalScanEnabled
                    ? 'bg-amber-950/80 text-amber-200 border-amber-500/40'
                    : 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40'
                }`}
              >
                <div className="flex items-start sm:items-center gap-2 min-w-0">
                  {selectedQrEvent.isScanDisabled || !globalScanEnabled ? (
                    <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                  ) : (
                    <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 animate-pulse mt-0.5 sm:mt-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-[11px] sm:text-xs leading-tight">
                      {selectedQrEvent.isScanDisabled || !globalScanEnabled
                        ? 'SCANNING PAUSED (FACILITATOR BUSY MODE)'
                        : 'QR SCANNER ACTIVE & READY'}
                    </p>
                    <p className="text-[10px] sm:text-[10.5px] opacity-80 font-sans font-normal mt-0.5 leading-snug">
                      {selectedQrEvent.isScanDisabled || !globalScanEnabled
                        ? 'Facilitator scanning option is turned off. Students must use Secret Passcode.'
                        : 'Students can scan this QR code directly with their mobile camera.'}
                    </p>
                  </div>
                </div>

                {/* Facilitator Busy Toggle Switch */}
                <button
                  type="button"
                  onClick={() => handleToggleEventScan(selectedQrEvent.id)}
                  className={`px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono font-bold shrink-0 transition-all cursor-pointer border self-end sm:self-auto ${
                    selectedQrEvent.isScanDisabled || !globalScanEnabled
                      ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 border-amber-400'
                      : 'bg-rose-600 hover:bg-rose-700 text-white border-rose-400'
                  }`}
                >
                  {selectedQrEvent.isScanDisabled || !globalScanEnabled ? 'Enable Scanning' : 'Turn Off Scanning'}
                </button>
              </div>

              {/* QR Code Graphic Display Card */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-center space-y-2 sm:space-y-3 shadow-xl border-3 sm:border-4 border-emerald-500/20 relative">
                <div className="w-44 sm:w-56 max-w-full mx-auto bg-white p-1.5 rounded-xl sm:rounded-2xl border border-stone-200 shadow-inner">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="Event QR Code" className="w-full h-auto rounded-lg sm:rounded-xl mx-auto" />
                  ) : (
                    <div className="w-40 h-40 sm:w-52 sm:h-52 bg-stone-100 flex items-center justify-center rounded-xl text-stone-400 text-xs font-mono">
                      Generating QR Code...
                    </div>
                  )}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-600 font-semibold uppercase tracking-wider block truncate">
                    Venue: {selectedQrEvent.venue}
                  </span>
                  <p className="text-[11px] sm:text-xs text-stone-600 font-sans truncate">
                    Assigned Section: <strong className="text-stone-900 font-mono">{selectedQrEvent.assignedSection || 'All Students'}</strong>
                  </p>
                </div>
              </div>

              {/* Secret Passcode Manual Entry Card */}
              <div className="bg-[#1f381f] border border-emerald-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-emerald-300">
                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    <span>SECRET ATTENDANCE PASSCODE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRegenerateCode(selectedQrEvent.id)}
                    className="text-[10px] sm:text-[11px] font-mono text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Regenerate</span>
                  </button>
                </div>

                <div className="flex items-center justify-between bg-black/40 border border-emerald-500/40 rounded-xl p-2.5 sm:p-3 gap-2">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-wider sm:tracking-widest text-emerald-300 select-all truncate">
                    {selectedQrEvent.secretCode}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(selectedQrEvent.secretCode)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono font-bold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <p className="text-[10px] sm:text-[11px] text-emerald-100/70 font-sans leading-tight">
                  Provide passcode to students for manual entry when mobile QR scanning is turned off.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20 shrink-0">
              <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 flex items-center gap-1 truncate">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Palaro 2026 Live Facilitator Kiosk</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedQrEvent(null)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0 ml-2"
              >
                Close Kiosk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 1: ASSIGN SECTION ================= */}
      {editingSectionEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#c5d8c3] max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5efe4] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#edf5ec] text-[#355935]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-[#1f381f]">Assign Section Attendance</h3>
                  <p className="text-xs font-mono text-stone-500">{editingSectionEvent.sport}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingSectionEvent(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono font-semibold text-[#1a2f1a]">
                Select Class Section to Assign:
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full bg-[#f8faf8] border border-[#c5d8c3] focus:border-[#355935] text-sm font-mono p-3 rounded-xl outline-none"
              >
                <option value="">-- Choose Section --</option>
                {AVAILABLE_SECTIONS.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-500 font-sans">
                Assigning a section requires students of that class to check in attendance for this specific game.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5efe4]">
              <button
                type="button"
                onClick={() => setEditingSectionEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignSection}
                disabled={!selectedSection}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#355935] hover:bg-[#294629] text-white transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: SUDDEN VENUE CHANGE ================= */}
      {editingVenueEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-amber-300 max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5efe4] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-amber-950">Sudden Change of Venue</h3>
                  <p className="text-xs font-mono text-stone-500">{editingVenueEvent.sport}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingVenueEvent(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono">
              <div>
                <label className="block text-xs font-semibold text-[#1a2f1a] mb-1">New Venue Location:</label>
                <input
                  type="text"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  placeholder="e.g. Covered Court B"
                  className="w-full bg-[#f8faf8] border border-[#c5d8c3] focus:border-amber-600 text-xs p-3 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1a2f1a] mb-1">Reason / Note for Students:</label>
                <textarea
                  value={venueReason}
                  onChange={(e) => setVenueReason(e.target.value)}
                  placeholder="e.g. Rain delay on main field, moved to Covered Court B"
                  rows={2}
                  className="w-full bg-[#f8faf8] border border-[#c5d8c3] focus:border-amber-600 text-xs p-3 rounded-xl outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-sans flex items-start gap-2">
                <Megaphone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Saving will trigger an urgent <strong>"VENUE CHANGED"</strong> alert badge for all assigned students & advisers.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5efe4]">
              <button
                type="button"
                onClick={() => setEditingVenueEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVenueChange}
                disabled={!newVenue}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Broadcast Venue Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: ANNOUNCE WIN / LOSS RESULT ================= */}
      {announcingResultEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#c5d8c3] max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5efe4] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-[#1f381f]">Announce Match Outcome</h3>
                  <p className="text-xs font-mono text-stone-500">{announcingResultEvent.sport} vs {announcingResultEvent.opponent}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAnnouncingResultEvent(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {/* Outcome Toggle (WIN vs LOSS) */}
              <div>
                <label className="block text-xs font-semibold text-[#1a2f1a] mb-1.5">Match Result for CCS Venom:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWin(true)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isWin
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>VICTORY (WIN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWin(false)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      !isWin
                        ? 'bg-rose-600 text-white border-rose-700 shadow-md'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>DEFEAT (LOSS)</span>
                  </button>
                </div>
              </div>

              {/* Final Score Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1a2f1a] mb-1">Final Score / Match Outcome:</label>
                <input
                  type="text"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(e.target.value)}
                  placeholder="e.g. 84 - 72 or 2 - 0"
                  className="w-full bg-[#f8faf8] border border-[#c5d8c3] focus:border-[#355935] text-xs p-3 rounded-xl outline-none"
                />
              </div>

              {/* MVP / Credit Note */}
              <div>
                <label className="block text-xs font-semibold text-[#1a2f1a] mb-1">Match MVP / Standout Player (Optional):</label>
                <input
                  type="text"
                  value={mvpInput}
                  onChange={(e) => setMvpInput(e.target.value)}
                  placeholder="e.g. J. Abubakar (BSCS 4-B)"
                  className="w-full bg-[#f8faf8] border border-[#c5d8c3] focus:border-[#355935] text-xs p-3 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5efe4]">
              <button
                type="button"
                onClick={() => setAnnouncingResultEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAnnounceResult}
                disabled={!scoreInput}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#355935] hover:bg-[#284528] text-white transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Post Official Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilitatorEventManagement;

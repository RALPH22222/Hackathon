import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  CheckCheck,
  MapPin,
  QrCode,
  Camera,
  ExternalLink,
  Calendar,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Real campus photos for photo proof demonstrations
import proofImg1 from '../assets/569129390_1299214032219734_7626190114260015381_n.png';
import proofImg2 from '../assets/569270178_1299215178886286_2296681164532258347_n.png';
import proofImg3 from '../assets/570183959_1299214072219730_8484950406059815015_n.png';
import proofImg4 from '../assets/570590907_1299216668886137_4995968703077383714_n.png';

export interface StudentAttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: 'BSCS' | 'BSIT' | 'ACT';
  yearLevel: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  section: string;
  eventName: string;
  venue: string;
  timestamp: string;
  mode: 'qr' | 'photo' | 'manual';
  status: 'Present' | 'Absent' | 'Pending';
  photoUrl?: string;
  gpsCoords?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  day: number; // Day 1 to 5
}

const initialStudents: StudentAttendanceRecord[] = [
  // DAY 1 (Opening Ceremonies & Parade - Wed, Sep 9)
  {
    id: 'REC-D1-01',
    studentId: '2022-01923',
    studentName: 'Samantha Nicole C. Reyes',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro Opening Ceremonies & Parade',
    venue: 'University Grandstand',
    timestamp: 'Day 1 • 08:32 AM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 1 • 08:35 AM',
    verifiedBy: 'Adviser Portal',
    day: 1,
  },
  {
    id: 'REC-D1-02',
    studentId: '2022-02941',
    studentName: 'Patricia Anne B. Lim',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro Opening Ceremonies & Parade',
    venue: 'University Grandstand',
    timestamp: 'Day 1 • 08:40 AM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 1 • 08:42 AM',
    verifiedBy: 'Adviser Portal',
    day: 1,
  },
  {
    id: 'REC-D1-03',
    studentId: '2022-04819',
    studentName: 'Marcus Vance R. Alcantara',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro Opening Ceremonies & Parade',
    venue: 'University Grandstand',
    timestamp: 'Day 1 • 08:45 AM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 1 • 08:48 AM',
    verifiedBy: 'Adviser Portal',
    day: 1,
  },
  {
    id: 'REC-D1-04',
    studentId: '2022-03488',
    studentName: 'Kenneth Bryan S. Ramos',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro Opening Ceremonies & Parade',
    venue: 'University Grandstand',
    timestamp: 'Day 1 • No Scan Recorded',
    mode: 'manual',
    status: 'Absent',
    day: 1,
  },

  // DAY 2 (Live / Today - Thu, Sep 10: Elimination Rounds)
  {
    id: 'REC-D2-01',
    studentId: '2022-04819',
    studentName: 'Marcus Vance R. Alcantara',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 2 • 10:18 AM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg1,
    gpsCoords: 'WMSU Gym (Lat: 6.9214, Long: 122.0790)',
    day: 2,
  },
  {
    id: 'REC-D2-02',
    studentId: '2022-05184',
    studentName: 'Beatrice Marie L. Lopez',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 2 • 10:25 AM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 2 • 10:28 AM',
    verifiedBy: 'Adviser Portal',
    day: 2,
  },
  {
    id: 'REC-D2-03',
    studentId: '2022-01923',
    studentName: 'Samantha Nicole C. Reyes',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 2 • 10:20 AM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 2 • 10:22 AM',
    verifiedBy: 'Adviser Portal',
    day: 2,
  },
  {
    id: 'REC-D2-04',
    studentId: '2023-03102',
    studentName: 'Kevin Joshua D. Tan',
    course: 'BSIT',
    yearLevel: '3rd Year',
    section: 'BSIT 3-A',
    eventName: 'Volleyball Women vs CLA',
    venue: 'Covered Court B',
    timestamp: 'Day 2 • 01:45 PM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg2,
    gpsCoords: 'Court B (Lat: 6.9220, Long: 122.0785)',
    day: 2,
  },
  {
    id: 'REC-D2-05',
    studentId: '2022-06711',
    studentName: 'Angelique Faye P. Dizon',
    course: 'BSIT',
    yearLevel: '4th Year',
    section: 'BSIT 4-A',
    eventName: 'Badminton Doubles vs CCJE',
    venue: 'Covered Court A',
    timestamp: 'Day 2 • 11:15 AM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 2 • 11:20 AM',
    verifiedBy: 'Adviser Portal',
    day: 2,
  },
  {
    id: 'REC-D2-06',
    studentId: '2022-03488',
    studentName: 'Kenneth Bryan S. Ramos',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 2 • No Check-in Logged',
    mode: 'manual',
    status: 'Absent',
    day: 2,
  },
  {
    id: 'REC-D2-07',
    studentId: '2022-07721',
    studentName: 'Ralph Matthew G. Cruz',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Volleyball Women vs CLA',
    venue: 'Covered Court B',
    timestamp: 'Day 2 • Unexcused Absence',
    mode: 'manual',
    status: 'Absent',
    day: 2,
  },
  {
    id: 'REC-D2-08',
    studentId: '2024-00412',
    studentName: 'Christian Dave M. Torralba',
    course: 'ACT',
    yearLevel: '2nd Year',
    section: 'ACT 2-A',
    eventName: 'Basketball Men vs COE',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 2 • No Check-in Logged',
    mode: 'manual',
    status: 'Absent',
    day: 2,
  },

  // DAY 3 (Quarterfinals & Esports - Fri, Sep 11)
  {
    id: 'REC-D3-01',
    studentId: '2022-07721',
    studentName: 'Ralph Matthew G. Cruz',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Valorant Tournament Bracket Phase',
    venue: 'CCS Computer Lab 3',
    timestamp: 'Day 3 • 01:20 PM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 3 • 01:25 PM',
    verifiedBy: 'Adviser Portal',
    day: 3,
  },
  {
    id: 'REC-D3-02',
    studentId: '2024-00412',
    studentName: 'Christian Dave M. Torralba',
    course: 'ACT',
    yearLevel: '2nd Year',
    section: 'ACT 2-A',
    eventName: 'MLBB Esports vs CTE',
    venue: 'CCS Computer Lab 3',
    timestamp: 'Day 3 • 03:50 PM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg3,
    gpsCoords: 'CCS Lab 3 (Lat: 6.9209, Long: 122.0798)',
    day: 3,
  },
  {
    id: 'REC-D3-03',
    studentId: '2022-08819',
    studentName: 'Camille Joy T. Santos',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Chess Masters Classical',
    venue: 'Student Pavilion',
    timestamp: 'Day 3 • No Check-in',
    mode: 'manual',
    status: 'Absent',
    day: 3,
  },
  {
    id: 'REC-D3-04',
    studentId: '2022-09144',
    studentName: 'Angelo Kurt M. Navarro',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Valorant Tournament',
    venue: 'CCS Lab 3',
    timestamp: 'Day 3 • Unexcused',
    mode: 'manual',
    status: 'Absent',
    day: 3,
  },

  // DAY 4 (Semifinals & Track Athletics - Sat, Sep 12)
  {
    id: 'REC-D4-01',
    studentId: '2023-01822',
    studentName: 'Janelle Denise O. Bernardo',
    course: 'BSIT',
    yearLevel: '3rd Year',
    section: 'BSIT 3-A',
    eventName: 'Football Semifinals vs CLA',
    venue: 'Grandstand Football Field',
    timestamp: 'Day 4 • 02:15 PM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 4 • 02:20 PM',
    verifiedBy: 'Adviser Portal',
    day: 4,
  },
  {
    id: 'REC-D4-02',
    studentId: '2022-03488',
    studentName: 'Kenneth Bryan S. Ramos',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: '100m Track Sprint Finals',
    venue: 'Grandstand Oval',
    timestamp: 'Day 4 • 09:30 AM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg4,
    gpsCoords: 'Grandstand Oval (Lat: 6.9214, Long: 122.0790)',
    day: 4,
  },
  {
    id: 'REC-D4-03',
    studentId: '2022-07721',
    studentName: 'Ralph Matthew G. Cruz',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Football Semifinals vs CLA',
    venue: 'Grandstand Oval',
    timestamp: 'Day 4 • No Check-in',
    mode: 'manual',
    status: 'Absent',
    day: 4,
  },

  // DAY 5 (Championship Finals & Awarding - Sun, Sep 13)
  {
    id: 'REC-D5-01',
    studentId: '2022-08819',
    studentName: 'Camille Joy T. Santos',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro 2026 Championship Finals & Awarding',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 5 • 04:00 PM',
    mode: 'qr',
    status: 'Present',
    verifiedAt: 'Day 5 • 04:05 PM',
    verifiedBy: 'Adviser Portal',
    day: 5,
  },
  {
    id: 'REC-D5-02',
    studentId: '2022-09144',
    studentName: 'Angelo Kurt M. Navarro',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro 2026 Championship Finals & Awarding',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 5 • 03:45 PM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg1,
    gpsCoords: 'WMSU Gym (Lat: 6.9214, Long: 122.0790)',
    day: 5,
  },
  {
    id: 'REC-D5-03',
    studentId: '2023-01822',
    studentName: 'Janelle Denise O. Bernardo',
    course: 'BSIT',
    yearLevel: '3rd Year',
    section: 'BSIT 3-A',
    eventName: 'Palaro 2026 Championship Finals & Awarding',
    venue: 'WMSU Gymnasium',
    timestamp: 'Day 5 • Unexcused Absence',
    mode: 'manual',
    status: 'Absent',
    day: 5,
  },
];

export const AdviserAttendance: React.FC = () => {
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseYear, setSelectedCourseYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [previewPhotoRecord, setPreviewPhotoRecord] = useState<StudentAttendanceRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const triggerCelebrate = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#355935', '#5d8c55', '#22c55e', '#f59e0b'],
    });
  };

  // Verify single pending attendance
  const handleVerify = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Present',
              verifiedAt: 'Just Now',
              verifiedBy: 'Class Adviser',
            }
          : s
      )
    );

    if (previewPhotoRecord && previewPhotoRecord.id === id) {
      setPreviewPhotoRecord((prev) => (prev ? { ...prev, status: 'Present' } : null));
    }

    showToast(`Marked ${student?.studentName || 'Student'} as Present (Verified)!`);
    triggerCelebrate();
  };

  // Mark student as absent
  const handleMarkAbsent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Absent',
              verifiedAt: undefined,
              verifiedBy: undefined,
            }
          : s
      )
    );

    if (previewPhotoRecord && previewPhotoRecord.id === id) {
      setPreviewPhotoRecord((prev) => (prev ? { ...prev, status: 'Absent' } : null));
    }

    showToast(`Marked ${student?.studentName || 'Student'} as Absent`);
  };

  // Mark student as present (manual toggle)
  const handleMarkPresent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Present',
              verifiedAt: 'Manual Check',
              verifiedBy: 'Class Adviser',
            }
          : s
      )
    );
    showToast(`Marked ${student?.studentName || 'Student'} as Present!`);
    triggerCelebrate();
  };

  // Batch verify all pending in the active filter
  const handleBatchVerifyPending = () => {
    const pendingToVerify = students.filter(
      (s) => s.status === 'Pending' && (selectedDay === 'all' || s.day === selectedDay)
    );
    if (pendingToVerify.length === 0) {
      showToast('No pending attendance records to verify for this selection');
      return;
    }
    const idsToVerify = new Set(pendingToVerify.map((s) => s.id));

    setStudents((prev) =>
      prev.map((s) =>
        idsToVerify.has(s.id)
          ? {
              ...s,
              status: 'Present',
              verifiedAt: 'Just Now',
              verifiedBy: 'Class Adviser (Batch)',
            }
          : s
      )
    );

    showToast(`Batch verified ${pendingToVerify.length} pending student check-ins!`);
    triggerCelebrate();
  };

  // Active pool by selected day
  const currentPool = students.filter((s) => selectedDay === 'all' || s.day === selectedDay);

  // Filter logic (Search, Course, Status, Day)
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      student.studentName.toLowerCase().includes(query) ||
      student.studentId.toLowerCase().includes(query) ||
      student.section.toLowerCase().includes(query) ||
      student.eventName.toLowerCase().includes(query);

    const matchesCourseYear =
      selectedCourseYear === 'all' ||
      (selectedCourseYear === 'BSCS-4' && student.course === 'BSCS' && student.yearLevel === '4th Year') ||
      (selectedCourseYear === 'BSCS-3' && student.course === 'BSCS' && student.yearLevel === '3rd Year') ||
      (selectedCourseYear === 'BSIT-4' && student.course === 'BSIT' && student.yearLevel === '4th Year') ||
      (selectedCourseYear === 'BSIT-3' && student.course === 'BSIT' && student.yearLevel === '3rd Year') ||
      (selectedCourseYear === 'ACT-2' && student.course === 'ACT' && student.yearLevel === '2nd Year');

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'present' && student.status === 'Present') ||
      (selectedStatus === 'absent' && student.status === 'Absent') ||
      (selectedStatus === 'pending' && student.status === 'Pending');

    const matchesDay = selectedDay === 'all' || student.day === selectedDay;

    return matchesSearch && matchesCourseYear && matchesStatus && matchesDay;
  });

  // Telemetry counts based on the active day selection
  const totalCount = currentPool.length;
  const presentCount = currentPool.filter((s) => s.status === 'Present').length;
  const absentCount = currentPool.filter((s) => s.status === 'Absent').length;
  const pendingCount = currentPool.filter((s) => s.status === 'Pending').length;
  const complianceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-[#1f381f] text-white border border-[#4d7a4d] px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-mono font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Telemetry & Adviser Command Header */}
      <div className="bg-white rounded-2xl border border-[#c5d8c3] overflow-hidden shadow-xs">
        <div className="p-3.5 sm:p-5 space-y-3">
          {/* Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[9.5px] sm:text-[11px] font-mono border-b border-[#e5efe4] pb-2 sm:pb-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#355935] min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="font-bold tracking-wider uppercase truncate">
                FACULTY.ADVISER // ATTENDANCE VERIFICATION
              </span>
            </div>
            <div className="text-stone-400 font-mono text-[9px] sm:text-[10px] shrink-0">
              ASSIGNED SECTION: <span className="text-[#1f381f] font-bold">BSCS 4-B</span>
            </div>
          </div>

          {/* Title & Batch Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#edf5ec] text-[#254625] border border-[#c5d8c3] text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider">
                  ADVISER ROSTER
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">PALARO 2026</span>
              </div>
              <h1 className="text-base sm:text-xl font-black text-[#142614] tracking-tight uppercase font-display leading-tight">
                Student Attendance (Day 1 – 5)
              </h1>
              <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5 max-w-2xl leading-relaxed">
                Check who is present or absent across each Palaro tournament day and verify student check-ins.
              </p>
            </div>

            {/* Batch Verify Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleBatchVerifyPending}
                disabled={pendingCount === 0}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
                  pendingCount > 0
                    ? 'bg-[#355935] hover:bg-[#254625] text-white active:scale-95'
                    : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                }`}
              >
                <CheckCheck className="w-4 h-4 shrink-0" />
                <span>VERIFY ALL PENDING ({pendingCount})</span>
              </button>
            </div>
          </div>

          {/* Summary Metric Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-2 border-t border-[#e5efe4] text-center font-mono">
            <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-stone-500 uppercase block tracking-wider truncate">
                Total Logs
              </span>
              <span className="text-sm sm:text-lg font-black text-[#142614] block mt-0.5 truncate flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#5d8c55]" />
                {totalCount} Students
              </span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-300/80 rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-emerald-800 uppercase block tracking-wider font-semibold truncate">
                Present (There)
              </span>
              <span className="text-sm sm:text-lg font-black text-emerald-800 block mt-0.5 flex items-center justify-center gap-1 truncate">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                {presentCount} Present
              </span>
            </div>

            <div className="bg-rose-50/70 border border-rose-300/80 rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-rose-800 uppercase block tracking-wider font-semibold truncate">
                Absent
              </span>
              <span className="text-sm sm:text-lg font-black text-rose-800 block mt-0.5 flex items-center justify-center gap-1 truncate">
                <UserX className="w-3.5 h-3.5 text-rose-600" />
                {absentCount} Absent
              </span>
            </div>

            <div className="bg-amber-50/70 border border-amber-300/80 rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-amber-800 uppercase block tracking-wider font-semibold truncate">
                Pending Proofs
              </span>
              <span className="text-sm sm:text-lg font-black text-amber-700 block mt-0.5 flex items-center justify-center gap-1 truncate">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {pendingCount} Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DAY 1 - 5 ATTENDANCE SELECTOR & FILTER STRIP */}
      <div className="bg-white rounded-2xl border border-[#c5d8c3] p-3 sm:p-4 shadow-xs space-y-3">
        {/* Day 1 - 5 Schedule Tabs */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#355935] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5d8c55]" />
              Palaro Attendance Schedule (Days 1 – 5)
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-mono text-stone-400">
              {selectedDay === 'all' ? 'Showing All 5 Days' : `Filtering Day ${selectedDay}`}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Days', sub: 'Palaro 1–5' },
              { id: 1, label: 'Day 1', sub: 'Opening', date: 'Sep 9' },
              { id: 2, label: 'Day 2', sub: 'Today • Live', date: 'Sep 10', isToday: true },
              { id: 3, label: 'Day 3', sub: 'Quarters', date: 'Sep 11' },
              { id: 4, label: 'Day 4', sub: 'Semis', date: 'Sep 12' },
              { id: 5, label: 'Day 5', sub: 'Finals', date: 'Sep 13' },
            ].map((dayItem) => {
              const isSelected = selectedDay === dayItem.id;
              const countForDay =
                dayItem.id === 'all'
                  ? students.length
                  : students.filter((s) => s.day === dayItem.id).length;

              return (
                <button
                  key={dayItem.id}
                  type="button"
                  onClick={() => setSelectedDay(dayItem.id as number | 'all')}
                  className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-xl text-center transition-all border font-mono relative cursor-pointer ${
                    isSelected
                      ? 'bg-[#1f381f] text-white border-[#1f381f] shadow-xs ring-2 ring-[#355935]/20'
                      : 'bg-[#f8faf8] text-[#142614] border-[#c5d8c3] hover:border-[#5d8c55]'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-black">{dayItem.label}</span>
                    {dayItem.isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <span
                    className={`text-[8.5px] sm:text-[9.5px] font-sans truncate max-w-full font-medium ${
                      isSelected ? 'text-emerald-200' : 'text-stone-500'
                    }`}
                  >
                    {dayItem.sub}
                  </span>
                  <span
                    className={`text-[8px] sm:text-[8.5px] font-mono mt-0.5 px-1.5 py-0.2 rounded font-semibold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-200/60 text-stone-600'
                    }`}
                  >
                    {countForDay} records
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#edf2ec]" />

        {/* Presence & Absence Quick Filter Tabs */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[10px] text-stone-400 uppercase mr-1">Filter By:</span>
            {[
              { id: 'all', label: `All (${totalCount})` },
              { id: 'present', label: `Present (${presentCount})`, isPresent: true },
              { id: 'absent', label: `Absent (${absentCount})`, isAbsent: true },
              { id: 'pending', label: `Pending (${pendingCount})`, isPending: true },
            ].map((tab) => {
              const isSelected = selectedStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`px-2.5 py-1 rounded-xl font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? tab.isPresent
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : tab.isAbsent
                        ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                        : 'bg-[#1f381f] text-white border-[#1f381f] shadow-xs'
                      : 'bg-[#f8faf8] text-stone-700 border-[#c5d8c3] hover:border-[#5d8c55]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-[10.5px] font-mono text-stone-500">
            Attendance Rate: <span className="font-bold text-[#1f381f]">{complianceRate}%</span>
          </div>
        </div>

        {/* Search Input & Course Filter */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-2.5 items-stretch md:items-center justify-between pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by student name, ID (#2022-...), or section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-sans rounded-xl border border-[#c5d8c3] focus:outline-none focus:ring-2 focus:ring-[#355935]/30 focus:border-[#355935] bg-[#f8faf8] transition-all"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={selectedCourseYear}
              onChange={(e) => setSelectedCourseYear(e.target.value)}
              className="w-full md:w-auto px-3 py-2 rounded-xl text-xs font-mono font-medium border border-[#c5d8c3] bg-[#f8faf8] text-[#1f381f] focus:outline-none focus:border-[#355935] cursor-pointer"
            >
              <option value="all">All Courses & Sections</option>
              <option value="BSCS-4">BSCS • 4th Year (BSCS 4-B)</option>
              <option value="BSCS-3">BSCS • 3rd Year (BSCS 3-A)</option>
              <option value="BSIT-4">BSIT • 4th Year (BSIT 4-A)</option>
              <option value="BSIT-3">BSIT • 3rd Year (BSIT 3-A)</option>
              <option value="ACT-2">ACT • 2nd Year (ACT 2-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* STUDENT ATTENDANCE LIST (SHOWING WHO IS PRESENT AND ABSENT) */}
      <div className="space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#c5d8c3] p-8 text-center space-y-2">
            <Search className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="text-sm font-bold text-stone-700 font-display uppercase">No Student Records Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans">
              No students match the active Day {selectedDay !== 'all' ? selectedDay : ''} filter or status criteria.
            </p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const isPresent = student.status === 'Present';
            const isAbsent = student.status === 'Absent';
            const isPending = student.status === 'Pending';

            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-[#c5d8c3] hover:border-[#5d8c55]/80 transition-all p-3 sm:p-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Student Info Container */}
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                    {/* Avatar Circle */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${
                        student.course === 'BSCS'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : student.course === 'BSIT'
                          ? 'bg-blue-50 border-blue-300 text-blue-800'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                      }`}
                    >
                      {student.studentName
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Name & Day Label */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* Prominent Day 1-5 Label */}
                            <span className="font-mono text-[9px] sm:text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-[#edf5ec] text-[#254625] border border-[#c5d8c3] flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5 text-[#5d8c55]" />
                              DAY {student.day}
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-[#142614] leading-tight truncate">
                              {student.studentName}
                            </h3>
                          </div>
                          <span className="font-mono text-[9.5px] sm:text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 mt-1 inline-block">
                            #{student.studentId}
                          </span>
                        </div>

                        {/* Mobile Status Badge */}
                        <div className="sm:hidden shrink-0">
                          {isPresent && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[9.5px] font-mono font-bold">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              PRESENT
                            </span>
                          )}
                          {isAbsent && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-[9.5px] font-mono font-bold">
                              <XCircle className="w-2.5 h-2.5 text-rose-600" />
                              ABSENT
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[9.5px] font-mono font-bold">
                              <Clock className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                              PENDING
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Course, Year, Section */}
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span
                          className={`font-mono text-[9.5px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md border ${
                            student.course === 'BSCS'
                              ? 'bg-emerald-100/60 text-emerald-900 border-emerald-300/80'
                              : student.course === 'BSIT'
                              ? 'bg-blue-100/60 text-blue-900 border-blue-300/80'
                              : 'bg-amber-100/60 text-amber-900 border-amber-300/80'
                          }`}
                        >
                          {student.course}
                        </span>
                        <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold text-stone-600">
                          {student.yearLevel}
                        </span>
                        <span className="text-stone-300 font-mono text-[9.5px]">•</span>
                        <span className="font-mono text-[9.5px] sm:text-[10px] font-bold text-[#355935]">
                          {student.section}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-600 flex-wrap">
                        <span className="font-semibold text-stone-800 truncate">{student.eventName}</span>
                        <span className="text-stone-300">•</span>
                        <span className="flex items-center gap-1 text-[10.5px] sm:text-[11px] text-stone-500">
                          <MapPin className="w-3 h-3 text-[#355935] shrink-0" />
                          <span className="truncate">{student.venue}</span>
                        </span>
                        <span className="text-stone-300">•</span>
                        <span className="text-[10.5px] font-mono text-stone-400">{student.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Proof Bar */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0f4ef]">
                    {/* Proof Badge Trigger */}
                    <div>
                      {student.mode === 'qr' ? (
                        <div
                          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-600 text-[10px] font-mono"
                          title="Verified by Official QR Scanner"
                        >
                          <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#355935]" />
                          <span>QR SCAN</span>
                        </div>
                      ) : student.mode === 'photo' && student.photoUrl ? (
                        <button
                          type="button"
                          onClick={() => setPreviewPhotoRecord(student)}
                          className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-[#edf5ec] border border-[#c5d8c3] hover:border-[#355935] text-[#254625] text-[10px] font-mono font-medium transition-all cursor-pointer group"
                        >
                          <img
                            src={student.photoUrl}
                            alt="Proof"
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded object-cover border border-[#c5d8c3] shrink-0"
                          />
                          <Camera className="w-3 h-3 text-[#355935]" />
                          <span>PHOTO PROOF</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-stone-400 px-2 py-1 rounded-lg bg-stone-50 border border-stone-200">
                          MANUAL
                        </span>
                      )}
                    </div>

                    {/* Desktop Status Badge (Hidden on Mobile) */}
                    <div className="hidden sm:block">
                      {isPresent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          PRESENT
                        </span>
                      )}
                      {isAbsent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-[10px] font-mono font-bold">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          ABSENT
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-mono font-bold">
                          <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                          PENDING REVIEW
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: Toggle Present / Absent */}
                    <div className="flex items-center gap-1.5">
                      {isPending && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleVerify(student.id)}
                            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#355935] hover:bg-[#254625] text-white text-xs font-mono font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>VERIFY</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMarkAbsent(student.id)}
                            className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Mark as Absent"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {isPresent && (
                        <button
                          type="button"
                          onClick={() => handleMarkAbsent(student.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 hover:border-rose-300 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-[10.5px] font-mono transition-all cursor-pointer"
                          title="Click to change status to Absent"
                        >
                          <XCircle className="w-3 h-3 text-rose-500" />
                          <span>Mark Absent</span>
                        </button>
                      )}

                      {isAbsent && (
                        <button
                          type="button"
                          onClick={() => handleMarkPresent(student.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#edf5ec] border border-[#c5d8c3] hover:bg-[#d9ebd8] text-[#254625] text-[10.5px] font-mono font-bold transition-all cursor-pointer"
                          title="Click to mark student Present"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Mark Present</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Photo Proof Preview Modal */}
      {previewPhotoRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#c5d8c3] max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-5 border-b border-[#e5efe4] flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-2">
                <span className="text-[9.5px] sm:text-[10px] font-mono text-[#5d8c55] font-bold uppercase tracking-widest block truncate">
                  PHOTO PROOF // PALARO DAY {previewPhotoRecord.day}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#142614] leading-tight truncate">
                  {previewPhotoRecord.studentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhotoRecord(null)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3.5 sm:p-5 space-y-3 overflow-y-auto flex-1">
              <div className="relative rounded-2xl overflow-hidden border border-[#c5d8c3] bg-black max-h-[240px] sm:max-h-[260px] flex items-center justify-center">
                <img
                  src={previewPhotoRecord.photoUrl}
                  alt="Student Attendance Proof"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md rounded-xl p-2 text-white text-[10px] sm:text-[11px] font-mono flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{previewPhotoRecord.gpsCoords || 'Venue Verified'}</span>
                  </span>
                  <span className="text-stone-300 text-[9px] sm:text-[10px] shrink-0 ml-1">
                    {previewPhotoRecord.timestamp}
                  </span>
                </div>
              </div>

              {/* Student Year & Course Info Grid */}
              <div className="grid grid-cols-2 gap-2 bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-2.5 sm:p-3 text-[11px] sm:text-xs font-mono">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] text-stone-400 block uppercase">Course & Year</span>
                  <span className="font-bold text-[#142614]">
                    {previewPhotoRecord.course} • {previewPhotoRecord.yearLevel}
                  </span>
                </div>
                <div>
                  <span className="text-[9.5px] sm:text-[10px] text-stone-400 block uppercase">Section</span>
                  <span className="font-bold text-[#355935]">{previewPhotoRecord.section}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#e2ece0] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[9.5px] sm:text-[10px] text-stone-400 block uppercase">Match / Event</span>
                    <span className="font-semibold text-stone-800 truncate block">
                      {previewPhotoRecord.eventName}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#edf5ec] text-[#254625] border border-[#c5d8c3] shrink-0">
                    Day {previewPhotoRecord.day} of 5
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-5 bg-[#f8faf8] border-t border-[#e5efe4] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10.5px] sm:text-[11px] font-mono text-stone-500">Status:</span>
                <span
                  className={`font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    previewPhotoRecord.status === 'Present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : previewPhotoRecord.status === 'Absent'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {previewPhotoRecord.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkAbsent(previewPhotoRecord.id)}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  Mark Absent
                </button>
                <button
                  type="button"
                  onClick={() => handleVerify(previewPhotoRecord.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#355935] hover:bg-[#254625] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify Present</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviserAttendance;

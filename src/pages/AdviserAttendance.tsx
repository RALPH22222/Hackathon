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
  RotateCcw,
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
  mode: 'qr' | 'photo';
  status: 'Verified' | 'Pending' | 'Rejected';
  photoUrl?: string;
  gpsCoords?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

const initialStudents: StudentAttendanceRecord[] = [
  {
    id: 'REC-001',
    studentId: '2022-04819',
    studentName: 'Marcus Vance R. Alcantara',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Today, 10:18 AM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg1,
    gpsCoords: 'WMSU Gym (Lat: 6.9214, Long: 122.0790)',
  },
  {
    id: 'REC-002',
    studentId: '2022-01923',
    studentName: 'Samantha Nicole C. Reyes',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro 2026 Opening Ceremonies',
    venue: 'University Grandstand',
    timestamp: 'Today, 08:32 AM',
    mode: 'qr',
    status: 'Verified',
    verifiedAt: 'Today, 08:35 AM',
    verifiedBy: 'Adviser Portal',
  },
  {
    id: 'REC-003',
    studentId: '2023-03102',
    studentName: 'Kevin Joshua D. Tan',
    course: 'BSIT',
    yearLevel: '3rd Year',
    section: 'BSIT 3-A',
    eventName: 'Volleyball Women vs CLA',
    venue: 'Covered Court B',
    timestamp: 'Today, 01:45 PM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg2,
    gpsCoords: 'Court B (Lat: 6.9220, Long: 122.0785)',
  },
  {
    id: 'REC-004',
    studentId: '2022-05184',
    studentName: 'Beatrice Marie L. Lopez',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Today, 10:25 AM',
    mode: 'qr',
    status: 'Verified',
    verifiedAt: 'Today, 10:28 AM',
    verifiedBy: 'Adviser Portal',
  },
  {
    id: 'REC-005',
    studentId: '2024-00412',
    studentName: 'Christian Dave M. Torralba',
    course: 'ACT',
    yearLevel: '2nd Year',
    section: 'ACT 2-A',
    eventName: 'MLBB Esports vs CTE',
    venue: 'CCS Computer Lab 3',
    timestamp: 'Today, 03:50 PM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg3,
    gpsCoords: 'CCS Lab 3 (Lat: 6.9209, Long: 122.0798)',
  },
  {
    id: 'REC-006',
    studentId: '2022-06711',
    studentName: 'Angelique Faye P. Dizon',
    course: 'BSIT',
    yearLevel: '4th Year',
    section: 'BSIT 4-A',
    eventName: 'Badminton Doubles vs CCJE',
    venue: 'Covered Court A',
    timestamp: 'Today, 11:15 AM',
    mode: 'qr',
    status: 'Verified',
    verifiedAt: 'Today, 11:20 AM',
    verifiedBy: 'Adviser Portal',
  },
  {
    id: 'REC-007',
    studentId: '2022-03488',
    studentName: 'Kenneth Bryan S. Ramos',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Basketball Men vs COE (Opening Round)',
    venue: 'WMSU Gymnasium',
    timestamp: 'Today, 10:30 AM',
    mode: 'photo',
    status: 'Pending',
    photoUrl: proofImg4,
    gpsCoords: 'WMSU Gym (Lat: 6.9214, Long: 122.0790)',
  },
  {
    id: 'REC-008',
    studentId: '2022-02941',
    studentName: 'Patricia Anne B. Lim',
    course: 'BSCS',
    yearLevel: '4th Year',
    section: 'BSCS 4-B',
    eventName: 'Palaro 2026 Opening Ceremonies',
    venue: 'University Grandstand',
    timestamp: 'Today, 08:40 AM',
    mode: 'qr',
    status: 'Verified',
    verifiedAt: 'Today, 08:42 AM',
    verifiedBy: 'Adviser Portal',
  },
];

export const AdviserAttendance: React.FC = () => {
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseYear, setSelectedCourseYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
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

  const handleVerify = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Verified',
              verifiedAt: 'Just Now',
              verifiedBy: 'Class Adviser',
            }
          : s
      )
    );

    if (previewPhotoRecord && previewPhotoRecord.id === id) {
      setPreviewPhotoRecord((prev) => (prev ? { ...prev, status: 'Verified' } : null));
    }

    showToast(`Attendance verified for ${student?.studentName || 'Student'}`);
    triggerCelebrate();
  };

  const handleReject = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Rejected',
              verifiedAt: undefined,
              verifiedBy: undefined,
            }
          : s
      )
    );

    if (previewPhotoRecord && previewPhotoRecord.id === id) {
      setPreviewPhotoRecord((prev) => (prev ? { ...prev, status: 'Rejected' } : null));
    }

    showToast(`Marked ${student?.studentName || 'Student'} as Rejected/Needs Review`);
  };

  const handleResetToPending = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Pending',
              verifiedAt: undefined,
              verifiedBy: undefined,
            }
          : s
      )
    );
    showToast('Reset verification status to Pending');
  };

  const handleBatchVerifyPending = () => {
    const pendingCount = students.filter((s) => s.status === 'Pending').length;
    if (pendingCount === 0) {
      showToast('No pending attendance records to verify');
      return;
    }

    setStudents((prev) =>
      prev.map((s) =>
        s.status === 'Pending'
          ? {
              ...s,
              status: 'Verified',
              verifiedAt: 'Just Now',
              verifiedBy: 'Class Adviser (Batch)',
            }
          : s
      )
    );

    showToast(`Batch verified ${pendingCount} pending student check-ins!`);
    triggerCelebrate();
  };

  // Filter logic
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
      selectedStatus === 'all' || student.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCourseYear && matchesStatus;
  });

  const totalCount = students.length;
  const pendingCount = students.filter((s) => s.status === 'Pending').length;
  const verifiedCount = students.filter((s) => s.status === 'Verified').length;
  const complianceRate = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;

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
                FACULTY.ADVISER // VERIFICATION
              </span>
            </div>
            <div className="text-stone-400 font-mono text-[9px] sm:text-[10px] shrink-0">
              ASSIGNED: <span className="text-[#1f381f] font-bold">BSCS 4-B</span>
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
                Student Attendance Verification
              </h1>
              <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5 max-w-2xl leading-relaxed">
                Review submitted check-ins, verify attendance proof (QR scans & photo geo-tags), and monitor your advisees&apos; milestones.
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
              <span className="text-[8.5px] sm:text-[9.5px] text-stone-500 uppercase block tracking-wider truncate">Total Enrolled</span>
              <span className="text-sm sm:text-lg font-black text-[#142614] block mt-0.5 truncate">{totalCount} Students</span>
            </div>

            <div className="bg-[#f8faf8] border border-amber-200/80 rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-amber-700 uppercase block tracking-wider font-semibold truncate">Pending</span>
              <span className="text-sm sm:text-lg font-black text-amber-600 block mt-0.5 flex items-center justify-center gap-1 truncate">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                {pendingCount} Pending
              </span>
            </div>

            <div className="bg-[#f8faf8] border border-[#c5d8c3] rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-[#355935] uppercase block tracking-wider font-semibold truncate">Verified</span>
              <span className="text-sm sm:text-lg font-black text-[#254625] block mt-0.5 flex items-center justify-center gap-1 truncate">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                {verifiedCount} Verified
              </span>
            </div>

            <div className="bg-[#f8faf8] border border-[#e2ece0] rounded-xl p-2 sm:p-2.5">
              <span className="text-[8.5px] sm:text-[9.5px] text-stone-500 uppercase block tracking-wider truncate">Compliance</span>
              <span className="text-sm sm:text-lg font-black text-[#142614] block mt-0.5 truncate">{complianceRate}% Met</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#c5d8c3] p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-2 sm:gap-2.5 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by student name, ID, or section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-sans rounded-xl border border-[#c5d8c3] focus:outline-none focus:ring-2 focus:ring-[#355935]/30 focus:border-[#355935] bg-[#f8faf8] transition-all"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
            {/* Course & Year Filter */}
            <select
              value={selectedCourseYear}
              onChange={(e) => setSelectedCourseYear(e.target.value)}
              className="w-full sm:w-auto px-2.5 sm:px-3 py-2 rounded-xl text-xs font-mono font-medium border border-[#c5d8c3] bg-[#f8faf8] text-[#1f381f] focus:outline-none focus:border-[#355935] cursor-pointer truncate"
            >
              <option value="all">All Courses & Years</option>
              <option value="BSCS-4">BSCS • 4th Year (BSCS 4-B)</option>
              <option value="BSCS-3">BSCS • 3rd Year (BSCS 3-A)</option>
              <option value="BSIT-4">BSIT • 4th Year (BSIT 4-A)</option>
              <option value="BSIT-3">BSIT • 3rd Year (BSIT 3-A)</option>
              <option value="ACT-2">ACT • 2nd Year (ACT 2-A)</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto px-2.5 sm:px-3 py-2 rounded-xl text-xs font-mono font-medium border border-[#c5d8c3] bg-[#f8faf8] text-[#1f381f] focus:outline-none focus:border-[#355935] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#c5d8c3] p-8 text-center space-y-2">
            <Search className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="text-sm font-bold text-stone-700 font-display uppercase">No Students Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans">
              No student records matched your search query or selected course and status filters.
            </p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const isPending = student.status === 'Pending';
            const isVerified = student.status === 'Verified';
            const isRejected = student.status === 'Rejected';

            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-[#c5d8c3] hover:border-[#5d8c55]/80 transition-all p-3 sm:p-4 shadow-xs"
              >
                {/* Mobile & Tablet Card Layout */}
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
                      {/* Name, ID & Mobile Status Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-[#142614] leading-tight truncate">
                            {student.studentName}
                          </h3>
                          <span className="font-mono text-[9.5px] sm:text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 mt-0.5 inline-block">
                            #{student.studentId}
                          </span>
                        </div>

                        {/* Status Badge (Visible on Mobile here) */}
                        <div className="sm:hidden shrink-0">
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[9.5px] font-mono font-bold">
                              <Clock className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                              PENDING
                            </span>
                          )}
                          {isVerified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[9.5px] font-mono font-bold">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              VERIFIED
                            </span>
                          )}
                          {isRejected && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-[9.5px] font-mono font-bold">
                              <XCircle className="w-2.5 h-2.5 text-rose-600" />
                              REJECTED
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Course, Year, and Section */}
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
                    {/* Proof Trigger */}
                    <div>
                      {student.mode === 'qr' ? (
                        <div
                          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-600 text-[10px] font-mono"
                          title="Verified by Official Palaro QR Scanner"
                        >
                          <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#355935]" />
                          <span>QR TOKEN</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPreviewPhotoRecord(student)}
                          className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-[#edf5ec] border border-[#c5d8c3] hover:border-[#355935] text-[#254625] text-[10px] font-mono font-medium transition-all cursor-pointer group"
                        >
                          {student.photoUrl && (
                            <img
                              src={student.photoUrl}
                              alt="Proof"
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded object-cover border border-[#c5d8c3] shrink-0"
                            />
                          )}
                          <Camera className="w-3 h-3 text-[#355935]" />
                          <span>PHOTO PROOF</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                        </button>
                      )}
                    </div>

                    {/* Desktop Status Badge (Hidden on Mobile) */}
                    <div className="hidden sm:block">
                      {isPending && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-mono font-bold">
                          <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                          PENDING
                        </span>
                      )}
                      {isVerified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          VERIFIED
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-[10px] font-mono font-bold">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          REJECTED
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
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
                            onClick={() => handleReject(student.id)}
                            className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Reject Attendance"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {isVerified && (
                        <button
                          type="button"
                          onClick={() => handleResetToPending(student.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-[10px] font-mono transition-all cursor-pointer"
                          title="Undo Verification"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Undo</span>
                        </button>
                      )}

                      {isRejected && (
                        <button
                          type="button"
                          onClick={() => handleVerify(student.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[10.5px] font-mono font-bold transition-all hover:bg-emerald-700 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>RE-VERIFY</span>
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
                  PHOTO PROOF // #{previewPhotoRecord.studentId}
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

            {/* Modal Body: Scrollable Image & Metadata */}
            <div className="p-3.5 sm:p-5 space-y-3 overflow-y-auto flex-1">
              {/* Photo */}
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
                  <span className="text-stone-300 text-[9px] sm:text-[10px] shrink-0 ml-1">{previewPhotoRecord.timestamp}</span>
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
                <div className="col-span-2 pt-1 border-t border-[#e2ece0]">
                  <span className="text-[9.5px] sm:text-[10px] text-stone-400 block uppercase">Match / Event</span>
                  <span className="font-semibold text-stone-800 truncate block">{previewPhotoRecord.eventName}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3.5 sm:p-5 bg-[#f8faf8] border-t border-[#e5efe4] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10.5px] sm:text-[11px] font-mono text-stone-500">Status:</span>
                <span
                  className={`font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    previewPhotoRecord.status === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : previewPhotoRecord.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {previewPhotoRecord.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {previewPhotoRecord.status !== 'Verified' && (
                  <button
                    type="button"
                    onClick={() => handleVerify(previewPhotoRecord.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#355935] hover:bg-[#254625] text-white text-xs font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>VERIFY ATTENDANCE</span>
                  </button>
                )}
                {previewPhotoRecord.status === 'Verified' && (
                  <button
                    type="button"
                    onClick={() => handleResetToPending(previewPhotoRecord.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-200 text-xs font-mono font-semibold transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>REVOKE</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviserAttendance;

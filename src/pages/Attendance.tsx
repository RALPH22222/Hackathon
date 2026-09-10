import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { AttendanceRecord, PalaroEventItem } from '../components/attendance/types';
import { AttendanceHeader } from '../components/attendance/AttendanceHeader';
import { ProcessGuideBanner } from '../components/attendance/ProcessGuideBanner';
import { AttendanceTabSelector } from '../components/attendance/AttendanceTabSelector';
import { EventAttendanceList } from '../components/attendance/EventAttendanceList';
import { CameraWatermarkModal } from '../components/attendance/CameraWatermarkModal';
import { QrScannerSection } from '../components/attendance/QrScannerSection';
import { AttendanceHistoryLog } from '../components/attendance/AttendanceHistoryLog';

const MOCK_PALARO_EVENTS: PalaroEventItem[] = [
  {
    id: 'evt-1',
    title: 'Palaro 2026 Opening & Track Athletics',
    category: 'ATHLETICS',
    venue: 'CCS Main Oval - Track & Field',
    time: 'Today • 08:30 AM - 12:00 PM',
    status: 'Live Now',
    isAttendanceRequired: true,
  },
  {
    id: 'evt-2',
    title: "CCS Basketball vs Titans (Finals)",
    category: 'BASKETBALL',
    venue: 'University Gymnasium - Court A',
    time: 'Today • 02:00 PM - 04:30 PM',
    status: 'Live Now',
    isAttendanceRequired: true,
  },
  {
    id: 'evt-3',
    title: "Women's Volleyball Semi-Finals vs CLA Phoenix",
    category: 'VOLLEYBALL',
    venue: 'Covered Court B',
    time: 'Today • 04:30 PM - 06:30 PM',
    status: 'Upcoming',
  },
  {
    id: 'evt-4',
    title: 'CCS Esports Tournament - Valorant Finals',
    category: 'ESPORTS',
    venue: 'CCS Computer Laboratory 3',
    time: 'Today • 06:00 PM - 08:30 PM',
    status: 'Upcoming',
  },
];

const INITIAL_RECORDS: AttendanceRecord[] = [
  {
    id: 'ATT-9021',
    eventName: 'Palaro 2026 Opening & Track Athletics',
    venue: 'CCS Main Oval - Track & Field',
    timestamp: 'Sep 10, 2026 • 08:30 AM',
    mode: 'qr',
    status: 'Verified',
  },
  {
    id: 'ATT-8842',
    eventName: "CCS Men's Basketball vs COE Titans (Finals)",
    venue: 'University Gymnasium',
    timestamp: 'Sep 09, 2026 • 02:15 PM',
    mode: 'photo',
    status: 'Verified',
    photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80',
  },
];

export function Attendance() {
  const [activeTab, setActiveTab] = useState<'qr' | 'photo'>('photo');

  const [selectedEventForCamera, setSelectedEventForCamera] = useState<PalaroEventItem | null>(null);
  const [selectedEventForQR, setSelectedEventForQR] = useState<PalaroEventItem | null>(null);
  const [qrMessage, setQrMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Live Location & Timestamp state
  const [currentTime, setCurrentTime] = useState<string>('');
  const [gpsLocation, setGpsLocation] = useState<string>('Locating GPS...');

  // Attendance History State with LocalStorage Persistence
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('palaro_attendance_records');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load attendance records from localStorage', e);
    }
    return INITIAL_RECORDS;
  });

  // Save to localStorage whenever records update
  useEffect(() => {
    try {
      localStorage.setItem('palaro_attendance_records', JSON.stringify(records));
    } catch (e) {
      console.warn('Failed to save attendance records to localStorage', e);
    }
  }, [records]);

  // Real-time timestamp update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted =
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }) +
        ' • ' +
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    const locationTimer = setTimeout(() => {
      setGpsLocation('CCS Main Complex - Lat: 14.5995, Long: 120.9842');
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(locationTimer);
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#355935', '#5d8c55', '#edf5ec', '#22c55e', '#f59e0b'],
    });
  };

  const handleOpenSelfieCamera = (event: PalaroEventItem) => {
    setSelectedEventForCamera(event);
  };

  const handleConfirmWatermarkedSelfie = (photoUrl: string) => {
    if (!selectedEventForCamera) return;

    const newRec: AttendanceRecord = {
      id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
      eventName: selectedEventForCamera.title,
      venue: selectedEventForCamera.venue,
      timestamp: currentTime || 'Just Now',
      mode: 'photo',
      status: 'Verified',
      photoUrl: photoUrl,
      locationDetails: gpsLocation,
    };

    setRecords([newRec, ...records]);
    setSelectedEventForCamera(null);
    triggerConfetti();
  };

  const handleOpenQRScanner = (event: PalaroEventItem) => {
    setSelectedEventForQR(event);
    setActiveTab('qr');
  };

  // Real QR Code Decoded Payload Handler
  const handleRealQrScanned = (decodedPayload: string) => {
    const parts = decodedPayload.split(':');
    const parsedEventTitle =
      parts.length >= 3
        ? parts.slice(2).join(':')
        : selectedEventForQR
        ? selectedEventForQR.title
        : 'Palaro 2026 Live Session';

    const newRec: AttendanceRecord = {
      id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
      eventName: parsedEventTitle,
      venue: selectedEventForQR ? selectedEventForQR.venue : 'CCS Main Complex',
      timestamp: currentTime || 'Just Now',
      mode: 'qr',
      status: 'Verified',
      locationDetails: gpsLocation,
    };

    setRecords([newRec, ...records]);
    setQrMessage({
      type: 'success',
      text: `QR VERIFICATION SUCCESS! Attendance confirmed for: "${parsedEventTitle}"`,
    });
    triggerConfetti();
  };

  const handleManualQRSubmit = (code: string) => {
    if (code.trim().length >= 4) {
      const newRec: AttendanceRecord = {
        id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: selectedEventForQR ? selectedEventForQR.title : 'Palaro 2026 Event Session',
        venue: selectedEventForQR ? selectedEventForQR.venue : 'CCS Main Complex',
        timestamp: currentTime || 'Just Now',
        mode: 'qr',
        status: 'Verified',
      };

      setRecords([newRec, ...records]);
      setQrMessage({
        type: 'success',
        text: `Success! Attendance verified for Event Code: ${code.toUpperCase()}`,
      });
      triggerConfetti();
    } else {
      setQrMessage({
        type: 'error',
        text: 'Invalid Event Code. Please enter at least 4 characters.',
      });
    }
  };

  const attendedEventTitles = records.map((r) => r.eventName);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Header Banner */}
      <AttendanceHeader totalCheckIns={records.length} />

      {/* 2. Process Guide Banner */}
      <ProcessGuideBanner />

      {/* 3. Mode Selector Navigation Tabs */}
      <AttendanceTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 4. Mode A: Event List & Camera Selfie Mode (Default) */}
      {activeTab === 'photo' && (
        <EventAttendanceList
          events={MOCK_PALARO_EVENTS}
          attendedEventIds={attendedEventTitles}
          onOpenSelfieCamera={handleOpenSelfieCamera}
          onOpenQRScanner={handleOpenQRScanner}
        />
      )}

      {/* 5. Mode B: QR Code Scanning Mode */}
      {activeTab === 'qr' && (
        <QrScannerSection
          selectedEvent={selectedEventForQR}
          onManualSubmit={handleManualQRSubmit}
          onRealQrScanned={handleRealQrScanned}
          onSwitchToSelfie={() => setActiveTab('photo')}
          message={qrMessage}
        />
      )}

      {/* 6. Attendance History Log */}
      <AttendanceHistoryLog records={records} />

      {/* Camera Watermark Modal */}
      {selectedEventForCamera && (
        <CameraWatermarkModal
          event={selectedEventForCamera}
          currentTime={currentTime}
          gpsLocation={gpsLocation}
          onClose={() => setSelectedEventForCamera(null)}
          onConfirmAttendance={handleConfirmWatermarkedSelfie}
        />
      )}
    </div>
  );
}

export default Attendance;

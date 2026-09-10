import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { AttendanceRecord } from '../components/attendance/types';

import { AttendanceHeader } from '../components/attendance/AttendanceHeader';
import { AttendanceTabSelector } from '../components/attendance/AttendanceTabSelector';
import { QrScannerSection } from '../components/attendance/QrScannerSection';
import { PhotoProofSection } from '../components/attendance/PhotoProofSection';
import { AttendanceHistoryLog } from '../components/attendance/AttendanceHistoryLog';

export function Attendance() {
  const [activeTab, setActiveTab] = useState<'qr' | 'photo'>('qr');
  const [qrMessage, setQrMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Live Location & Timestamp state
  const [currentTime, setCurrentTime] = useState<string>('');
  const [gpsLocation, setGpsLocation] = useState<string>('Locating GPS...');

  // Attendance History State
  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 'ATT-9021',
      eventName: 'Palaro 2026 Opening Ceremonies',
      venue: 'University Grandstand',
      timestamp: 'Sep 10, 2026 • 08:30 AM',
      mode: 'qr',
      status: 'Verified',
    },
    {
      id: 'ATT-8842',
      eventName: 'Venom Basketball vs Titans',
      venue: 'CCS Gymnasium',
      timestamp: 'Sep 09, 2026 • 02:15 PM',
      mode: 'photo',
      status: 'Verified',
      photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80',
    },
  ]);

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
          second: '2-digit',
        });
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    const locationTimer = setTimeout(() => {
      setGpsLocation('CCS Main Complex (Lat: 14.5995, Long: 120.9842)');
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(locationTimer);
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#355935', '#5d8c55', '#edf5ec', '#f59e0b'],
    });
  };

  const handleManualQRSubmit = (code: string) => {
    if (code.trim().length >= 4) {
      const newRec: AttendanceRecord = {
        id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: 'Palaro 2026 Live Event Session',
        venue: 'CCS Main Oval - Track & Field',
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

  const handleSimulatedScan = () => {
    const newRec: AttendanceRecord = {
      id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
      eventName: 'Venom Esports Championship Finals',
      venue: 'CCS Computer Lab 3',
      timestamp: currentTime || 'Just Now',
      mode: 'qr',
      status: 'Verified',
    };

    setRecords([newRec, ...records]);
    setQrMessage({
      type: 'success',
      text: 'QR Code Scanned Successfully! Verified by Palaro Marshal Server.',
    });
    triggerConfetti();
  };

  const handlePhotoSubmit = (event: string, venue: string, imageUrl: string) => {
    const newRec: AttendanceRecord = {
      id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
      eventName: event,
      venue: venue,
      timestamp: currentTime || 'Just Now',
      mode: 'photo',
      status: 'Verified',
      photoUrl: imageUrl,
    };

    setRecords([newRec, ...records]);
    triggerConfetti();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Header Banner */}
      <AttendanceHeader totalCheckIns={records.length} />

      {/* 2. Mode Selector Navigation Tabs */}
      <AttendanceTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. Mode A: QR Scanner View */}
      {activeTab === 'qr' && (
        <QrScannerSection
          onManualSubmit={handleManualQRSubmit}
          onSimulatedScan={handleSimulatedScan}
          message={qrMessage}
        />
      )}

      {/* 4. Mode B: Photo Proof Upload View */}
      {activeTab === 'photo' && (
        <PhotoProofSection
          currentTime={currentTime}
          gpsLocation={gpsLocation}
          onSubmitPhoto={handlePhotoSubmit}
        />
      )}

      {/* 5. Attendance History Log */}
      <AttendanceHistoryLog records={records} />
    </div>
  );
}

export default Attendance;

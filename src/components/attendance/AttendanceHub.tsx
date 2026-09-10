import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Camera,
  Upload,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Zap,
  AlertCircle,
  FileCheck,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AttendanceRecord {
  id: string;
  eventName: string;
  venue: string;
  timestamp: string;
  mode: 'qr' | 'photo';
  status: 'Verified' | 'Pending Review';
  photoUrl?: string;
}

export const AttendanceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'qr' | 'photo'>('qr');
  
  // QR Code Form State
  const [manualCode, setManualCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [qrMessage, setQrMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Photo Upload Form State
  const [selectedVenue, setSelectedVenue] = useState<string>('CCS Main Oval - Track & Field');
  const [selectedEvent, setSelectedEvent] = useState<string>('Palaro 2026 Opening & Athletics');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmittingPhoto, setIsSubmittingPhoto] = useState<boolean>(false);

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

  // Modal / Preview state for uploaded photo
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Real-time timestamp update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }) + ' • ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Simulate GPS detection
    const locationTimer = setTimeout(() => {
      setGpsLocation('CCS Main Complex (Lat: 14.5995, Long: 120.9842)');
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(locationTimer);
    };
  }, []);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#355935', '#5d8c55', '#edf5ec', '#f59e0b'],
    });
  };

  // Handle Manual QR Code Submission
  const handleQRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    if (manualCode.trim().length >= 4) {
      const newRec: AttendanceRecord = {
        id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: 'Palaro 2026 Live Event Session',
        venue: selectedVenue,
        timestamp: currentTime || 'Just Now',
        mode: 'qr',
        status: 'Verified',
      };

      setRecords([newRec, ...records]);
      setQrMessage({ type: 'success', text: `Success! Attendance verified for Event Code: ${manualCode.toUpperCase()}` });
      setManualCode('');
      triggerConfetti();
    } else {
      setQrMessage({ type: 'error', text: 'Invalid Event Code. Please enter at least 4 characters.' });
    }
  };

  // Simulate Instant QR Scan Trigger
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
    setQrMessage({ type: 'success', text: 'QR Code Scanned Successfully! Verified by Palaro Marshal Server.' });
    triggerConfetti();
  };

  // Handle Photo File Select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Photo Proof
  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) return;

    setIsSubmittingPhoto(true);

    setTimeout(() => {
      const newRec: AttendanceRecord = {
        id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: selectedEvent,
        venue: selectedVenue,
        timestamp: currentTime || 'Just Now',
        mode: 'photo',
        status: 'Verified',
        photoUrl: uploadedImage,
      };

      setRecords([newRec, ...records]);
      setIsSubmittingPhoto(false);
      setUploadedImage(null);
      triggerConfetti();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* 1. Header Banner */}
      <div className="minimal-card rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#f7faf6] to-[#edf5ec] border border-[#c5d8c3]/80 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-[#355935]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf5ec] border border-[#5d8c55]/30 text-[#1f381f] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#355935]" />
              <span>Official Palaro 2026 Check-in System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f381f] font-display tracking-tight">
              Student Attendance Hub
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              Verify your attendance for official Palaro sports and college events by scanning the event QR code or uploading a timestamped photo proof.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#c5d8c3]/60 shadow-xs shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1f381f] to-[#355935] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {records.length}
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Total Check-ins</p>
              <p className="text-sm font-bold text-[#1f381f] flex items-center gap-1">
                <span>Verified Status</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mode Selector Navigation Tabs */}
      <div className="minimal-card p-1.5 rounded-2xl bg-white border border-[#c5d8c3]/60 shadow-xs">
        <div className="grid grid-cols-2 gap-2">
          
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-gradient-to-r from-[#1f381f] to-[#355935] text-white shadow-sm'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-stone-100/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Event QR</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'photo'
                ? 'bg-gradient-to-r from-[#1f381f] to-[#355935] text-white shadow-sm'
                : 'text-stone-600 hover:text-[#1f381f] hover:bg-stone-100/60'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Upload Photo Proof</span>
          </button>

        </div>
      </div>

      {/* 3. MODE A: QR SCANNER VIEW */}
      {activeTab === 'qr' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Live Scanner Box */}
          <div className="md:col-span-7 minimal-card rounded-3xl p-6 bg-white border border-[#c5d8c3]/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-[#1f381f] text-base">Camera Viewfinder</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsScanning(!isScanning)}
                className="text-xs font-semibold text-[#355935] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isScanning ? 'Reset Scanner' : 'Activate Camera'}</span>
              </button>
            </div>

            {/* Interactive Scanner Frame */}
            <div className="relative aspect-square max-w-sm mx-auto bg-stone-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-stone-800">
              {/* Background Mock Camera Feed */}
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col items-center justify-center p-6 text-center text-white/70 space-y-3">
                <QrCode className="w-24 h-24 stroke-[1] text-white/20 animate-pulse" />
                <p className="text-xs text-stone-400 max-w-xs">
                  Position the event QR code within the frame to verify automatically
                </p>
              </div>

              {/* Scanning Target Reticle & Laser Line */}
              {isScanning && (
                <div className="relative w-64 h-64 border-2 border-dashed border-emerald-400/70 rounded-2xl flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                  
                  {/* Animated Laser Scan Line */}
                  <div className="absolute top-0 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-[bounce_2s_infinite]" />
                </div>
              )}

              {/* Trigger Instant Mock Scan Button */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <button
                  type="button"
                  onClick={handleSimulatedScan}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Simulate QR Scan Match</span>
                </button>
              </div>
            </div>

            {/* Notification alert */}
            {qrMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  qrMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {qrMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{qrMessage.text}</span>
              </div>
            )}
          </div>

          {/* Right Column: Manual Code Input & Instructions */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Manual Code Input Card */}
            <div className="minimal-card rounded-3xl p-6 bg-white border border-[#c5d8c3]/60 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-[#1f381f] text-base">Enter Event Code</h3>
                <p className="text-xs text-stone-500">
                  Having camera issues? Enter the 4 or 6-character event passcode displayed by your event marshal.
                </p>
              </div>

              <form onSubmit={handleQRSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Event Passcode
                  </label>
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g. PALARO-2026"
                    className="w-full minimal-input px-3.5 py-2.5 rounded-xl text-sm font-mono tracking-wider upper"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full minimal-btn py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Code Attendance</span>
                </button>
              </form>
            </div>

            {/* Quick Rules Box */}
            <div className="p-5 rounded-3xl bg-[#edf5ec]/70 border border-[#c5d8c3]/80 space-y-3">
              <h4 className="text-xs font-bold text-[#1f381f] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#355935]" />
                <span>Attendance Verification Tips</span>
              </h4>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside leading-relaxed">
                <li>Check-in is required within 30 minutes of event start time.</li>
                <li>QR codes refresh automatically every 2 minutes at match venues.</li>
                <li>Multiple check-ins per event session are consolidated automatically.</li>
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* 4. MODE B: PHOTO PROOF UPLOAD VIEW */}
      {activeTab === 'photo' && (
        <div className="minimal-card rounded-3xl p-6 sm:p-8 bg-white border border-[#c5d8c3]/60 space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-[#1f381f] text-lg">Upload Event Attendance Photo Proof</h3>
            <p className="text-xs text-stone-500">
              Take or select a clear photo of yourself at the Palaro venue with the event backdrop or marshals visible.
            </p>
          </div>

          <form onSubmit={handlePhotoSubmit} className="space-y-6">
            
            {/* Auto Metadata Preview Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#edf5ec]/60 border border-[#c5d8c3]/60 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#355935] shrink-0" />
                <div>
                  <span className="text-stone-500 block text-[10px]">Captured Timestamp</span>
                  <span className="font-mono font-bold text-[#1f381f]">{currentTime || 'Loading...'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#355935] shrink-0" />
                <div>
                  <span className="text-stone-500 block text-[10px]">Detected Geolocation</span>
                  <span className="font-semibold text-[#1f381f] truncate block">{gpsLocation}</span>
                </div>
              </div>
            </div>

            {/* Event & Venue Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Select Palaro Event
                </label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full minimal-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                >
                  <option value="Palaro 2026 Opening & Athletics">Palaro 2026 Opening & Athletics</option>
                  <option value="Venom Men's Basketball vs Titans">Venom Men's Basketball vs Titans</option>
                  <option value="Women's Volleyball Semi-Finals">Women's Volleyball Semi-Finals</option>
                  <option value="CCS Esports Tournament - Valorant">CCS Esports Tournament - Valorant</option>
                  <option value="Swimming & Aquatics Championship">Swimming & Aquatics Championship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Venue / Location Tag
                </label>
                <select
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                  className="w-full minimal-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                >
                  <option value="CCS Main Oval - Track & Field">CCS Main Oval - Track & Field</option>
                  <option value="University Gymnasium">University Gymnasium</option>
                  <option value="CCS Computer Laboratory 3">CCS Computer Laboratory 3</option>
                  <option value="Aquatics Center Pool">Aquatics Center Pool</option>
                  <option value="Student Activity Pavilion">Student Activity Pavilion</option>
                </select>
              </div>

            </div>

            {/* Drag & Drop Photo Area */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Event Selfie / Venue Photo
              </label>

              {uploadedImage ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#355935] aspect-video max-w-md mx-auto group">
                  <img
                    src={uploadedImage}
                    alt="Attendance Proof Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer hover:bg-rose-700"
                    >
                      Remove & Retake
                    </button>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-[#c5d8c3] hover:border-[#355935] bg-[#edf5ec]/20 hover:bg-[#edf5ec]/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
                  <div className="p-3 bg-[#edf5ec] text-[#355935] rounded-full">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs font-bold text-[#1f381f]">
                      Click to upload or drag photo here
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Supports JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!uploadedImage || isSubmittingPhoto}
              className={`w-full py-3 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                uploadedImage && !isSubmittingPhoto
                  ? 'minimal-btn shadow-md'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {isSubmittingPhoto ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Timestamp & Submitting...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Submit Photo Attendance Proof</span>
                </>
              )}
            </button>

          </form>
        </div>
      )}

      {/* 5. ATTENDANCE HISTORY LOG */}
      <div className="minimal-card rounded-3xl p-6 bg-white border border-[#c5d8c3]/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-[#1f381f] text-base">My Attendance History</h3>
            <p className="text-xs text-stone-500">Verified record log for Palaro 2026 student participation</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#355935] bg-[#edf5ec] px-3 py-1 rounded-full border border-[#c5d8c3]">
            {records.length} Recorded
          </span>
        </div>

        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl border border-stone-200/80 hover:border-[#c5d8c3] bg-stone-50/40 hover:bg-[#edf5ec]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    rec.mode === 'qr'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {rec.mode === 'qr' ? (
                    <QrCode className="w-5 h-5" />
                  ) : (
                    <Camera className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-[#1f381f] truncate">
                      {rec.eventName}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-200/60 text-stone-700 font-semibold">
                      {rec.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-stone-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#355935]" />
                      {rec.venue}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {rec.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge & Action */}
              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{rec.status}</span>
                </span>

                {rec.photoUrl && (
                  <button
                    type="button"
                    onClick={() => setPreviewPhoto(rec.photoUrl || null)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-[#1f381f] hover:bg-stone-200/60 transition-colors cursor-pointer"
                    title="View Photo Proof"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 max-w-lg w-full space-y-4 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#1f381f]">Submitted Attendance Photo</h4>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="text-xs font-bold text-stone-500 hover:text-stone-800 px-2 py-1 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video border border-stone-200">
              <img src={previewPhoto} alt="Uploaded Proof" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AttendanceHub;

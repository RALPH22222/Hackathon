import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QrCode, RefreshCw, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';
import type { PalaroEventItem } from './types';

interface QrScannerSectionProps {
  selectedEvent?: PalaroEventItem | null;
  onManualSubmit: (code: string) => void;
  onRealQrScanned: (decodedText: string) => void;
  onSwitchToSelfie: () => void;
  message: { type: 'success' | 'error'; text: string } | null;
}

export const QrScannerSection: React.FC<QrScannerSectionProps> = ({
  selectedEvent,
  onManualSubmit,
  onRealQrScanned,
  message,
}) => {
  const [manualCode, setManualCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  const scannerContainerId = 'real-html5-qr-reader';
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

  // Initialize Camera QR Scanner
  useEffect(() => {
    let isMounted = true;

    if (isScanning) {
      const html5Qrcode = new Html5Qrcode(scannerContainerId);
      html5QrcodeRef.current = html5Qrcode;

      const qrConfig = { fps: 10, qrbox: { width: 230, height: 230 } };

      html5Qrcode
        .start(
          { facingMode: 'environment' },
          qrConfig,
          (decodedText) => {
            if (isMounted) {
              onRealQrScanned(decodedText);
            }
          },
          () => {
            // Frame parse attempt
          }
        )
        .then(() => {
          if (isMounted) setCameraActive(true);
        })
        .catch((err) => {
          console.warn('Webcam QR scanner fallback or permission check:', err);
          if (isMounted) setCameraActive(false);
        });
    }

    return () => {
      isMounted = false;
      if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
        html5QrcodeRef.current.stop().catch(() => {});
      }
    };
  }, [isScanning, onRealQrScanned]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onManualSubmit(manualCode);
      setManualCode('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Event Context Ribbon */}
      {selectedEvent && (
        <div className="p-3 rounded-xl bg-[#edf5ec] border border-[#c5d8c3] text-xs font-mono text-[#1f381f] flex items-center justify-between">
          <span className="truncate">
            Scanning Attendance for: <strong>{selectedEvent.title}</strong>
          </span>
          <span className="text-[10px] text-[#355935] font-bold uppercase shrink-0 px-2 py-0.5 rounded bg-white border border-[#c5d8c3]">
            {selectedEvent.venue}
          </span>
        </div>
      )}

      {/* Main Scanner Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Live Camera Scanner Box */}
        <div className="md:col-span-7 minimal-card rounded-3xl p-6 bg-white border border-[#c5d8c3]/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-bold text-[#1f381f] text-base">Official QR Scanner</h3>
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

          {/* Interactive Real QR Reader Container */}
          <div className="relative aspect-square max-w-sm mx-auto bg-stone-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-stone-800">
            {/* Real Html5Qrcode container div */}
            <div id={scannerContainerId} className="w-full h-full object-cover" />

            {!cameraActive && (
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col items-center justify-center p-6 text-center text-white/70 space-y-3 pointer-events-none">
                <QrCode className="w-24 h-24 stroke-[1] text-white/20 animate-pulse" />
                <p className="text-xs text-stone-400 max-w-xs">
                  Point your camera directly at the official event QR code presented at the venue
                </p>
              </div>
            )}
          </div>

          {/* Notification alert */}
          {message && (
            <div
              className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{message.text}</span>
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
                Enter the passcode provided on the event section board.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
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
                <span>Verify Event Code</span>
              </button>
            </form>
          </div>

          {/* Quick Rules Box */}
          <div className="p-5 rounded-3xl bg-[#edf5ec]/70 border border-[#c5d8c3]/80 space-y-3">
            <h4 className="text-xs font-bold text-[#1f381f] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#355935]" />
              <span>Event QR Code Guidelines</span>
            </h4>
            <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside leading-relaxed">
              <li>Designed for fast verification without taking camera selfies.</li>
              <li>Scan the scannable code displayed at section entrances.</li>
              <li>Timestamps and GPS location are recorded automatically upon scan.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

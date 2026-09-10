import React, { useState } from 'react';
import { QrCode, RefreshCw, Zap, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

interface QrScannerSectionProps {
  onManualSubmit: (code: string) => void;
  onSimulatedScan: () => void;
  message: { type: 'success' | 'error'; text: string } | null;
}

export const QrScannerSection: React.FC<QrScannerSectionProps> = ({
  onManualSubmit,
  onSimulatedScan,
  message,
}) => {
  const [manualCode, setManualCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onManualSubmit(manualCode);
      setManualCode('');
    }
  };

  return (
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
              onClick={onSimulatedScan}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Simulate QR Scan Match</span>
            </button>
          </div>
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
              Having camera issues? Enter the 4 or 6-character event passcode displayed by your event marshal.
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
  );
};

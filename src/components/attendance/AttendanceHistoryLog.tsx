import React, { useState } from 'react';
import { QrCode, Camera, MapPin, Clock, CheckCircle2, Eye } from 'lucide-react';
import type { AttendanceRecord } from './types';


interface AttendanceHistoryLogProps {
  records: AttendanceRecord[];
}

export const AttendanceHistoryLog: React.FC<AttendanceHistoryLogProps> = ({ records }) => {
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  return (
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

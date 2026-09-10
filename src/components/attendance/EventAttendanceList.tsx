import React from 'react';
import { Camera, QrCode, MapPin, Clock, Flame, Calendar, CheckCircle2 } from 'lucide-react';
import type { PalaroEventItem } from './types';

interface EventAttendanceListProps {
  events: PalaroEventItem[];
  attendedEventIds: string[];
  onOpenSelfieCamera: (event: PalaroEventItem) => void;
  onOpenQRScanner: (event: PalaroEventItem) => void;
}

export const EventAttendanceList: React.FC<EventAttendanceListProps> = ({
  events,
  attendedEventIds,
  onOpenSelfieCamera,
  onOpenQRScanner,
}) => {
  return (
    <div className="minimal-card rounded-3xl p-6 bg-white border border-[#c5d8c3]/60 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-nowrap">
        <div className="min-w-0">
          <h3 className="font-bold text-[#1f381f] text-base font-display truncate">Active & Upcoming Palaro Events</h3>
          <p className="text-xs text-stone-500 truncate">Select an event below to snap your selfie attendance or scan the QR code</p>
        </div>
        <span className="text-xs font-mono font-bold text-[#355935] bg-[#edf5ec] px-2.5 py-1 rounded-md border border-[#c5d8c3] whitespace-nowrap shrink-0">
          {events.length} Events
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((evt) => {
          const isAttended = attendedEventIds.includes(evt.title);

          return (
            <div
              key={evt.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                isAttended
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : evt.status === 'Live Now'
                  ? 'bg-[#edf5ec]/30 border-[#c5d8c3] hover:border-[#355935]'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    {evt.category}
                  </span>
                  
                  {isAttended ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>ATTENDED</span>
                    </span>
                  ) : evt.status === 'Live Now' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse">
                      <Flame className="w-3 h-3 text-red-600" />
                      <span>LIVE NOW</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>UPCOMING</span>
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#1f381f] leading-snug">
                  {evt.title}
                </h4>

                <div className="space-y-1 text-xs text-stone-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#355935] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                </div>
              </div>

              {/* Student Action Buttons */}
              <div className="pt-2 border-t border-stone-200/60 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenSelfieCamera(evt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                    isAttended
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-[#355935] hover:bg-[#274427] text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isAttended ? 'Retake Selfie' : 'Snap Selfie'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenQRScanner(evt)}
                  className="py-2 px-3 rounded-xl text-xs font-bold border border-stone-300 hover:border-[#355935] text-stone-700 hover:text-[#1f381f] bg-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#355935]" />
                  <span>Scan Event QR</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

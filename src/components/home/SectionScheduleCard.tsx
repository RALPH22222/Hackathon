import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface ScheduleItem {
  id: string;
  sport: string;
  time: string;
  venue: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
}

const sectionSchedules: ScheduleItem[] = [
  { id: '1', sport: 'Basketball Men vs COE', time: '10:00 AM', venue: 'Gymnasium', status: 'In Progress' },
  { id: '2', sport: 'Volleyball Women vs CLA', time: '01:30 PM', venue: 'Court B', status: 'Upcoming' },
  { id: '3', sport: 'MLBB Esports vs CTE', time: '03:45 PM', venue: 'CCS Lab 3', status: 'Upcoming' },
  { id: '4', sport: 'Badminton Doubles vs CCJE', time: '05:00 PM', venue: 'Covered Court', status: 'Upcoming' },
];

export const SectionScheduleCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] p-4 sm:p-5 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2ece0]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#edf5ec] flex items-center justify-center border border-[#c5d8c3]/60">
            <Calendar className="w-4 h-4 text-[#355935]" />
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-[#1f381f] uppercase tracking-wide font-display">
            BSCS 4-B
          </h2>
        </div>
        
        <span className="text-[11px] font-mono text-stone-500 font-semibold">
          Section Schedule
        </span>
      </div>

      {/* List */}
      <div className="space-y-2.5 overflow-y-auto max-h-[290px] sm:max-h-[320px] pr-1">
        {sectionSchedules.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-[#f8faf8] hover:bg-[#f1f6f0] transition-colors border border-[#e2ece0] text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1f381f] flex items-center gap-1.5 text-xs sm:text-sm">
                <Users className="w-3.5 h-3.5 text-[#355935]" />
                {item.sport}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  item.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-[#edf5ec] text-[#254625]'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono pt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#5d8c55]" />
                {item.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#5d8c55]" />
                {item.venue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

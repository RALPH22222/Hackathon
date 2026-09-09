import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface ScheduleItem {
  id: string;
  section: string;
  sport: string;
  time: string;
  venue: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
}

const sectionSchedules: ScheduleItem[] = [
  { id: '1', section: 'CS-3A', sport: 'Basketball Men', time: '10:00 AM', venue: 'Gymnasium', status: 'In Progress' },
  { id: '2', section: 'IT-2B', sport: 'Volleyball Women', time: '01:30 PM', venue: 'Court B', status: 'Upcoming' },
  { id: '3', section: 'ACT-1A', sport: 'MLBB Esports', time: '03:45 PM', venue: 'CCS Lab 3', status: 'Upcoming' },
  { id: '4', section: 'CS-4B', sport: 'Badminton Doubles', time: '05:00 PM', venue: 'Covered Court', status: 'Upcoming' },
];

export const SectionScheduleCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#c5d8c3] p-3.5 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-[#e2ece0]">
        <Calendar className="w-4 h-4 text-[#355935]" />
        <h2 className="text-xs font-bold text-[#1f381f] uppercase tracking-wide">
          Section Schedule
        </h2>
      </div>

      {/* List */}
      <div className="space-y-2 overflow-y-auto max-h-[190px] pr-0.5">
        {sectionSchedules.map((item) => (
          <div
            key={item.id}
            className="p-2 rounded-xl bg-[#f8faf8] border border-[#e2ece0] text-xs space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1f381f] flex items-center gap-1">
                <Users className="w-3 h-3 text-[#355935]" />
                {item.section}
              </span>
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                  item.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-[#edf5ec] text-[#254625]'
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="font-semibold text-slate-800 text-[11px] truncate">{item.sport}</p>

            <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
              <span className="flex items-center gap-0.5">
                <Clock className="w-3 h-3 text-[#5d8c55]" />
                {item.time}
              </span>
              <span className="flex items-center gap-0.5 truncate max-w-[90px]">
                <MapPin className="w-3 h-3 text-[#5d8c55]" />
                {item.venue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface AttendanceRecord {
  id: string;
  eventName: string;
  venue: string;
  timestamp: string;
  mode: 'qr' | 'photo';
  status: 'Verified' | 'Pending Review';
  photoUrl?: string;
  locationDetails?: string;
  studentId?: string;
  studentName?: string;
}

export interface PalaroEventItem {
  id: string;
  title: string;
  category: string;
  venue: string;
  time: string;
  status: 'Live Now' | 'Upcoming' | 'Completed';
  isAttendanceRequired?: boolean;
}

export type UserRole = 'student' | 'facilitator';
export type FacilitatorStatus = 'available' | 'busy';

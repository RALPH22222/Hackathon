export interface AttendanceRecord {
  id: string;
  eventName: string;
  venue: string;
  timestamp: string;
  mode: 'qr' | 'photo';
  status: 'Verified' | 'Pending Review';
  photoUrl?: string;
}

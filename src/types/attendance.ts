export type AttendanceStatus =
  | "hadir"
  | "telat"
  | "izin"
  | "sakit"
  | "alpha"
  | "lembur";

export interface Employee {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface AttendanceDaily {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD format
  status: AttendanceStatus;
  checkInTime?: string; // HH:mm format
  checkOutTime?: string; // HH:mm format
  locationText?: string;
  checkInLat?: number;
  checkInLng?: number;
  checkOutLat?: number;
  checkOutLng?: number;
  checkOutLocationText?: string; // For individual report
  faceImageUrl?: string;
  overtimeReason?: string; // For individual report
}

export interface AttendanceSummary {
  employeeId: string;
  periodKey: string; // weekKey or monthKey (YYYY-WW or YYYY-MM)
  hadir: number;
  telat: number;
  izin: number;
  sakit: number;
  alpha: number;
  lembur: number;
}

export interface WorkScheduleDay {
  dayOfWeek: number; // 1-7 (Monday-Sunday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface WorkScheduleBase {
  days: WorkScheduleDay[];
}

export interface WorkScheduleOverride {
  weekKey: string; // YYYY-WW format
  days: WorkScheduleDay[];
}

export interface WorkSchedules {
  base: WorkScheduleBase;
  overrides: WorkScheduleOverride[];
}

export interface AttendanceMapPin {
  id: string;
  employeeId: string;
  employeeName: string;
  lat: number;
  lng: number;
  type: "checkIn" | "checkOut";
  time: string;
}

export type ReportPeriod = "daily" | "weekly" | "monthly";

export interface AttendanceFilters {
  date?: string;
  search?: string;
  title?: string;
  status?: AttendanceStatus | "";
}

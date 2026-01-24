export type OvertimeStatus = "pending" | "approved" | "rejected";

export interface OvertimeRequest {
  id: string;
  employeeId: string; // Relasi ke employees
  date: string; // YYYY-MM-DD
  startTime: string; // "17:00"
  endTime: string; // "20:00"
  durationHours: number; // calculated: 3 jam
  reason: string;
  resultImageUrl: string; // Foto hasil kerja
  faceImageUrl: string; // Foto selfie verify
  status: OvertimeStatus;
  createdAt: string; // ISO datetime
  approvedAt?: string;
  rejectedAt?: string;
  approvedBy?: string; // Admin ID (future)
}

export interface OvertimeFilters {
  search: string;
  status: OvertimeStatus | "all";
}

/**
 * Progress/Task Management Types
 * Shared between Admin (input/manage) and Employee (view/track)
 */

export type TaskType = "payment" | "checking" | "upload" | "complaint";
export type TaskStatus = "pending" | "completed";

export interface EmployeeTask {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  taskName: string;
  type: TaskType;
  status: TaskStatus;
  description?: string;
}

export interface PerformanceStats {
  date: string; // YYYY-MM-DD
  performance: number; // actual work done
  target: number; // expected target
}

export interface ComplaintEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  description: string;
  projectName: string;
}

export interface PerformanceData {
  employeeId: string;
  employeeName: string;
  stats: PerformanceStats[];
  complaints: ComplaintEntry[];
}

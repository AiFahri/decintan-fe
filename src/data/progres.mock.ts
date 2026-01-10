import type { EmployeeTask, PerformanceData } from "@/types/progres";

/**
 * Employee Tasks (Calendar Reminders)
 * Synced with Admin's Progres feature
 */
export const employeeTasksMock: EmployeeTask[] = [
  {
    id: "task-001",
    employeeId: "user-002", // Budi
    date: "2025-12-01",
    taskName: "tenggat pembayaran ke pln",
    type: "payment",
    status: "completed",
    description: "Pembayaran PLN untuk Perumahan Laguna",
  },
  {
    id: "task-002",
    employeeId: "user-002",
    date: "2025-12-03",
    taskName: "tenggat pengecekan",
    type: "checking",
    status: "completed",
    description: "Pengecekan kualitas bahan bangunan",
  },
  {
    id: "task-003",
    employeeId: "user-002",
    date: "2025-12-05",
    taskName: "Hari penguploadan surat",
    type: "upload",
    status: "completed",
    description: "Upload dokumen surat jalan dan invoice",
  },
  {
    id: "task-004",
    employeeId: "user-002",
    date: "2026-01-10",
    taskName: "Perbaikan complain rumah type A",
    type: "complaint",
    status: "pending",
    description: "Memperbaiki complain perumahan A - pintu tidak rata",
  },
  {
    id: "task-005",
    employeeId: "user-002",
    date: "2026-01-15",
    taskName: "tenggat pembayaran vendor",
    type: "payment",
    status: "pending",
    description: "Pembayaran ke vendor material bangunan",
  },
];

/**
 * Performance Data (Kinerja vs Target)
 * 30 days of data for chart
 */
export const performanceDataMock: PerformanceData = {
  employeeId: "user-002",
  employeeName: "Budi Santoso",
  stats: [
    { date: "2025-12-01", performance: 5, target: 5 },
    { date: "2025-12-02", performance: 12, target: 10 },
    { date: "2025-12-03", performance: 18, target: 15 },
    { date: "2025-12-04", performance: 25, target: 20 },
    { date: "2025-12-05", performance: 30, target: 25 },
    { date: "2025-12-06", performance: 35, target: 30 },
    { date: "2025-12-07", performance: 40, target: 35 },
    { date: "2025-12-08", performance: 43, target: 40 },
    { date: "2025-12-09", performance: 45, target: 45 },
    { date: "2025-12-10", performance: 48, target: 50 },
    { date: "2025-12-11", performance: 50, target: 55 },
    { date: "2025-12-12", performance: 52, target: 60 },
    { date: "2025-12-13", performance: 55, target: 62 },
    { date: "2025-12-14", performance: 58, target: 65 },
    { date: "2025-12-15", performance: 60, target: 68 },
    { date: "2025-12-16", performance: 62, target: 70 },
    { date: "2025-12-17", performance: 65, target: 72 },
    { date: "2025-12-18", performance: 70, target: 75 },
    { date: "2025-12-19", performance: 75, target: 78 },
    { date: "2025-12-20", performance: 82, target: 80 },
    { date: "2025-12-21", performance: 88, target: 83 },
    { date: "2025-12-22", performance: 92, target: 86 },
    { date: "2025-12-23", performance: 95, target: 90 },
    { date: "2025-12-24", performance: 98, target: 93 },
    { date: "2025-12-25", performance: 99, target: 95 },
    { date: "2025-12-26", performance: 100, target: 97 },
    { date: "2025-12-27", performance: 100, target: 98 },
    { date: "2025-12-28", performance: 100, target: 99 },
    { date: "2025-12-29", performance: 100, target: 100 },
    { date: "2025-12-30", performance: 100, target: 100 },
  ],
  complaints: [
    {
      id: "complaint-001",
      date: "2025-12-02",
      description: "Memperbaiki complain perumahan A",
      projectName: "Perumahan Laguna",
    },
    {
      id: "complaint-002",
      date: "2025-12-07",
      description: "Memperbaiki complain perumahan C",
      projectName: "Perumahan Harmony",
    },
    {
      id: "complaint-003",
      date: "2025-12-12",
      description: "Memperbaiki complain perumahan D",
      projectName: "Perumahan Indah",
    },
  ],
};

/**
 * Helper: Get tasks for specific employee
 */
export const getTasksByEmployee = (employeeId: string): EmployeeTask[] => {
  return employeeTasksMock.filter((task) => task.employeeId === employeeId);
};

/**
 * Helper: Get performance data for employee
 */
export const getPerformanceData = (_employeeId: string): PerformanceData => {
  // In real app, filter by employeeId from database
  return performanceDataMock;
};

/**
 * Helper: Get tasks for specific month
 */
export const getTasksByMonth = (
  employeeId: string,
  year: number,
  month: number
): EmployeeTask[] => {
  const tasks = getTasksByEmployee(employeeId);
  return tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return taskDate.getFullYear() === year && taskDate.getMonth() === month - 1;
  });
};

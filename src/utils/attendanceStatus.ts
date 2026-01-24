import { attendanceDailyMock } from "@/data/attendance.mock";

/**
 * Check if employee has checked out today
 */
export const hasCheckedOutToday = (
  employeeId: string,
  today: string,
): boolean => {
  return attendanceDailyMock.some(
    (record) =>
      record.employeeId === employeeId &&
      record.date === today &&
      record.checkInTime !== undefined &&
      record.checkOutTime !== undefined,
  );
};

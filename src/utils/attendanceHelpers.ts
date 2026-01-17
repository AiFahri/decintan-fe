import type { AttendanceDaily } from "@/types/attendance";
import type { OvertimeRequest } from "@/types/overtime";
import { attendanceDailyMock } from "@/data/attendance.mock";
import { overtimeRequestsMock } from "@/data/overtime.mock";

/**
 * Get greeting based on current time
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  return hour < 12 ? "Selamat Pagi" : "Selamat Sore";
};

/**
 * Format date to Indonesian locale
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/**
 * Format time to HH:mm
 */
export const formatTime = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

/**
 * Check if employee has checked in today
 */
export const hasCheckedInToday = (
  employeeId: string,
  today: string,
): boolean => {
  return attendanceDailyMock.some(
    (record) =>
      record.employeeId === employeeId &&
      record.date === today &&
      record.checkInTime !== undefined,
  );
};

/**
 * Check if employee can check out (already checked in + passed end time)
 */
export const canCheckOut = (
  employeeId: string,
  today: string,
  currentTime: string,
  endTime: string,
): boolean => {
  const hasCheckedIn = hasCheckedInToday(employeeId, today);
  const hasCheckedOut = attendanceDailyMock.some(
    (record) =>
      record.employeeId === employeeId &&
      record.date === today &&
      record.checkOutTime !== undefined,
  );

  if (!hasCheckedIn || hasCheckedOut) return false;

  // Check if current time >= end time
  const [currentHour, currentMinute] = currentTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const currentMinutes = currentHour * 60 + currentMinute;
  const endMinutes = endHour * 60 + endMinute;

  return currentMinutes >= endMinutes;
};

/**
 * Get current location using GPS
 */
export const getCurrentLocation = (): Promise<{
  lat: number;
  lng: number;
  locationText: string;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung oleh browser ini"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          locationText: "kantor", // Simplified, real app would use reverse geocoding
        });
      },
      (error) => {
        reject(new Error(`Tidak dapat mengakses GPS: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

/**
 * Submit check-in attendance
 */
export const submitCheckIn = (
  employeeId: string,
  photoBase64: string,
  lat: number,
  lng: number,
  locationText: string,
): AttendanceDaily => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const time = formatTime(now);

  const newRecord: AttendanceDaily = {
    id: `att-${Date.now()}`,
    employeeId,
    date: today,
    status: "hadir", // Will be calculated by admin based on work schedule
    checkInTime: time,
    locationText,
    checkInLat: lat,
    checkInLng: lng,
    faceImageUrl: photoBase64,
  };

  attendanceDailyMock.push(newRecord);
  return newRecord;
};

/**
 * Submit check-out attendance
 */
export const submitCheckOut = (
  employeeId: string,
  _photoBase64: string,
  lat: number,
  lng: number,
  locationText: string,
): AttendanceDaily | null => {
  const today = new Date().toISOString().split("T")[0];
  const time = formatTime(new Date());

  const existingRecord = attendanceDailyMock.find(
    (record) =>
      record.employeeId === employeeId &&
      record.date === today &&
      record.checkInTime !== undefined &&
      record.checkOutTime === undefined,
  );

  if (existingRecord) {
    existingRecord.checkOutTime = time;
    existingRecord.checkOutLat = lat;
    existingRecord.checkOutLng = lng;
    existingRecord.checkOutLocationText = locationText;
    return existingRecord;
  }

  return null;
};

/**
 * Submit leave request (izin/sakit)
 */
export const submitLeaveRequest = (
  employeeId: string,
  type: "izin" | "sakit",
  documentBase64: string,
): AttendanceDaily => {
  const today = new Date().toISOString().split("T")[0];

  const newRecord: AttendanceDaily = {
    id: `leave-${Date.now()}`,
    employeeId,
    date: today,
    status: type,
    faceImageUrl: documentBase64, // Dokumen sakit/izin disimpan di kolom faceImageUrl
    leaveStatus: "pending",
  };

  attendanceDailyMock.push(newRecord);
  return newRecord;
};

/**
 * Submit overtime request
 */
export const submitOvertimeRequest = (
  employeeId: string,
  reason: string,
  resultImageBase64: string,
  faceImageBase64: string,
  startTime: string,
  endTime: string,
): OvertimeRequest => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // Calculate duration
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const durationMinutes =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);
  const durationHours = durationMinutes / 60;

  const newRequest: OvertimeRequest = {
    id: `ot-${Date.now()}`,
    employeeId,
    date: today,
    startTime,
    endTime,
    durationHours: Math.round(durationHours * 10) / 10, // Round to 1 decimal
    reason,
    resultImageUrl: resultImageBase64,
    faceImageUrl: faceImageBase64,
    status: "pending",
    createdAt: now.toISOString(),
  };

  overtimeRequestsMock.push(newRequest);
  return newRequest;
};

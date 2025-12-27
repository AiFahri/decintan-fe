import type {
  Employee,
  AttendanceDaily,
  AttendanceSummary,
  WorkSchedules,
  AttendanceMapPin,
} from "@/types/attendance";

export const employeesMock: Employee[] = [
  {
    id: "1",
    name: "Agus",
    title: "Manager",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    isActive: true,
  },
  {
    id: "2",
    name: "Ahmad",
    title: "Staff",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    isActive: true,
  },
  {
    id: "3",
    name: "Ahmeng",
    title: "Staff",
    avatarUrl: "https://i.pravatar.cc/150?img=13",
    isActive: true,
  },
  {
    id: "4",
    name: "Bella",
    title: "Kantoran",
    avatarUrl: "https://i.pravatar.cc/150?img=14",
    isActive: true,
  },
  {
    id: "5",
    name: "Chika",
    title: "Kantoran",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
    isActive: true,
  },
  {
    id: "6",
    name: "Doni",
    title: "Manager",
    avatarUrl: "https://i.pravatar.cc/150?img=16",
    isActive: true,
  },
  {
    id: "7",
    name: "Eko",
    title: "Staff",
    avatarUrl: "https://i.pravatar.cc/150?img=17",
    isActive: false,
  },
];

export const attendanceDailyMock: AttendanceDaily[] = [
  {
    id: "a1",
    employeeId: "1",
    date: "2025-12-27",
    status: "hadir",
    checkInTime: "07:00",
    checkOutTime: "17:00",
    locationText: "Jl.sbarelang",
    checkInLat: -6.2088,
    checkInLng: 106.8456,
    checkOutLat: -6.2098,
    checkOutLng: 106.8466,
    faceImageUrl: "https://i.pravatar.cc/300?img=11",
  },
  {
    id: "a2",
    employeeId: "2",
    date: "2025-12-27",
    status: "telat",
    checkInTime: "08:13",
    checkOutTime: "17:15",
    locationText: "Jl.sbarelang",
    checkInLat: -6.2108,
    checkInLng: 106.8476,
    checkOutLat: -6.2118,
    checkOutLng: 106.8486,
    faceImageUrl: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: "a3",
    employeeId: "3",
    date: "2025-12-27",
    status: "izin",
  },
  {
    id: "a4",
    employeeId: "4",
    date: "2025-12-27",
    status: "hadir",
    checkInTime: "07:15",
    checkOutTime: "17:30",
    locationText: "Jl.sbarelang",
    checkInLat: -6.2068,
    checkInLng: 106.8496,
    faceImageUrl: "https://i.pravatar.cc/300?img=14",
  },
  {
    id: "a5",
    employeeId: "5",
    date: "2025-12-27",
    status: "telat",
    checkInTime: "10:00",
    checkOutTime: "18:00",
    locationText: "Jl.sbarelang",
    checkInLat: -6.2078,
    checkInLng: 106.8506,
    faceImageUrl: "https://i.pravatar.cc/300?img=15",
  },
  // Previous day data
  {
    id: "a6",
    employeeId: "1",
    date: "2025-12-26",
    status: "hadir",
    checkInTime: "07:05",
    checkOutTime: "17:10",
    locationText: "Jl.sbarelang",
    faceImageUrl: "https://i.pravatar.cc/300?img=11",
  },
  {
    id: "a7",
    employeeId: "2",
    date: "2025-12-26",
    status: "sakit",
  },
];

export const attendanceWeeklySummaryMock: AttendanceSummary[] = [
  {
    employeeId: "1",
    periodKey: "2025-W52",
    hadir: 29,
    telat: 1,
    izin: 1,
    sakit: 0,
    alpha: 0,
    lembur: 0,
  },
  {
    employeeId: "2",
    periodKey: "2025-W52",
    hadir: 27,
    telat: 5,
    izin: 4,
    sakit: 0,
    alpha: 0,
    lembur: 0,
  },
  {
    employeeId: "3",
    periodKey: "2025-W52",
    hadir: 25,
    telat: 2,
    izin: 3,
    sakit: 1,
    alpha: 0,
    lembur: 0,
  },
  {
    employeeId: "4",
    periodKey: "2025-W52",
    hadir: 28,
    telat: 1,
    izin: 2,
    sakit: 0,
    alpha: 0,
    lembur: 1,
  },
  {
    employeeId: "5",
    periodKey: "2025-W52",
    hadir: 26,
    telat: 3,
    izin: 2,
    sakit: 0,
    alpha: 0,
    lembur: 0,
  },
];

export const attendanceMonthlySummaryMock: AttendanceSummary[] = [
  {
    employeeId: "1",
    periodKey: "2025-12",
    hadir: 120,
    telat: 5,
    izin: 3,
    sakit: 0,
    alpha: 0,
    lembur: 2,
  },
  {
    employeeId: "2",
    periodKey: "2025-12",
    hadir: 110,
    telat: 15,
    izin: 10,
    sakit: 2,
    alpha: 0,
    lembur: 0,
  },
  {
    employeeId: "3",
    periodKey: "2025-12",
    hadir: 105,
    telat: 8,
    izin: 12,
    sakit: 3,
    alpha: 0,
    lembur: 0,
  },
  {
    employeeId: "4",
    periodKey: "2025-12",
    hadir: 115,
    telat: 5,
    izin: 8,
    sakit: 1,
    alpha: 0,
    lembur: 3,
  },
  {
    employeeId: "5",
    periodKey: "2025-12",
    hadir: 108,
    telat: 12,
    izin: 10,
    sakit: 0,
    alpha: 0,
    lembur: 0,
  },
];

export const workSchedulesMock: WorkSchedules = {
  base: {
    days: [
      { dayOfWeek: 1, startTime: "07:30", endTime: "18:30" }, // Monday
      { dayOfWeek: 2, startTime: "07:30", endTime: "18:30" }, // Tuesday
      { dayOfWeek: 3, startTime: "07:30", endTime: "18:30" }, // Wednesday
      { dayOfWeek: 4, startTime: "07:30", endTime: "18:30" }, // Thursday
      { dayOfWeek: 5, startTime: "07:30", endTime: "18:30" }, // Friday
      { dayOfWeek: 6, startTime: "00:00", endTime: "00:00" }, // Saturday (off)
      { dayOfWeek: 7, startTime: "00:00", endTime: "00:00" }, // Sunday (off)
    ],
  },
  overrides: [
    {
      weekKey: "2025-W52",
      days: [
        { dayOfWeek: 1, startTime: "08:00", endTime: "17:00" },
        { dayOfWeek: 2, startTime: "08:00", endTime: "17:00" },
        { dayOfWeek: 3, startTime: "08:00", endTime: "17:00" },
        { dayOfWeek: 4, startTime: "08:00", endTime: "17:00" },
        { dayOfWeek: 5, startTime: "08:00", endTime: "17:00" },
        { dayOfWeek: 6, startTime: "00:00", endTime: "00:00" },
        { dayOfWeek: 7, startTime: "00:00", endTime: "00:00" },
      ],
    },
  ],
};

export const attendanceMapPinsMock: AttendanceMapPin[] = [
  {
    id: "p1",
    employeeId: "1",
    employeeName: "Agus",
    lat: -6.2088,
    lng: 106.8456,
    type: "checkIn",
    time: "07:00",
  },
  {
    id: "p2",
    employeeId: "2",
    employeeName: "Ahmad",
    lat: -6.2108,
    lng: 106.8476,
    type: "checkIn",
    time: "08:13",
  },
  {
    id: "p3",
    employeeId: "4",
    employeeName: "Bella",
    lat: -6.2068,
    lng: 106.8496,
    type: "checkIn",
    time: "07:15",
  },
];

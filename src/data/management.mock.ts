export interface UserActivity {
  userId: string;
  totalVisits: number;
  totalDuration: string; // e.g., "9 jam 1 menit"
  totalDurationMinutes: number; // for sorting/calculations
  lastActive: string; // e.g., "15 menit lalu"
  lastActiveTimestamp: string; // ISO timestamp
}

export interface UserActivityDetail {
  userId: string;
  totalDuration: string;
  totalPages: number;
  changesCount: number;
  screenshots: ActivityScreenshot[];
  timePerFeature: FeatureTime[];
}

export interface ActivityScreenshot {
  id: string;
  url: string;
  duration: string; // e.g., "24 menit"
}

export interface FeatureTime {
  feature: string;
  minutes: number;
  label: string; // for chart display
}

// Mock data untuk History Table
export const userActivitiesMock: UserActivity[] = [
  {
    userId: "user-001",
    totalVisits: 4,
    totalDuration: "9 jam 1 menit",
    totalDurationMinutes: 541,
    lastActive: "aktif 15 menit lalu",
    lastActiveTimestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    userId: "user-002",
    totalVisits: 8,
    totalDuration: "7 jam 30 menit",
    totalDurationMinutes: 450,
    lastActive: "aktif 19 menit lalu",
    lastActiveTimestamp: new Date(Date.now() - 19 * 60 * 1000).toISOString(),
  },
  {
    userId: "user-003",
    totalVisits: 12,
    totalDuration: "15 jam 20 menit",
    totalDurationMinutes: 920,
    lastActive: "aktif 5 menit lalu",
    lastActiveTimestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
];

// Mock data untuk Detail History
export const userActivityDetailsMock: Record<string, UserActivityDetail> = {
  "user-001": {
    userId: "user-001",
    totalDuration: "9 jam 1 menit",
    totalPages: 10,
    changesCount: 1,
    screenshots: [
      {
        id: "ss-1",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        duration: "24 menit",
      },
      {
        id: "ss-2",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        duration: "3 menit",
      },
      {
        id: "ss-3",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
        duration: "5 menit",
      },
      {
        id: "ss-4",
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        duration: "39 menit",
      },
    ],
    timePerFeature: [
      { feature: "Dashboard", minutes: 720, label: "1" },
      { feature: "Absensi", minutes: 15, label: "2" },
      { feature: "Purchasing", minutes: 0, label: "3" },
      { feature: "Surat", minutes: 360, label: "4" },
      { feature: "Keuangan", minutes: 0, label: "5" },
      { feature: "Progres", minutes: 0, label: "6" },
      { feature: "Gaji", minutes: 0, label: "7" },
      { feature: "Settings", minutes: 0, label: "8" },
      { feature: "Profile", minutes: 0, label: "9" },
      { feature: "Other", minutes: 5, label: "10" },
      { feature: "Reports", minutes: 0, label: "11" },
      { feature: "Analytics", minutes: 0, label: "12" },
      { feature: "Messages", minutes: 0, label: "13" },
      { feature: "Tasks", minutes: 0, label: "14" },
      { feature: "Calendar", minutes: 0, label: "15" },
      { feature: "Files", minutes: 0, label: "16" },
      { feature: "Admin", minutes: 780, label: "17" },
    ],
  },
  "user-002": {
    userId: "user-002",
    totalDuration: "7 jam 30 menit",
    totalPages: 8,
    changesCount: 3,
    screenshots: [
      {
        id: "ss-5",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        duration: "12 menit",
      },
      {
        id: "ss-6",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        duration: "8 menit",
      },
    ],
    timePerFeature: [
      { feature: "Dashboard", minutes: 180, label: "1" },
      { feature: "Absensi", minutes: 120, label: "2" },
      { feature: "Purchasing", minutes: 150, label: "3" },
      { feature: "Surat", minutes: 0, label: "4" },
      { feature: "Keuangan", minutes: 0, label: "5" },
      { feature: "Progres", minutes: 0, label: "6" },
      { feature: "Gaji", minutes: 0, label: "7" },
    ],
  },
  "user-003": {
    userId: "user-003",
    totalDuration: "15 jam 20 menit",
    totalPages: 15,
    changesCount: 5,
    screenshots: [
      {
        id: "ss-7",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        duration: "45 menit",
      },
      {
        id: "ss-8",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        duration: "30 menit",
      },
      {
        id: "ss-9",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
        duration: "20 menit",
      },
    ],
    timePerFeature: [
      { feature: "Dashboard", minutes: 300, label: "1" },
      { feature: "Absensi", minutes: 200, label: "2" },
      { feature: "Purchasing", minutes: 180, label: "3" },
      { feature: "Surat", minutes: 150, label: "4" },
      { feature: "Keuangan", minutes: 90, label: "5" },
    ],
  },
};

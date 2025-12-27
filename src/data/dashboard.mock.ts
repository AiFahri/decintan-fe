import type { DashboardData } from "@/types/dashboard";

export const dashboardMockData: DashboardData = {
  revenueChart: [
    { month: "Januari", rugi: 15, untung: 12 },
    { month: "Februari", rugi: 28, untung: 18 },
    { month: "Maret", rugi: 35, untung: 22 },
    { month: "April", rugi: 32, untung: 15 },
    { month: "Mei", rugi: 31, untung: 48 },
  ],
  projects: [
    { name: "HARMONY", value: 65, max: 100 },
    { name: "LAGUNA", value: 45, max: 100 },
    { name: "PROJEK 1", value: 55, max: 100 },
  ],
  staff: [
    {
      id: "1",
      name: "Staf 1",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      status: "active",
    },
    {
      id: "2",
      name: "Staf 2",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      status: "inactive",
      lastActiveMinutes: 5,
    },
    {
      id: "3",
      name: "Staf 3",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      status: "inactive",
      lastActiveMinutes: 23,
    },
    {
      id: "4",
      name: "Staf 3",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      status: "inactive",
      lastActiveMinutes: 54,
    },
  ],
  trackingPins: [
    { id: "1", label: "Pin 1", lat: -6.2088, lng: 106.8456 },
    { id: "2", label: "Pin 2", lat: -6.2108, lng: 106.8476 },
    { id: "3", label: "Pin 3", lat: -6.2068, lng: 106.8496 },
  ],
};

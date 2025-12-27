export interface RevenueDataPoint {
  month: string;
  rugi: number;
  untung: number;
}

export interface Project {
  name: string;
  value: number;
  max: number;
}

export interface Staff {
  id: string;
  name: string;
  avatarUrl: string;
  status: "active" | "inactive";
  lastActiveMinutes?: number;
}

export interface TrackingPin {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export interface DashboardData {
  revenueChart: RevenueDataPoint[];
  projects: Project[];
  staff: Staff[];
  trackingPins: TrackingPin[];
}

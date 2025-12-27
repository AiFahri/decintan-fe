import { DashboardLayout } from "@/ui/components/layouts/DashboardLayout";
import { InfoBanner } from "@/ui/components/InfoBanner";
import { Card } from "@/ui/components/Card";
import { RevenueChart } from "@/features/dashboard/components/RevenueChart";
import { ProjectProgress } from "@/features/dashboard/components/ProjectProgress";
import { StaffList } from "@/features/dashboard/components/StaffList";
import { TrackingMap } from "@/features/dashboard/components/TrackingMap";
import { dashboardMockData } from "@/data/dashboard.mock";
import { ChevronDown } from "lucide-react";

export default function AdminDashboardPage() {
  const { revenueChart, projects, staff, trackingPins } = dashboardMockData;

  return (
    <DashboardLayout breadcrumbs={["Aplikasi", "Dashboard"]}>
      <InfoBanner>
        <strong>Info Terbaru Dari perusahaan</strong>
      </InfoBanner>

      <Card padding="lg" className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Laporan pendapatan 📊
          </h2>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Daily
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <ProjectProgress projects={projects} />
          </div>

          <div className="lg:col-span-8">
            <RevenueChart data={revenueChart} />
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tracking Karyawan
          </h3>
          <TrackingMap pins={trackingPins} />
        </Card>

        <Card padding="lg">
          <StaffList
            staff={staff}
            onViewAll={() => alert("Lihat semua staff")}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}

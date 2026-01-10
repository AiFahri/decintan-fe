import { useState } from "react";
import { Download } from "lucide-react";
import { DashboardLayout } from "@/ui/components/layouts/DashboardLayout";
import { InfoBanner } from "@/ui/components/InfoBanner";
import { Button } from "@/ui/components/Button";
import { CalendarWidget } from "@/features/employee/components/CalendarWidget";
import { TaskList } from "@/features/employee/components/TaskList";
import { PerformanceChart } from "@/features/employee/components/PerformanceChart";
import { ComplaintList } from "@/features/employee/components/ComplaintList";
import { getTasksByMonth, getPerformanceData } from "@/data/progres.mock";
import { getCurrentUser } from "@/data/auth.mock";

export default function EmployeeDashboardPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // December 2025

  const currentUser = getCurrentUser();
  const employeeId = currentUser?.id || "user-002";

  const tasks = getTasksByMonth(
    employeeId,
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1
  );
  const performanceData = getPerformanceData(employeeId);

  const handleDownload = () => {
    alert("Download laporan kinerja (implementasi Excel export)");
  };

  return (
    <DashboardLayout breadcrumbs={["Dashboard"]}>
      <div className="space-y-6">
        <InfoBanner>
          Selamat datang di Dashboard Karyawan! Lihat tugas dan performa kerja
          Anda di sini.
        </InfoBanner>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CalendarWidget
              tasks={tasks}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
            />
            <TaskList tasks={tasks} />
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Kinerja</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>

              <PerformanceChart data={performanceData} compact />
            </div>

            <ComplaintList complaints={performanceData.complaints} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

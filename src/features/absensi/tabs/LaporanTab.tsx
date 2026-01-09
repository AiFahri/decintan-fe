import { useState } from "react";
import { ReportTableDaily } from "../components/ReportTableDaily";
import { ReportTableSummary } from "../components/ReportTableSummary";
import { IndividualReportTab } from "./IndividualReportTab";
import {
  employeesMock,
  attendanceDailyMock,
  attendanceWeeklySummaryMock,
  attendanceMonthlySummaryMock,
} from "@/data/attendance.mock";

type LaporanPeriod = "daily" | "weekly" | "monthly" | "individual";

export const LaporanTab = () => {
  const [period, setPeriod] = useState<LaporanPeriod>("daily");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setPeriod("daily")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            period === "daily"
              ? "bg-[#2b3d9d] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Harian
        </button>
        <button
          onClick={() => setPeriod("weekly")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            period === "weekly"
              ? "bg-[#2b3d9d] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Mingguan
        </button>
        <button
          onClick={() => setPeriod("monthly")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            period === "monthly"
              ? "bg-[#2b3d9d] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Bulanan
        </button>
        <button
          onClick={() => setPeriod("individual")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            period === "individual"
              ? "bg-[#2b3d9d] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Laporan Pribadi
        </button>
      </div>

      {period === "daily" && (
        <ReportTableDaily
          attendance={attendanceDailyMock}
          employees={employeesMock}
        />
      )}
      {period === "weekly" && (
        <ReportTableSummary
          summaries={attendanceWeeklySummaryMock}
          employees={employeesMock}
          period="weekly"
        />
      )}
      {period === "monthly" && (
        <ReportTableSummary
          summaries={attendanceMonthlySummaryMock}
          employees={employeesMock}
          period="monthly"
        />
      )}
      {period === "individual" && <IndividualReportTab />}
    </div>
  );
};

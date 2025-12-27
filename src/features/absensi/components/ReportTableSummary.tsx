import { Download, Search } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import type { AttendanceSummary, Employee } from "@/types/attendance";
import { exportToExcel } from "@/utils/excelExport";

interface ReportTableSummaryProps {
  summaries: AttendanceSummary[];
  employees: Employee[];
  period: "weekly" | "monthly";
}

export const ReportTableSummary = ({
  summaries,
  employees,
  period,
}: ReportTableSummaryProps) => {
  const [search, setSearch] = useState("");

  const filteredData = summaries.filter((item) => {
    const employee = employees.find((e) => e.id === item.employeeId);
    return employee?.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleDownload = () => {
    const excelData = filteredData.map((item) => {
      const employee = employees.find((e) => e.id === item.employeeId);
      return {
        Anggota: employee?.name || "-",
        Hadir: item.hadir,
        Telat: item.telat,
        Izin: item.izin,
        Sakit: item.sakit,
        Lembur: item.lembur,
        "Tidak Hadir": item.alpha,
      };
    });

    const periodLabel = period === "weekly" ? "Mingguan" : "Bulanan";
    exportToExcel(
      excelData,
      `Laporan_${periodLabel}_${new Date().toISOString().split("T")[0]}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="cari anggota.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-[#2b3d9d] text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Anggota
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Hadir
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Telat
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Izin
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Sakit
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Lembur
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Tidak Hadir
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => {
                const employee = employees.find(
                  (e) => e.id === item.employeeId
                );
                if (!employee) return null;

                return (
                  <tr
                    key={`${item.employeeId}-${item.periodKey}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={employee.avatarUrl}
                          alt={employee.name}
                          size="sm"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {employee.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {item.hadir}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {item.telat}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {item.izin}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {item.sakit}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {item.lembur}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {item.alpha}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 py-8">Tidak ada data</p>
        )}
      </div>
    </div>
  );
};

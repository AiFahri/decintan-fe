import { Search } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import type { Employee, AttendanceStatus } from "@/types/attendance";

interface EmployeeWithStatus extends Employee {
  status?: AttendanceStatus;
  checkInTime?: string;
}

interface EmployeeStatusListProps {
  employees: EmployeeWithStatus[];
}

const statusConfig: Record<AttendanceStatus, { label: string; color: string }> =
  {
    hadir: { label: "Hadir", color: "bg-green-500" },
    telat: { label: "Telat", color: "bg-red-500" },
    izin: { label: "Izin", color: "bg-yellow-500" },
    sakit: { label: "Sakit", color: "bg-orange-500" },
    alpha: { label: "Alpha", color: "bg-red-500" },
    lembur: { label: "Lembur", color: "bg-purple-500" },
  };

export const EmployeeStatusList = ({ employees }: EmployeeStatusListProps) => {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari anggota"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {filteredEmployees.map((emp) => {
          const config = emp.status ? statusConfig[emp.status] : null;

          return (
            <div
              key={emp.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar src={emp.avatarUrl} alt={emp.name} size="md" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {emp.name}
                  </p>
                  <p className="text-xs text-gray-500">{emp.title}</p>
                </div>
              </div>
              {config && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${config.color}`}
                >
                  {config.label}
                </span>
              )}
            </div>
          );
        })}

        {filteredEmployees.length === 0 && (
          <p className="text-center text-gray-500 py-4">Tidak ada data</p>
        )}
      </div>
    </div>
  );
};

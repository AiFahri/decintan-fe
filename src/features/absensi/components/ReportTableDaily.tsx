import { Download, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import { FacePreviewModal } from "@/ui/components/FacePreviewModal";
import { ConfirmationModal } from "@/ui/components/ConfirmationModal";
import { OvertimeActionButtons } from "./OvertimeActionButtons";
import type {
  AttendanceDaily,
  Employee,
  AttendanceFilters,
  AttendanceStatus,
} from "@/types/attendance";
import { exportToExcel } from "@/utils/excelExport";

interface ReportTableDailyProps {
  attendance: AttendanceDaily[];
  employees: Employee[];
}

const statusLabels: Record<string, string> = {
  hadir: "Hadir",
  telat: "Telat",
  izin: "Izin",
  sakit: "Sakit",
  alpha: "Alpha",
  lembur: "Lembur",
};

const statusColors: Record<string, string> = {
  hadir: "bg-green-100 text-green-700",
  telat: "bg-red-100 text-yellow-700",
  izin: "bg-blue-100 text-blue-700",
  sakit: "bg-orange-100 text-orange-700",
  alpha: "bg-red-200 text-red-700",
  lembur: "bg-purple-100 text-purple-700",
};

export const ReportTableDaily = ({
  attendance,
  employees,
}: ReportTableDailyProps) => {
  const [attendanceData, setAttendanceData] = useState(attendance);
  const [filters, setFilters] = useState<AttendanceFilters>({
    search: "",
    status: "",
  });
  const [faceModal, setFaceModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    name: string;
  }>({
    isOpen: false,
    imageUrl: "",
    name: "",
  });

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "approve" | "reject" | null;
    recordId: string | null;
  }>({ isOpen: false, type: null, recordId: null });

  const filteredData = attendanceData.filter((item) => {
    const employee = employees.find((e) => e.id === item.employeeId);
    if (!employee) return false;

    const matchSearch = filters.search
      ? employee.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchStatus = filters.status ? item.status === filters.status : true;

    return matchSearch && matchStatus;
  });

  const handleDownload = () => {
    const excelData = filteredData.map((item) => {
      const employee = employees.find((e) => e.id === item.employeeId);
      return {
        Anggota: employee?.name || "-",
        Jabatan: employee?.title || "-",
        Keterangan: statusLabels[item.status] || "-",
        "Jam Masuk": item.checkInTime || "-",
        Lokasi: item.locationText || "-",
        "Jam Pulang": item.checkOutTime || "-",
      };
    });

    exportToExcel(
      excelData,
      `Laporan_Harian_${new Date().toISOString().split("T")[0]}`
    );
  };

  // Handle approve/reject izin/sakit
  const handleApprove = (id: string) => {
    setConfirmModal({ isOpen: true, type: "approve", recordId: id });
  };

  const handleReject = (id: string) => {
    setConfirmModal({ isOpen: true, type: "reject", recordId: id });
  };

  const handleConfirmAction = () => {
    if (!confirmModal.recordId) return;

    setAttendanceData((prev) =>
      prev.map((record) =>
        record.id === confirmModal.recordId
          ? {
              ...record,
              status:
                confirmModal.type === "approve"
                  ? ((record.status === "izin"
                      ? "izin"
                      : "sakit") as AttendanceStatus)
                  : ("alpha" as AttendanceStatus),
            }
          : record
      )
    );

    alert(
      confirmModal.type === "approve"
        ? "✅ Izin/Sakit disetujui"
        : "❌ Izin/Sakit ditolak"
    );

    setConfirmModal({ isOpen: false, type: null, recordId: null });
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
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value as typeof filters.status,
            })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">Semua Status</option>
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Harian <ChevronDown className="w-4 h-4" />
        </button>

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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Keterangan
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Jam Masuk
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Face ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Jam Pulang
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Aksi
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
                    key={item.id}
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
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[item.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusLabels[item.status] || item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.checkInTime || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.locationText || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {item.faceImageUrl ? (
                        <button
                          onClick={() =>
                            setFaceModal({
                              isOpen: true,
                              imageUrl: item.faceImageUrl!,
                              name: employee.name,
                            })
                          }
                          className="text-sm text-primary-600 hover:text-primary-700 underline"
                        >
                          jpg.801
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.checkOutTime || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {(item.status === "izin" ||
                          item.status === "sakit") && (
                          <OvertimeActionButtons
                            onApprove={() => handleApprove(item.id)}
                            onReject={() => handleReject(item.id)}
                          />
                        )}
                      </div>
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

      <FacePreviewModal
        isOpen={faceModal.isOpen}
        imageUrl={faceModal.imageUrl}
        employeeName={faceModal.name}
        onClose={() => setFaceModal({ ...faceModal, isOpen: false })}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={
          confirmModal.type === "approve"
            ? "Setujui Izin/Sakit?"
            : "Tolak Izin/Sakit?"
        }
        message={
          confirmModal.type === "approve"
            ? "Apakah Anda yakin ingin menyetujui izin/sakit ini?"
            : "Apakah Anda yakin ingin menolak izin/sakit ini?"
        }
        confirmText={
          confirmModal.type === "approve" ? "Ya, Setujui" : "Ya, Tolak"
        }
        cancelText="Batal"
        confirmVariant={confirmModal.type === "approve" ? "success" : "danger"}
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setConfirmModal({ isOpen: false, type: null, recordId: null })
        }
      />
    </div>
  );
};

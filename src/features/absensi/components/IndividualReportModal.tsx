import { X } from "lucide-react";
import type { AttendanceDaily, Employee } from "@/types/attendance";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface IndividualReportModalProps {
  isOpen: boolean;
  employee: Employee | null;
  attendance: AttendanceDaily[];
  dateFrom: string;
  dateTo: string;
  onClose: () => void;
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
  telat: "bg-yellow-100 text-yellow-700",
  izin: "bg-blue-100 text-blue-700",
  sakit: "bg-orange-100 text-orange-700",
  alpha: "bg-red-100 text-red-700",
  lembur: "bg-purple-100 text-purple-700",
};

export function IndividualReportModal({
  isOpen,
  employee,
  attendance,
  dateFrom,
  dateTo,
  onClose,
}: IndividualReportModalProps) {
  if (!isOpen || !employee) return null;

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd MMM yyyy", { locale: id });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Laporan Absensi - {employee.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Periode: {formatDate(dateFrom)} - {formatDate(dateTo)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {attendance.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              Tidak ada data absensi untuk periode ini
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Keterangan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Jam Masuk
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Lokasi Masuk
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Jam Pulang
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Face ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Lokasi Pulang
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Alasan Lembur
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendance.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {formatDate(record.date)}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[record.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {statusLabels[record.status] || record.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-900">
                        {record.checkInTime || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {record.locationText || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-900">
                        {record.checkOutTime || "-"}
                      </td>

                      <td className="px-4 py-3">
                        {record.faceImageUrl ? (
                          <a
                            href={record.faceImageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            Lihat
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {record.checkOutLocationText || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {record.overtimeReason || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#2b3d9d] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

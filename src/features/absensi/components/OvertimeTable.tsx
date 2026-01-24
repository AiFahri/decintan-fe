import { useState } from "react";
import type { OvertimeRequest } from "@/types/overtime";
import type { Employee } from "@/types/attendance";
import { Avatar } from "@/ui/components/Avatar";
import { OvertimeActionButtons } from "./OvertimeActionButtons";
import { ImagePreviewModal } from "@/ui/components/ImagePreviewModal";
import { ReasonModal } from "@/ui/components/ReasonModal";

interface OvertimeTableProps {
  requests: OvertimeRequest[];
  employees: Employee[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function OvertimeTable({
  requests,
  employees,
  onApprove,
  onReject,
}: OvertimeTableProps) {
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const [reasonModal, setReasonModal] = useState<{
    isOpen: boolean;
    reason: string;
  }>({ isOpen: false, reason: "" });

  // Map employee data
  const getEmployee = (employeeId: string): Employee | undefined => {
    return employees.find((emp) => emp.id === employeeId);
  };

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <p className="text-gray-500">Tidak ada pengajuan lembur</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    aria-label="Pilih semua"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Anggota
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Jam Lembur
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Alasan Lembur
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Foto Hasil Lembur
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Face ID
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => {
                const employee = getEmployee(request.employeeId);
                return (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        aria-label={`Pilih ${employee?.name}`}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          alt={employee?.name || "Unknown"}
                          src={employee?.avatarUrl}
                          size="md"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {employee?.name || "Unknown Employee"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {employee?.title || "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {request.startTime} - {request.endTime}
                        </p>
                        <p className="text-gray-500">
                          {request.durationHours} Jam
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          setReasonModal({
                            isOpen: true,
                            reason: request.reason,
                          })
                        }
                        className="max-w-xs truncate text-left text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {request.reason}
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          setPreviewImage({
                            url: request.resultImageUrl,
                            title: "Foto Hasil Lembur",
                          })
                        }
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        Lihat Foto
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          setPreviewImage({
                            url: request.faceImageUrl,
                            title: "Face ID",
                          })
                        }
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        Lihat Face ID
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <OvertimeActionButtons
                          onApprove={() => onApprove(request.id)}
                          onReject={() => onReject(request.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {previewImage && (
        <ImagePreviewModal
          isOpen={true}
          imageUrl={previewImage.url}
          title={previewImage.title}
          onClose={() => setPreviewImage(null)}
        />
      )}

      <ReasonModal
        isOpen={reasonModal.isOpen}
        title="Alasan Lembur"
        reason={reasonModal.reason}
        onClose={() => setReasonModal({ isOpen: false, reason: "" })}
      />
    </>
  );
}

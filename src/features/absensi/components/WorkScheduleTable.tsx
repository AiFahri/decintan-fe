import { useState } from "react";
import { Save } from "lucide-react";
import type { WorkScheduleDay } from "@/types/attendance";

interface WorkScheduleTableProps {
  schedule: WorkScheduleDay[];
  weekKey?: string;
  onSave: (schedule: WorkScheduleDay[]) => void;
}

const dayNames = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export const WorkScheduleTable = ({
  schedule,
  weekKey,
  onSave,
}: WorkScheduleTableProps) => {
  const [editedSchedule, setEditedSchedule] =
    useState<WorkScheduleDay[]>(schedule);
  const [hasChanges, setHasChanges] = useState(false);

  const handleTimeChange = (
    dayOfWeek: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const updated = editedSchedule.map((day) =>
      day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day
    );
    setEditedSchedule(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(editedSchedule);
    setHasChanges(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Pengaturan Jam Kerja
          </h3>
          {weekKey && (
            <p className="text-sm text-gray-600 mt-1">Minggu: {weekKey}</p>
          )}
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#2b3d9d] text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Hari
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Jam Masuk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Jam Pulang
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {editedSchedule.map((day) => (
                <tr
                  key={day.dayOfWeek}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {dayNames[day.dayOfWeek - 1]}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) =>
                        handleTimeChange(
                          day.dayOfWeek,
                          "startTime",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) =>
                        handleTimeChange(
                          day.dayOfWeek,
                          "endTime",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Catatan:</strong> Perubahan pada minggu tertentu tidak akan
          mempengaruhi minggu lainnya. Jadwal dasar akan digunakan jika tidak
          ada pengaturan khusus untuk minggu tersebut.
        </p>
      </div>
    </div>
  );
};

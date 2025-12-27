import { useState } from "react";
import { WorkScheduleTable } from "../components/WorkScheduleTable";
import { workSchedulesMock } from "@/data/attendance.mock";
import type { WorkScheduleDay, WorkSchedules } from "@/types/attendance";

export const PengaturanTab = () => {
  const [schedules, setSchedules] = useState<WorkSchedules>(workSchedulesMock);
  const [selectedWeek, setSelectedWeek] = useState<string>("base");

  const getCurrentSchedule = (): WorkScheduleDay[] => {
    if (selectedWeek === "base") {
      return schedules.base.days;
    }
    const override = schedules.overrides.find(
      (o) => o.weekKey === selectedWeek
    );
    return override?.days || schedules.base.days;
  };

  const handleSave = (updatedSchedule: WorkScheduleDay[]) => {
    if (selectedWeek === "base") {
      setSchedules({
        ...schedules,
        base: { days: updatedSchedule },
      });
    } else {
      const existingOverride = schedules.overrides.find(
        (o) => o.weekKey === selectedWeek
      );
      if (existingOverride) {
        setSchedules({
          ...schedules,
          overrides: schedules.overrides.map((o) =>
            o.weekKey === selectedWeek ? { ...o, days: updatedSchedule } : o
          ),
        });
      } else {
        setSchedules({
          ...schedules,
          overrides: [
            ...schedules.overrides,
            { weekKey: selectedWeek, days: updatedSchedule },
          ],
        });
      }
    }
    alert("Jadwal berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pilih Minggu
        </label>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="base">Jadwal Dasar</option>
          {schedules.overrides.map((override) => (
            <option key={override.weekKey} value={override.weekKey}>
              {override.weekKey}
            </option>
          ))}
          <option value="2025-W01">2025-W01 (Buat Baru)</option>
        </select>
      </div>

      <WorkScheduleTable
        schedule={getCurrentSchedule()}
        weekKey={selectedWeek === "base" ? undefined : selectedWeek}
        onSave={handleSave}
      />
    </div>
  );
};

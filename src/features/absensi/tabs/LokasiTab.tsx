import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MapPlaceholder } from "../components/MapPlaceholder";
import { DailySummaryCard } from "../components/DailySummaryCard";
import { EmployeeStatusList } from "../components/EmployeeStatusList";
import {
  employeesMock,
  attendanceDailyMock,
  attendanceMapPinsMock,
} from "@/data/attendance.mock";

export const LokasiTab = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const todayDisplay = format(new Date(), "EEEE, d MMMM yyyy", { locale: id });

  // Calculate present/absent
  const todayAttendance = attendanceDailyMock.filter((a) => a.date === today);
  const present = todayAttendance.filter((a) => a.checkInTime).length;
  const activeEmployees = employeesMock.filter((e) => e.isActive);
  const absent = activeEmployees.length - present;

  const employeesWithStatus = activeEmployees.map((emp) => {
    const attendance = todayAttendance.find((a) => a.employeeId === emp.id);
    return {
      ...emp,
      status: attendance?.status,
      checkInTime: attendance?.checkInTime,
    };
  });

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <MapPlaceholder pins={attendanceMapPinsMock} />
      </div>

      <div className="lg:col-span-5 space-y-4">
        <DailySummaryCard
          present={present}
          absent={absent}
          date={todayDisplay}
        />
        <EmployeeStatusList employees={employeesWithStatus} />
      </div>
    </div>
  );
};

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EmployeeTask } from "@/types/progres";

interface CalendarWidgetProps {
  tasks: EmployeeTask[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  tasks,
  currentMonth,
  onMonthChange,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  // Get task dates for current month
  const taskDates = new Set(
    tasks
      .filter((task) => {
        const taskDate = new Date(task.date);
        return (
          taskDate.getFullYear() === currentMonth.getFullYear() &&
          taskDate.getMonth() === currentMonth.getMonth()
        );
      })
      .map((task) => new Date(task.date).getDate())
  );

  const days = [];
  // Empty cells before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const hasTask = taskDates.has(day);
    const isToday =
      day === new Date().getDate() &&
      currentMonth.getMonth() === new Date().getMonth() &&
      currentMonth.getFullYear() === new Date().getFullYear();

    days.push(
      <div
        key={day}
        className={`
          h-10 flex items-center justify-center text-sm font-medium
          ${isToday ? "bg-primary-600 text-white rounded-lg" : ""}
          ${hasTask && !isToday ? "text-red-600 font-bold" : "text-gray-700"}
          ${day === 0 || day === 6 ? "text-red-500" : ""}
        `}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-red-600">
          {currentMonth.getFullYear()}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-gray-800 min-w-[120px] text-center">
            {monthNames[currentMonth.getMonth()]}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-semibold py-2 ${
              day === "Sunday" || day === "Saturday"
                ? "text-red-600 bg-red-50"
                : "text-white bg-primary-600"
            } rounded-lg`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  );
};

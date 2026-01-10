import type { EmployeeTask } from "@/types/progres";
import { format } from "date-fns";

interface TaskListProps {
  tasks: EmployeeTask[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Sort tasks by date (ascending)
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      payment: "Pembayaran",
      checking: "Pengecekan",
      upload: "Upload",
      complaint: "Komplain",
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">List</h3>

      {sortedTasks.length === 0 ? (
        <p className="text-gray-500 text-sm">Tidak ada tugas untuk bulan ini</p>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 text-sm text-gray-700"
            >
              <span className="font-semibold text-primary-600 min-w-[60px]">
                {format(new Date(task.date), "d MMM")}:
              </span>
              <div className="flex-1">
                <p className="font-medium">{task.taskName}</p>
                {task.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {task.description}
                  </p>
                )}
              </div>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {getTypeLabel(task.type)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

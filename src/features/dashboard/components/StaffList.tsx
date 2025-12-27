import { Avatar } from "@/ui/components/Avatar";
import type { Staff } from "@/types/dashboard";

interface StaffListProps {
  staff: Staff[];
  onViewAll?: () => void;
}

export const StaffList = ({ staff, onViewAll }: StaffListProps) => {
  return (
    <div className="space-y-4">
      {staff.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={member.avatarUrl} alt={member.name} size="md" />
            <div>
              <p className="text-sm font-medium text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500">
                {member.status === "active"
                  ? "Sedang Aktif"
                  : `aktif ${member.lastActiveMinutes} menit lalu`}
              </p>
            </div>
          </div>
          <span
            className={`w-3 h-3 rounded-full shrink-0 ${
              member.status === "active" ? "bg-green-500" : "bg-red-500"
            }`}
            aria-label={member.status === "active" ? "Aktif" : "Tidak aktif"}
          />
        </div>
      ))}

      {onViewAll && (
        <button
          onClick={onViewAll}
          className="w-full py-2 mt-4 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
        >
          Lihat Semua
        </button>
      )}
    </div>
  );
};

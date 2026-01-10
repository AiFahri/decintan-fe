import { X, ChevronRight } from "lucide-react";
import { Avatar } from "@/ui/components/Avatar";
import { userActivitiesMock } from "@/data/management.mock";
import { mockUsers } from "@/data/auth.mock";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserClick: (userId: string) => void;
}

export function HistoryModal({
  isOpen,
  onClose,
  onUserClick,
}: HistoryModalProps) {
  if (!isOpen) return null;

  const getUser = (userId: string) => {
    return mockUsers.find((u) => u.id === userId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#2b3d9d] px-6 py-4 text-white">
          <div>
            <h3 className="text-lg font-semibold">History</h3>
            <p className="text-sm text-primary-100 mt-0.5">
              Info Terbaru Dari perusahaan
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Pengunjung
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Total mengunjungi
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Lama membuka
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userActivitiesMock.map((activity) => {
                  const user = getUser(activity.userId);
                  if (!user) return null;

                  return (
                    <tr
                      key={activity.userId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.avatarUrl}
                            alt={user.name}
                            size="md"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.jabatan} - {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.lastActive}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-center text-2xl font-bold text-primary-600">
                          {activity.totalVisits}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-center text-base font-semibold text-primary-600">
                          {activity.totalDuration}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => onUserClick(activity.userId)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b3d9d] text-white transition-all hover:bg-primary-700 hover:shadow-md"
                            aria-label="Lihat detail"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

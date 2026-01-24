import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import { userActivityDetailsMock } from "@/data/management.mock";
import { mockUsers } from "@/data/auth.mock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UserActivityDetailModalProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
  onBack: () => void;
}

export function UserActivityDetailModal({
  isOpen,
  userId,
  onClose,
  onBack,
}: UserActivityDetailModalProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  if (!isOpen || !userId) return null;

  const user = mockUsers.find((u) => u.id === userId);
  const activityDetail = userActivityDetailsMock[userId];

  if (!user || !activityDetail) return null;

  // Screenshot scroll handlers
  const handleScrollLeft = () => {
    const container = document.getElementById("screenshot-container");
    if (container) {
      const newPosition = Math.max(0, scrollPosition - 300);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    const container = document.getElementById("screenshot-container");
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 300);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
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
        <div className="flex items-center justify-between bg-[#2b3d9d] px-6 py-4 text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Kembali"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h3 className="text-lg font-semibold">History Detail</h3>
              <p className="text-sm text-primary-100 mt-0.5">
                Info Terbaru Dari perusahaan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {user.jabatan} - {user.name}
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <p className="text-sm font-medium text-primary-600 mb-2">
                Lama membuka
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {activityDetail.totalDuration}
              </p>
            </div>

            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <p className="text-sm font-medium text-primary-600 mb-2">
                Total halaman yang dibuka
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {activityDetail.totalPages}
              </p>
            </div>

            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <p className="text-sm font-medium text-primary-600 mb-2">
                Yang diubah
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {activityDetail.changesCount}.mengupload gambar
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-base font-semibold text-gray-900">
                Aktivitas Terakhir
              </h5>
              <div className="flex gap-2">
                <button
                  onClick={handleScrollLeft}
                  className="rounded-lg p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Scroll kiri"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="rounded-lg p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Scroll kanan"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div
              id="screenshot-container"
              className="flex gap-4 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {activityDetail.screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  className="flex-shrink-0"
                  style={{ width: "200px" }}
                >
                  <div className="relative overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={screenshot.url}
                      alt={`Screenshot ${screenshot.id}`}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-xs font-medium text-white">
                        {screenshot.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h5 className="text-base font-semibold text-gray-900 mb-4">
              waktu yang di habiskan per fitur
            </h5>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityDetail.timePerFeature}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickFormatter={(value) => `${value}m`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number | undefined) => [
                      `${value ?? 0} menit`,
                    ]}
                    labelFormatter={(_label, payload) =>
                      payload && payload[0]?.payload?.feature
                        ? payload[0].payload.feature
                        : ""
                    }
                  />
                  <Bar dataKey="minutes" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

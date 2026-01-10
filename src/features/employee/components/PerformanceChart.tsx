import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { X } from "lucide-react";
import type { PerformanceData } from "@/types/progres";

interface PerformanceChartProps {
  data: PerformanceData;
  compact?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  compact = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Transform data for Recharts
  const chartData = data.stats.map((stat, index) => ({
    tanggal: index + 1,
    Kinerja: stat.performance,
    target: stat.target,
  }));

  const handleChartClick = () => {
    if (compact) {
      setIsZoomed(true);
    }
  };

  const ChartComponent = (
    <div className={compact ? "cursor-pointer" : ""} onClick={handleChartClick}>
      <ResponsiveContainer width="100%" height={compact ? 200 : 400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="tanggal"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toString()}
          />
          <YAxis
            label={{
              value: "persentan",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12 },
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Line
            type="monotone"
            dataKey="Kinerja"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  if (isZoomed) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsZoomed(false)}
        />

        <div className="fixed inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/logo_decintan.jpg"
                alt="DECINTAN"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Grafik Kinerja
                </h2>
                <p className="text-sm text-gray-500">
                  {data.employeeName} - Desember 2025
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsZoomed(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="tanggal"
                    tick={{ fontSize: 14 }}
                    tickFormatter={(value) => value.toString()}
                  />
                  <YAxis
                    label={{
                      value: "persentan",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 14 },
                    }}
                    tick={{ fontSize: 14 }}
                  />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 16 }} />
                  <Line
                    type="monotone"
                    dataKey="Kinerja"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Keterangan
              </h3>
              <div className="space-y-3">
                {data.complaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-semibold text-primary-600 min-w-20">
                        {complaint.date}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {complaint.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {complaint.projectName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return ChartComponent;
};

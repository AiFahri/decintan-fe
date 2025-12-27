import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { RevenueDataPoint } from "@/types/dashboard";

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="w-full h-64 lg:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="rugi"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ef4444" }}
            name="Rugi"
          />
          <Line
            type="monotone"
            dataKey="untung"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4, fill: "#10b981" }}
            name="Untung"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

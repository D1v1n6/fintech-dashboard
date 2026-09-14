import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendingTrend } from "../../types/analytics";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const SpendingTrend = () => {
  const { darkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("3 Months");

  const primaryText = darkMode ? "#F8FAFC" : "#0F172A";
  const secondaryText = darkMode ? "#94A3B8" : "#64748B";
  const filteredSpendingTrend =
    selectedPeriod === "3 Months"
      ? spendingTrend.slice(-3)
      : selectedPeriod === "6 Months"
        ? spendingTrend.slice(-6)
        : spendingTrend;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Spending Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track how your spending changes over time
          </p>
        </div>

        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="1 Year">1 Year</option>
        </select>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredSpendingTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-slate-200 dark:stroke-slate-700"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: secondaryText, fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: secondaryText, fontSize: 12 }}
              tickFormatter={(value) => `₦${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => `₦${Number(value).toLocaleString()}`}
              contentStyle={{
                backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                borderColor: darkMode ? "#334155" : "#E2E8F0",
                borderRadius: "12px",
                color: primaryText,
              }}
            />

            <Line
              type="monotone"
              dataKey="spending"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrend;

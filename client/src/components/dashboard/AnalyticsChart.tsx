import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const data = [
  { month: "Jan", income: 820000, expense: 520000 },
  { month: "Feb", income: 920000, expense: 610000 },
  { month: "Mar", income: 760000, expense: 480000 },
  { month: "Apr", income: 1100000, expense: 700000 },
  { month: "May", income: 950000, expense: 640000 },
  { month: "Jun", income: 1250000, expense: 820000 },
];

const AnalyticsChart = () => {
  const { darkMode } = useTheme();

  const gridColor = darkMode ? "#334155" : "#E2E8F0";
  const textColor = darkMode ? "#94A3B8" : "#64748B";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Income vs Expenses
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly overview
          </p>
        </div>

        <button className="rounded-2xl bg-slate-200 px-3 py-2 text-sm text-slate-700 dark:bg-slate-700 dark:text-white">
          Month
        </button>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

          <XAxis dataKey="month" stroke={textColor} />

          <YAxis stroke={textColor} />

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
              borderColor: darkMode ? "#334155" : "#E2E8F0",
              borderRadius: "12px",
              color: darkMode ? "#FFFFFF" : "#0F172A",
            }}
          />

          <Bar
            dataKey="income"
            fill="#3B82F6"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="expense"
            fill="#22C55E"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center gap-2">
          <span className="h-[10px] w-[10px] rounded-full bg-blue-500" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Income
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-[10px] w-[10px] rounded-full bg-green-500" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Expenses
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
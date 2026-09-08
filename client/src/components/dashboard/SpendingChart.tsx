import React from "react";
import { GrAnalytics } from "react-icons/gr";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import clsx from "clsx";
import { useTheme } from "../../context/ThemeContext";

const spendingData = [
  {
    name: "Housing",
    value: 38,
    color: "#3B82F6",
    color2: "bg-[#3B82F6]",
  },
  {
    name: "Food",
    value: 23,
    color: "#10B981",
    color2: "bg-[#10B981]",
  },
  {
    name: "Shopping",
    value: 16,
    color: "#F59E0B",
    color2: "bg-[#F59E0B]",
  },
  {
    name: "Transport",
    value: 11,
    color: "#8B5CF6",
    color2: "bg-[#8B5CF6]",
  },
  {
    name: "Utilities",
    value: 7,
    color: "#EF4444",
    color2: "bg-[#EF4444]",
  },
  {
    name: "Entertainment",
    value: 5,
    color: "#06B6D4",
    color2: "bg-[#06B6D4]",
  },
];

const SpendingChart = () => {
  const { darkMode } = useTheme();

  const primaryText = darkMode ? "#F8FAFC" : "#0F172A";
  const secondaryText = darkMode ? "#94A3B8" : "#64748B";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Spending Categories
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            This month
          </p>
        </div>

        <GrAnalytics className="text-xl text-slate-700 dark:text-white" />
      </div>

      <ResponsiveContainer width="100%" height={208}>
        <PieChart>
          <Pie
            data={spendingData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
          >
            {spendingData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}

            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              fill={primaryText}
              fontSize="12"
              fontWeight="bold"
            >
              This Month
            </text>

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill={secondaryText}
              fontSize="10"
            >
              Spending
            </text>
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
              borderColor: darkMode ? "#334155" : "#E2E8F0",
              borderRadius: "12px",
              color: primaryText,
            }}
          />
        </PieChart>
      </ResponsiveContainer>

        {spendingData.map((sp) => (
          <div
            key={sp.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "h-[10px] w-[10px] rounded-full",
                  sp.color2
                )}
              />

              <span className="text-slate-500 dark:text-slate-400">
                {sp.name}
              </span>
            </div>

            <span className="text-slate-500 dark:text-slate-400">
              {sp.value}%
            </span>
          </div>
        ))}
    </div>
  );
};

export default SpendingChart;
import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { month: "Jan", income: 820000, expense: 520000 },
  { month: "Feb", income: 920000, expense: 610000 },
  { month: "Mar", income: 760000, expense: 480000 },
  { month: "Apr", income: 1100000, expense: 700000 },
  { month: "May", income: 950000, expense: 640000 },
  { month: "Jun", income: 1250000, expense: 820000 },
];

const AnalyticsChart = () => {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Income vs Expenses
          </h2>

          <p className="text-sm text-slate-400">Monthly overview</p>
        </div>

        <button className="rounded-2xl bg-slate-700 px-3 py-2 text-sm text-white">
          Month
        </button>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Bar
            type="monotone"
            dataKey="income"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.15}
          />
          <Bar
            type="monotone"
            dataKey="expense"
            stroke="#22C55E"
            fill="#22C55E"
            fillOpacity={0.15}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center gap-5">
            <div className="flex items-center gap-2">
                <span className="bg-sky-800 rounded-3xl h-[10px] w-[10px]"/>
                <span className="text-slate-400 text-sm">Income</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="bg-emerald-600 rounded-3xl h-[10px] w-[10px]"/>
                <span className="text-slate-400 text-sm">Expenses</span>
            </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;

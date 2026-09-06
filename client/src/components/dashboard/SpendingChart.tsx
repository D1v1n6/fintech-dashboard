import React from "react";
import { GrAnalytics } from "react-icons/gr";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import clsx from "clsx";

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
  //const total = spendingData.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Spending Categories
          </h2>
          <p className="text-sm text-slate-400">This month</p>
        </div>
        <GrAnalytics className="text-white text-xl" />
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
              fill="#F8FAFC"
              fontSize="12"
              fontWeight="bold"
            >
              This Month
            </text>

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="10"
            >
              Spending
            </text>
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {spendingData.map((sp) => (
        <div key={sp.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={clsx("rounded-3xl h-[10px] w-[10px]", sp.color2)}
            />
            <span className="text-slate-400">{sp.name}</span>
          </div>
          <span className="text-slate-400">{sp.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default SpendingChart;

import clsx from "clsx";
import React from "react";
import { LuWallet } from "react-icons/lu";

const finances = [
  {
    id: "1",
    title: "Monthly Budget",
    target: 1000000,
    current: 740000,
  },
  {
    id: "2",
    title: "Emergency Fund",
    target: 1500000,
    current: 1300000,
  },
  {
    id: "3",
    title: "Vacation Fund",
    target: 600000,
    current: 200000,
  },
];

const getProgressColor = (percentage: number) => {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 50) return "bg-blue-500";
  return "bg-amber-500";
};

const BudgetCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Financial Goals
        </h2>

        <LuWallet className="text-lg text-green-700" />
      </div>

      {finances.map((f) => {
        const percentage = Math.round((f.current / f.target) * 100);

        return (
          <div key={f.id}>
            <div className="outline outline-slate-200 dark:outline-gray-700" />

            <div className="py-7">
              <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                {f.title}
              </h2>

              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  ₦{f.current.toLocaleString()} / ₦
                  {f.target.toLocaleString()}
                </p>

                <span
                  className={clsx(
                    "text-sm font-semibold",
                    percentage >= 80 && "text-green-500",
                    percentage >= 50 && percentage < 80 && "text-blue-500",
                    percentage < 50 && "text-amber-500"
                  )}
                >
                  {percentage}%
                </span>
              </div>

              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className={`h-full rounded-full ${getProgressColor(
                    percentage
                  )}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetCard;
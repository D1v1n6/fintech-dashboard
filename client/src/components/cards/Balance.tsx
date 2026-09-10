import React from "react";

interface CardItemProps {
  title: string;
  balance: number;
  percent: string;
  icon?: React.ReactNode;
  isCurrency: boolean;
}

const Balance = ({
  icon,
  title,
  balance,
  percent,
  isCurrency,
}: CardItemProps) => {
  return (
    <div
      className=" dark:bg-[#1E293B]
      border-slate-200 bg-white
            rounded-2xl
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:border-blue-500/20
            border
            dark:border-transparent cursor-pointer shadow-lg"
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-zinc-600 dark:text-zinc-400 font-bold">{title}</p>
        <p className="text-green-700">{icon}</p>
      </div>
      <h1 className="md:text-3xl text-lg font-bold text-slate-900 dark:text-white">
        {title === "Savings Rate"
          ? `${balance.toLocaleString()}%`
          : isCurrency
            ? `₦${balance.toLocaleString()}`
            : balance.toLocaleString()}
      </h1>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-semibold text-green-400">{percent}</span>

        <span className="text-xs text-slate-500">this month</span>
      </div>
    </div>
  );
};

export default Balance;

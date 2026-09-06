import React from "react";
import {
  LuArrowUpRight,
  LuArrowDownLeft,
  LuReceipt,
  LuSmartphone,
  LuChartColumn,
  LuEllipsis,
} from "react-icons/lu";

const actions = [
  {
    id: 1,
    title: "Transfer",
    icon: <LuArrowUpRight />,
  },
  {
    id: 2,
    title: "Pay Bills",
    icon: <LuReceipt />,
  },
  {
    id: 3,
    title: "Airtime",
    icon: <LuSmartphone />,
  },
  {
    id: 4,
    title: "Deposit",
    icon: <LuArrowDownLeft />,
  },
  {
    id: 5,
    title: "Analytics",
    icon: <LuChartColumn />,
  },
  {
    id: 6,
    title: "More",
    icon: <LuEllipsis />,
  },
];

const QuickActions = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-700 bg-slate-800 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>

        <p className="text-sm text-slate-400">Frequently used services</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <div className="flex flex-col items-center justify-center mb-6 rounded-2xl border border-slate-700 bg-slate-900 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-slate-700 hover:-translate-y-1 cursor-pointer">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 text-xl">
              {action.icon}
            </div>
            <p className="text-sm font-medium text-white">{action.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

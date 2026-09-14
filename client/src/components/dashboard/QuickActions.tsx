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
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Frequently used services
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="mb-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-xl text-blue-500 dark:text-blue-400">
              {action.icon}
            </div>

            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {action.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
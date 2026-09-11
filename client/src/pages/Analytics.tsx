import { LuArrowDownRight, LuArrowUpRight, LuPiggyBank } from "react-icons/lu";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  analyticsOverview,
  incomeVsExpenses,
  spendingByCategory,
} from "../types/analytics";

const Analytics = () => {
  const { income, expenses, savings } = analyticsOverview;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track your financial activity and spending habits
        </p>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Income */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Income
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₦{income.toLocaleString()}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-xl text-green-500">
              <LuArrowUpRight />
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Expenses
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₦{expenses.toLocaleString()}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-xl text-red-500">
              <LuArrowDownRight />
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Net Savings
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₦{savings.toLocaleString()}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-500">
              <LuPiggyBank />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Income vs Expenses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Income vs Expenses
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Compare your income and expenses over the past few months
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpenses}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-slate-200 dark:stroke-slate-700"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₦${value / 1000}k`}
                  className="text-xs"
                />

                <Tooltip
                  formatter={(value) => `₦${Number(value).toLocaleString()}`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                  }}
                />

                <Legend />

                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Spending by Category
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              See where your money is going
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => `₦${Number(value).toLocaleString()}`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                  }}
                />

                <Legend verticalAlign="bottom"  height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

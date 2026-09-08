import clsx from "clsx";
import React from "react";
import type { Transaction } from "../../types/transaction";

const color = {
  debit: "text-red-400",
  credit: "text-green-700",
};

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Netflix",
    amount: 6500,
    category: "Subscription",
    day: "Today",
    type: "debit",
  },
  {
    id: "2",
    title: "Paystack",
    amount: 450000,
    category: "Salary",
    day: "Yesterday",
    type: "credit",
  },
  {
    id: "3",
    title: "Uber",
    amount: 12800,
    category: "Transport",
    day: "Yesterday",
    type: "debit",
  },
  {
    id: "4",
    title: "MTN Nigeria",
    amount: 5000,
    category: "Data",
    day: "2 days ago",
    type: "debit",
  },
];

const TransactionCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Latest activity on your account
          </p>
        </div>

        <button className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-sky-600 dark:bg-slate-700">
          4 new
        </button>
      </div>

      {transactions.map((t) => (
        <div key={t.id}>
          <div className="outline outline-slate-200 dark:outline-gray-700" />

          <div className="flex items-center justify-between py-7">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {t.title}
                </h2>

                <span className="rounded-2xl border border-slate-300 px-1 py-0.5 text-xs text-slate-500 dark:border-gray-400 dark:text-slate-400">
                  {t.category}
                </span>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t.day} - Completed
              </p>
            </div>

            <p className={clsx("text-lg font-semibold", color[t.type])}>
              {t.type === "credit" ? "+" : "-"}₦
              {t.amount.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCard;
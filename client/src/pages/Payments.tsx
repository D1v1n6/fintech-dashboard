import {
  LuArrowUpRight,
  LuReceipt,
  LuSmartphone,
  LuArrowDownLeft,
} from "react-icons/lu";
import { account } from "../types/account";
import { useState } from "react";

const paymentActions = [
  {
    id: 1,
    title: "Transfer Money",
    description: "Send money to another account",
    icon: <LuArrowUpRight />,
  },
  {
    id: 2,
    title: "Pay Bills",
    description: "Electricity, internet and more",
    icon: <LuReceipt />,
  },
  {
    id: 3,
    title: "Buy Airtime",
    description: "Top up your mobile line",
    icon: <LuSmartphone />,
  },
  {
    id: 4,
    title: "Deposit Money",
    description: "Add money to your account",
    icon: <LuArrowDownLeft />,
  },
];

const Payments = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Payments
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Send money, pay bills and manage your payments
        </p>
      </div>

      {/* Available Balance */}
      <div className="rounded-2xl border border-green-500/20 bg-white p-8 text-center shadow-lg dark:border-green-500/20 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Available Balance
        </h2>

        <p className="mt-3 text-3xl md:text-4xl font-bold text-green-600">
          ₦{account.balance.toLocaleString()}
        </p>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Available for payments
        </p>
      </div>

      {/* Payment Actions */}
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paymentActions.map((action) => {
          const isSelected = selectedAction === action.title;

          return (
            <div
              key={action.id}
              className={`rounded-2xl border bg-white shadow-lg transition dark:bg-slate-800 ${
                isSelected
                  ? "border-blue-500 dark:border-blue-500"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {/* Action Header */}
              <button
                onClick={() =>
                  setSelectedAction(isSelected ? null : action.title)
                }
                className="group w-full cursor-pointer p-5 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                    {action.icon}
                  </div>

                  <span className="text-slate-400">
                    {isSelected ? "▲" : "▼"}
                  </span>
                </div>

                <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">
                  {action.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {action.description}
                </p>
              </button>

              {/* Expanded Content */}
              {isSelected && (
                <div className="border-t border-slate-200 p-5 dark:border-slate-700">
                  {action.title === "Transfer Money" && (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Recipient
                        </label>

                        <input
                          type="text"
                          placeholder="Enter recipient name or account number"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Amount
                        </label>

                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            ₦
                          </span>

                          <input
                            type="number"
                            placeholder="0.00"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Payments;

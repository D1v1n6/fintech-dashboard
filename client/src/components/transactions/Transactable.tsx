import { useState } from "react";
import type { TransactionData } from "../../types/transaction";
import TransactionDrawer from "./TransactionDrawer";

interface TransactionItemProps extends TransactionData {
  onClick: () => void;
}

const TableHeader = () => (
  <thead className="border-b border-slate-200 dark:border-slate-700">
    <tr className="text-left text-sm text-slate-500 dark:text-slate-400">
      <th className="py-4">Account</th>
      <th className="py-4">Category</th>
      <th className="py-4">Date</th>
      <th className="py-4">Status</th>
      <th className="py-4 text-right">Amount</th>
    </tr>
  </thead>
);

const TableRow = ({
account,
category,
type,
amount,
date,
status,
onClick,
}: TransactionItemProps) => (
  <tr
    onClick={onClick}
    className="cursor-pointer border-b border-slate-200 transition hover:bg-slate-100 hover:shadow-lg dark:border-slate-700 dark:hover:bg-slate-800"
  >
    <td className="py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white md:h-10 md:w-10">
          {account.name.charAt(0)}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-900 dark:text-white">
            {account.name}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">{account.bankName}</p>
        </div>
      </div>
    </td>

    <td className="text-slate-500 dark:text-slate-400">{category}</td>

    <td className="text-slate-500 dark:text-slate-400">{date}</td>

    <td>
      <span
        className={`rounded-full px-3 py-1 text-xs ${
          status === "Completed"
            ? "bg-green-500/20 text-green-400"
            : status === "Pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
        }`}
      >
        {status}
      </span>
    </td>

    <td
      className={`text-right text-lg font-semibold ${
        type === "Income" ? "text-green-400" : "text-red-400"
      }`}
    >
      {type === "Income"
        ? `+₦${Math.abs(amount).toLocaleString()}`
        : `-₦${Math.abs(amount).toLocaleString()}`}
    </td>
  </tr>
);

interface TransactableProps {
  transactions: TransactionData[];
}

const Transactable = ({ transactions }: TransactableProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionData | null>(null);

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full">
          <TableHeader />

          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow
                  key={transaction._id}
                  {...transaction}
                  onClick={() => setSelectedTransaction(transaction)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              onClick={() => setSelectedTransaction(transaction)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-medium text-slate-700 dark:bg-slate-700 dark:text-white">
                    {transaction.account.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {transaction.account.name}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.account.bankName}</p>
                  </div>
                </div>

                <p
                  className={`text-right text-lg font-semibold ${
                    transaction.type === "Income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "Income"
                    ? `+₦${Math.abs(transaction.amount).toLocaleString()}`
                    : `-₦${Math.abs(transaction.amount).toLocaleString()}`}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {transaction.category}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {transaction.date} •
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    transaction.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : transaction.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-400">
            No transactions found.
          </div>
        )}
      </div>

      <TransactionDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
};

export default Transactable;

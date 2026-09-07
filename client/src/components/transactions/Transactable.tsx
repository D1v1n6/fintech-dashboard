import { useState } from "react";
import { type Transaction } from "./transactions";
import TransactionDrawer from "./TransactionDrawer";

interface TransactionItemProps extends Transaction {
  onClick: () => void;
}

const TableHeader = () => (
  <thead className="border-b border-slate-700">
    <tr className="text-left text-sm text-slate-400">
      <th className="py-4">Recipient</th>
      <th className="py-4">Category</th>
      <th className="py-4">Date</th>
      <th className="py-4">Status</th>
      <th className="py-4 text-right">Amount</th>
    </tr>
  </thead>
);

const TableRow = ({
  recipient,
  bank,
  category,
  date,
  status,
  type,
  amount,
  onClick,
}: TransactionItemProps) => (
  <tr
    onClick={onClick}
    className="border-b border-slate-700 hover:bg-slate-800 hover:shadow-lg transition cursor-pointer"
  >
    <td className="py-4">
      <div className="flex items-center gap-2">
        <div className="flex md:h-10 md:w-10 h-5 w-5 items-center justify-center rounded-full bg-slate-700">
          {recipient.charAt(0)}
        </div>

        <div>
          <p className="text-xs font-medium text-white">{recipient}</p>

          <p className="text-xs text-slate-400">{bank}</p>
        </div>
      </div>
    </td>

    <td className="text-slate-400">{category}</td>

    <td className="text-slate-400">{date}</td>

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
        type === "income" ? "text-green-400" : "text-red-400"
      }`}
    >
      {type === "income"
        ? `+₦${Math.abs(amount).toLocaleString()}`
        : `-₦${Math.abs(amount).toLocaleString()}`}
    </td>
  </tr>
);

interface TransactableProps {
  transactions: Transaction[];
}

const Transactable = ({ transactions }: TransactableProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

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
                  key={transaction.id}
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
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction)}
              className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:bg-slate-700"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-medium text-white">
                    {transaction.recipient.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {transaction.recipient}
                    </p>

                    <p className="text-xs text-slate-400">{transaction.bank}</p>
                  </div>
                </div>

                <p
                  className={`text-right text-lg font-semibold ${
                    transaction.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "income"
                    ? `+₦${Math.abs(transaction.amount).toLocaleString()}`
                    : `-₦${Math.abs(transaction.amount).toLocaleString()}`}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-3">
                <div>
                  <p className="text-sm text-slate-300">
                    {transaction.category}
                  </p>

                  <p className="text-xs text-slate-500">
                    {transaction.date} • {transaction.time}
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

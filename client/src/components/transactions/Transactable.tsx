import React from "react";
import { transactions, type Transaction } from "./transactions";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";

import { MdOutlineElectricBolt } from "react-icons/md";

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
  category,
  date,
  status,
  amount,
}: Transaction) => (
  <tr className="border-b border-slate-700 hover:bg-slate-800 hover:shadow-lg transition cursor-pointer">
    <td className="py-4">
      <div className="flex items-center gap-2">
        <div className="flex md:h-10 md:w-10 h-5 w-5 items-center justify-center rounded-full bg-slate-700">
          {recipient.charAt(0)}
        </div>

        <div>
          <p className="text-xs font-medium text-white">{recipient}</p>

          <p className="text-xs text-slate-400">GTBank</p>
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
        amount > 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      {amount > 0
        ? `+₦${amount.toLocaleString()}`
        : `-₦${Math.abs(amount).toLocaleString()}`}
    </td>
  </tr>
);
const Transactable = () => {
  return (
    <table className="w-full">
      <TableHeader />
      <tbody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id} {...transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default Transactable;

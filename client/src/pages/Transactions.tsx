import React from "react";
import Transactable from "../components/transactions/Transactable";
import Balance from "../components/cards/Balance";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";

import { FiClock, FiCreditCard } from "react-icons/fi";

const transactions = [
  {
    title: "Total Transactions",
    balance: 245,
    icon: <FiCreditCard />,
    isCurrency: false
  },
  {
    title: "Money In",
    balance: 1250000,
    icon: <HiOutlineArrowTrendingUp />,
    isCurrency: true
  },
  {
    title: "Money Out",
    balance: 850000,
    icon: <HiOutlineArrowTrendingDown />,
    isCurrency: true
  },
  {
    title: "Pending",
    balance: 8,
    icon: <FiClock />,
    isCurrency: false
  },
];

const Transactions = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-white">Transactions</h1>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Export
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-12 md:flex md:flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="flex-1 col-span-12 rounded-lg border border-slate-700 bg-[#1E293B] px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
        />

        <select className="rounded-lg col-span-4 bg-[#1E293B] px-4 py-3 text-white cursor-pointer">
          <option>All</option>
          <option>Income</option>
          <option>Expenses</option>
        </select>

        <select className="rounded-lg col-span-4 bg-[#1E293B] px-4 py-3 text-white cursor-pointer">
          <option>Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        <select className="rounded-lg col-span-4 bg-[#1E293B] px-4 py-3 text-white cursor-pointer">
          <option>This Month</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-5">
        {transactions.map((t) => (
          <Balance title={t.title} balance={t.balance} icon={t.icon} isCurrency={t.isCurrency} percent="" />
        ))}
      </div>

      {/* Transactions Table goes here */}
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-3">
        <Transactable />
      </div>
    </div>
  );
};

export default Transactions;

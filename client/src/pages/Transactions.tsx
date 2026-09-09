import { useState } from "react";
import Transactable from "../components/transactions/Transactable";
import Balance from "../components/cards/Balance";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";

import { FiClock, FiCreditCard } from "react-icons/fi";
import { transactions } from "../components/transactions/transactions";

const transactionsCard = [
  {
    title: "Total Transactions",
    balance: 245,
    icon: <FiCreditCard />,
    isCurrency: false,
  },
  {
    title: "Money In",
    balance: 1250000,
    icon: <HiOutlineArrowTrendingUp />,
    isCurrency: true,
  },
  {
    title: "Money Out",
    balance: 850000,
    icon: <HiOutlineArrowTrendingDown />,
    isCurrency: true,
  },
  {
    title: "Pending",
    balance: 8,
    icon: <FiClock />,
    isCurrency: false,
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("This Month");

  const today = new Date();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      transactionType === "All" || transaction.type === transactionType;

    const matchesStatus =
      statusFilter === "All" || transaction.status === statusFilter;

    const matchesDate = (() => {
      const transactionDate = new Date(transaction.transactionDate);

      if (dateFilter === "This Month") {
        return (
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      }

      if (dateFilter === "Last 7 Days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        return transactionDate >= sevenDaysAgo;
      }

      if (dateFilter === "Last 30 Days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        return transactionDate >= thirtyDaysAgo;
      }

      return true;
    })();

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const handleExport = () => {
    const headers = [
      "Recipient",
      "Bank",
      "Category",
      "Date",
      "Time",
      "Status",
      "Amount",
      "Type",
      "Reference",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.recipient,
      transaction.bank,
      transaction.category,
      transaction.transactionDate,
      transaction.time,
      transaction.status,
      transaction.amount,
      transaction.type,
      transaction.reference,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";

    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
          Transactions
        </h1>

        <button
          onClick={handleExport}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
        >
          Export
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-12 md:flex md:flex-wrap gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search transactions..."
          className="flex-1 col-span-12 rounded-lg border border-slate-200 text-slate-900 bg-white dark:border-slate-700 dark:bg-[#1E293B] px-4 py-3 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-500 shadow-lg"
        />

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="col-span-4 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-[#1E293B] dark:text-white shadow-lg"
        >
          <option value="All">All</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="col-span-4 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-[#1E293B] dark:text-white shadow-lg"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="col-span-4 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-[#1E293B] dark:text-white shadow-lg"
        >
          <option value="This Month">This Month</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>
      <div className="hidden md:grid md:grid-cols-2 gap-6 mb-5">
        {transactionsCard.map((t) => (
          <Balance
            key={t.title}
            title={t.title}
            balance={t.balance}
            icon={t.icon}
            isCurrency={t.isCurrency}
            percent=""
          />
        ))}
      </div>

      {/* Transactions Table goes here */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <Transactable transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default Transactions;

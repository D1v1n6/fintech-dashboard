import { useEffect, useState } from "react";
import Transactable from "../components/transactions/Transactable";
import Balance from "../components/cards/Balance";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";

import { FiClock, FiCreditCard } from "react-icons/fi";
import type { TransactionData } from "../types/transaction";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }

      const data = await response.json();
      setTransactionData(data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactionData.filter((transaction) => {
    const matchesSearch =
      transaction.account.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.account.bankName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      transactionType === "All" || transaction.type === transactionType;

    const matchesStatus =
      statusFilter === "All" || transaction.status === statusFilter;

    const matchesDate = (() => {
      const transactionDate = new Date(transaction.date);

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

  const totalTransactions = filteredTransactions.length;

  const moneyIn = filteredTransactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const moneyOut = filteredTransactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const pendingTransactions = filteredTransactions.filter(
    (transaction) => transaction.status === "Pending",
  ).length;

  const transactionsCard = [
    {
      title: "Total Transactions",
      balance: totalTransactions,
      icon: <FiCreditCard />,
      isCurrency: false,
    },
    {
      title: "Money In",
      balance: moneyIn,
      icon: <HiOutlineArrowTrendingUp />,
      isCurrency: true,
    },
    {
      title: "Money Out",
      balance: moneyOut,
      icon: <HiOutlineArrowTrendingDown />,
      isCurrency: true,
    },
    {
      title: "Pending",
      balance: pendingTransactions,
      icon: <FiClock />,
      isCurrency: false,
    },
  ];

  const handleExport = () => {
    const headers = [
      "Account",
      "Bank",
      "Category",
      "Date",
      "Status",
      "Amount",
      "Type",
      "Description",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.account.name,
      transaction.account.bankName,
      transaction.category,
      new Date(transaction.date).toLocaleDateString(),
      transaction.status,
      transaction.amount,
      transaction.type,
      transaction.description,
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
          <option value="Income">Income</option>
          <option value="Expense">Expenses</option>
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
      {isLoading ? (
        <div className="py-10 text-center text-slate-500 dark:text-slate-400">
          Loading transactions...
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <Transactable transactions={filteredTransactions} />
        </div>
      )}
    </div>
  );
};

export default Transactions;

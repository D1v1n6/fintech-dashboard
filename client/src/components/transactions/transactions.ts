export interface Transaction {
  id: number;
  recipient: string;
  bank: string;
  category: string;
  date: string;
  transactionDate: string;
  time: string;
  status: "Completed" | "Pending" | "Failed";
  amount: number;
  type: "income" | "expense";
  reference: string;
}

export const transactions: Transaction[] = [
  {
    id: 1,
    recipient: "John Doe",
    bank: "GTBank",
    category: "Transfer",
    date: "Today",
    transactionDate: "2026-09-07",
    time: "10:35 AM",
    status: "Completed",
    amount: 25000,
    type: "expense",
    reference: "TRX-93827482",
  },
  {
    id: 2,
    recipient: "Netflix",
    bank: "Subscription",
    category: "Bills",
    date: "Yesterday",
    transactionDate: "2026-09-06",
    time: "8:20 PM",
    status: "Completed",
    amount: 6000,
    type: "expense",
    reference: "TRX-82736491",
  },
  {
    id: 3,
    recipient: "Salary",
    bank: "Company Payment",
    category: "Income",
    date: "28 Jul",
    transactionDate: "2026-07-28",
    time: "9:00 AM",
    status: "Completed",
    amount: 200000,
    type: "income",
    reference: "TRX-19283746",
  },
  {
    id: 4,
    recipient: "PHED",
    bank: "Electricity",
    category: "Utilities",
    date: "26 Jul",
    transactionDate: "2026-07-26",
    time: "2:45 PM",
    status: "Pending",
    amount: 18000,
    type: "expense",
    reference: "TRX-56473829",
  },
];

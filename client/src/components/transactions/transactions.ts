export interface Transaction {
  id: number;
  recipient: string;
  category: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  amount: number;
  type: "income" | "expense";
}

export const transactions: Transaction[] = [
  {
    id: 1,
    recipient: "John Doe",
    category: "Transfer",
    date: "Today",
    status: "Completed",
    amount: -25000,
    type: "expense",
  },
  {
    id: 2,
    recipient: "Netflix",
    category: "Bills",
    date: "Yesterday",
    status: "Completed",
    amount: -6000,
    type: "expense",
  },
  {
    id: 3,
    recipient: "Salary",
    category: "Income",
    date: "28 Jul",
    status: "Completed",
    amount: +200000,
    type: "income",
  },
  {
    id: 4,
    recipient: "PHED",
    category: "Utilities",
    date: "26 Jul",
    status: "Pending",
    amount: -18000,
    type: "expense",
  },
];
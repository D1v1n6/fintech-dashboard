export type TransactionData = {
  _id: string;
  account: TransactionAccount;
  type: "Income" | "Expense";
  category?: string;
  amount: number;
  description?: string;
  date: string;
  status: "Pending" | "Completed" | "Failed";
  createdAt: string;
  updatedAt: string;
};

type TransactionAccount = {
  _id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  type: "Savings" | "Current" | "Business";
};

export type TransactionType = "debit" | "credit";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  day: string;
  type: TransactionType;
}

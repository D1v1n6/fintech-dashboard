// src/types/account.ts

export type AccountData = {
  _id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  type: "Savings" | "Current" | "Business";
  balance: number;
  status: "Active" | "Frozen" | "Closed";
  user: {
    name: string;
    email: string;
  };
};

export const account = {
  balance: 12580000,
  income: 2300000,
  expenses: 740000,
  savingsRate: 82,
};


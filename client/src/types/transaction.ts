export type TransactionType = "debit" | "credit";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  day: string;
  type: TransactionType;
}

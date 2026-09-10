// src/types/account.ts

export const account = {
  balance: 12580000,
  income: 2300000,
  expenses: 740000,
  savingsRate: 82,
};

export const destinationAccounts = [
  {
    id: 1,
    name: "John Doe",
    accountNumber: "1234567890",
    bank: "GTBank",
  },
  {
    id: 2,
    name: "Jane Smith",
    accountNumber: "0987654321",
    bank: "Access Bank",
  },
  {
    id: 3,
    name: "Michael Brown",
    accountNumber: "1122334455",
    bank: "Zenith Bank",
  },
];

export const billCategories = ["Electricity", "Internet", "TV", "Water"];

export const billProviders: Record<string, string[]> = {
  Electricity: ["PHED", "EEDC", "IKEDC"],
  Internet: ["MTN Fibre", "Spectranet", "Smile"],
  TV: ["DSTV", "GOtv", "Startimes"],
  Water: ["PH Water Corporation"],
};

export const airtimeNetworks = ["MTN", "Airtel", "Glo", "9mobile"];

export const depositMethods = [
  {
    id: 1,
    name: "Bank Transfer",
    description: "Transfer money from another bank",
  },
  {
    id: 2,
    name: "Debit Card",
    description: "Add money using your debit card",
  },
];

export const depositBankAccount = {
  bank: "GTBank",
  accountName: "Vault X",
  accountNumber: "0123456789",
};

export interface Card {
  id: number;
  cardName: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  balance: number;
  type: "Physical" | "Virtual";
  network: "VISA" | "Mastercard";
  status: "Active" | "Frozen";
  color: string;
}

export const cards: Card[] = [
  {
    id: 1,
    cardName: "Vault X",
    cardHolder: "Divine Chukwudire",
    cardNumber: "2882 9382 7365 3456",
    expiryDate: "12/29",
    balance: 12450000,
    type: "Physical",
    network: "VISA",
    status: "Active",
    color: "blue",
  },
  {
    id: 2,
    cardName: "Vault Virtual",
    cardHolder: "Divine Chukwudire",
    cardNumber: "4521 8765 4321 1234",
    expiryDate: "08/28",
    balance: 250000,
    type: "Virtual",
    network: "VISA",
    status: "Active",
    color: "purple",
  },
  {
    id: 3,
    cardName: "Travel Card",
    cardHolder: "Divine Chukwudire",
    cardNumber: "9876 3456 1234 5678",
    expiryDate: "03/27",
    balance: 500000,
    type: "Physical",
    network: "Mastercard",
    status: "Frozen",
    color: "slate",
  },
];
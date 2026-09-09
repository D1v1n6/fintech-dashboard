import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import CardDisplay from "../components/cards/CreditCardDisplay";
import { cards, type Card } from "../types/creditcards";

const Cards = () => {
  const [cardList, setCardList] = useState<Card[]>(cards);
  const [selectedCard, setSelectedCard] = useState<Card>(cards[0]);

  const toggleCardStatus = () => {
    const updatedCards: Card[] = cardList.map((card) =>
      card.id === selectedCard.id
        ? {
            ...card,
            status: card.status === "Active" ? "Frozen" : "Active",
          }
        : card,
    );

    setCardList(updatedCards);

    const updatedSelectedCard = updatedCards.find(
      (card) => card.id === selectedCard.id,
    );

    if (updatedSelectedCard) {
      setSelectedCard(updatedSelectedCard);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            My Cards
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your physical and virtual cards
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
          <LuPlus className="text-lg" />
          Add Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {cardList.map((card) => (
          <CardDisplay
            key={card.id}
            card={card}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>

      {/* Selected Card Info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Card Overview
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {selectedCard.cardName}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm ${
              selectedCard.status === "Active"
                ? "bg-green-500/20 text-green-500"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            {selectedCard.status}
          </span>

          <button
            onClick={toggleCardStatus}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              selectedCard.status === "Active"
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
            }`}
          >
            {selectedCard.status === "Active" ? "Freeze Card" : "Unfreeze Card"}
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardStat
            label="Available Balance"
            value={`₦${selectedCard.balance.toLocaleString()}`}
          />

          <CardStat label="Card Type" value={selectedCard.type} />

          <CardStat label="Network" value={selectedCard.network} />

          <CardStat label="Expiry Date" value={selectedCard.expiryDate} />
        </div>
      </div>
    </div>
  );
};

interface CardStatProps {
  label: string;
  value: string;
}

const CardStat = ({ label, value }: CardStatProps) => (
  <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>

    <p className="mt-2 font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);

export default Cards;

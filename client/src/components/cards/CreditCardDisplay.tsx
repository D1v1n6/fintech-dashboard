import { BsWifi } from "react-icons/bs";
import type { Card } from "../../types/creditcards";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface CardDisplayProps {
  card: Card;
  onClick?: () => void;
}

const CardDisplay = ({ card, onClick }: CardDisplayProps) => {
  const cardColors = {
    blue: "from-[#1E3A8A] via-[#1E40AF] to-[#1E293B]",
    purple: "from-purple-800 via-purple-600 to-slate-900",
    slate: "from-slate-700 via-slate-800 to-slate-950",
  };

  const [showCardNumber, setShowCardNumber] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
        cardColors[card.color as keyof typeof cardColors]
      } p-6 shadow-2xl border border-white/10 cursor-pointer transition hover:-translate-y-1`}
    >
      {/* Decorative background */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

      {/* Card Header */}
      <div className="relative mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{card.cardName}</h2>

        <h2 className="text-2xl italic font-black tracking-widest text-white">
          {card.network}
        </h2>
      </div>

      {/* Chip */}
      <div className="relative mb-5 flex items-center justify-between">
        <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700" />

        <BsWifi className="rotate-90 text-2xl text-white/80" />
      </div>

      {/* Balance */}
      <div className="relative mb-5">
        <p className="text-sm font-semibold uppercase text-white/70">Balance</p>

        <h2 className="text-2xl font-semibold text-white">
          ₦{card.balance.toLocaleString()}
        </h2>
      </div>

      {/* Card Number */}
      <div className="flex justify-between items-start">
        <h2 className="relative mb-6 text-xl font-semibold tracking-[0.18em] text-slate-200">
          {showCardNumber
            ? card.cardNumber
            : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
        </h2>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCardNumber((prev) => !prev);
          }}
          className="text-white/70 transition hover:text-white"
        >
          {showCardNumber ? <LuEyeOff /> : <LuEye />}
        </button>
      </div>

      {/* Footer */}
      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-white/70">
            Card Holder
          </p>

          <p className="text-lg font-semibold text-white">{card.cardHolder}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-white/70">
            Expires
          </p>

          <p className="text-lg font-semibold text-white">{card.expiryDate}</p>
        </div>
      </div>

      {/* Frozen Overlay */}
      {card.status === "Frozen" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
            Card Frozen
          </span>
        </div>
      )}
    </div>
  );
};

export default CardDisplay;

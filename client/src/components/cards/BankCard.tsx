import React from "react";
import { BsWifi } from "react-icons/bs";

const cardInfo = {
  balance: 12450000,
  name: "Divine Chukwudire",
  number: "2882 9382 7365 3456",
  expire: "12 / 29",
};

const BankCard = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-700 bg-slate-800 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Bank Cards</h2>

          <p className="text-sm text-slate-400">Manage your cards</p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#1E293B] p-6 shadow-2xl border border-white/10 cursor-pointer">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Vault X</h2>
          <h2 className="text-2xl italic font-black tracking-widest text-white">
            VISA
          </h2>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700" />
          <BsWifi className="rotate-90 text-2xl text-white/80" />
        </div>
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white uppercase">
            Balance
          </h2>
          <h2 className="text-2xl font-semibold text-white">
            {cardInfo.balance.toLocaleString()}
          </h2>
        </div>
        <h2 className="text-3xl font-semibold text-slate-300 mb-6 tracking-[0.18em]">
          {cardInfo.number}
        </h2>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-white uppercase">
              Card Holder
            </h2>
            <h2 className="text-2xl font-semibold text-white">
              {cardInfo.name}
            </h2>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white uppercase">
              Expires
            </h2>
            <h2 className="text-xl font-semibold text-white">
              {cardInfo.expire}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankCard;

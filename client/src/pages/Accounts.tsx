import { LuChevronDown, LuEye, LuEyeOff, LuWallet } from "react-icons/lu";
import { useState } from "react";
import { account, accounts } from "../types/account";

const Accounts = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const selectedAccount =
    accounts.find((item) => item.id === selectedAccountId) ?? accounts[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Accounts
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage and view your accounts
        </p>
      </div>

      {/* Total Balance */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-lg dark:from-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Total Balance</p>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">
                {showBalance
                  ? `₦${account.balance.toLocaleString()}`
                  : "₦ ••••••••"}
              </h2>

              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="text-slate-400 transition hover:text-white"
              >
                {showBalance ? <LuEye /> : <LuEyeOff />}
              </button>
            </div>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl text-white">
            <LuWallet />
          </div>
        </div>

        {/* Income / Expenses */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
          <div>
            <p className="text-xs text-slate-400">Total Income</p>

            <p className="mt-1 font-semibold text-green-400">
              ₦{account.income.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Total Expenses</p>

            <p className="mt-1 font-semibold text-red-400">
              ₦{account.expenses.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Your Accounts
        </h2>

        {/* Account Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-lg transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-500">
                <LuWallet />
              </div>

              <div className="min-w-0 text-left">
                <p className="truncate font-semibold text-slate-900 dark:text-white">
                  {selectedAccount.name}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedAccount.type} • ****
                  {selectedAccount.accountNumber.slice(-4)}
                </p>
              </div>
            </div>

            <LuChevronDown
              className={`shrink-0 text-slate-500 transition-transform duration-200 dark:text-slate-400 ${
                isAccountMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Account Options */}
          {isAccountMenuOpen && (
            <div className="absolute left-0 right-0 z-10 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              {accounts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedAccountId(item.id);
                    setIsAccountMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    item.id === selectedAccountId
                      ? "bg-slate-50 dark:bg-slate-700/50"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg text-blue-500">
                    <LuWallet />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.type} • ****{item.accountNumber.slice(-4)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Account Details */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Available Balance
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {showBalance
                  ? `₦${selectedAccount.balance.toLocaleString()}`
                  : "₦ ••••••••"}
              </p>
            </div>

            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              {selectedAccount.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 dark:border-slate-700">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bank</p>

              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                {selectedAccount.bank}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Account Number
              </p>

              <p className="mt-1 text-sm font-medium tracking-wide text-slate-900 dark:text-white">
                {selectedAccount.accountNumber}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Account Type
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                {selectedAccount.type}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Status
              </p>

              <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                {selectedAccount.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;

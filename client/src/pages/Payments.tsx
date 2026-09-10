import {
  LuArrowUpRight,
  LuReceipt,
  LuSmartphone,
  LuArrowDownLeft,
} from "react-icons/lu";
import {
  account,
  airtimeNetworks,
  billCategories,
  billProviders,
  depositBankAccount,
  depositMethods,
  destinationAccounts,
} from "../types/account";
import { useState } from "react";

const paymentActions = [
  {
    id: 1,
    title: "Transfer Money",
    description: "Send money to another account",
    icon: <LuArrowUpRight />,
  },
  {
    id: 2,
    title: "Pay Bills",
    description: "Electricity, internet and more",
    icon: <LuReceipt />,
  },
  {
    id: 3,
    title: "Buy Airtime",
    description: "Top up your mobile line",
    icon: <LuSmartphone />,
  },
  {
    id: 4,
    title: "Deposit Money",
    description: "Add money to your account",
    icon: <LuArrowDownLeft />,
  },
];

const Payments = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [transferStep, setTransferStep] = useState<
    "form" | "confirm" | "success"
  >("form");
  const [transferError, setTransferError] = useState("");

  const [billCategory, setBillCategory] = useState("");
  const [billProvider, setBillProvider] = useState("");
  const [billCustomerNumber, setBillCustomerNumber] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billError, setBillError] = useState("");
  const [billStep, setBillStep] = useState<"form" | "confirm" | "success">(
    "form",
  );

  const [airtimeNetwork, setAirtimeNetwork] = useState("");
  const [airtimePhoneNumber, setAirtimePhoneNumber] = useState("");
  const [airtimeAmount, setAirtimeAmount] = useState("");
  const [airtimeError, setAirtimeError] = useState("");
  const [airtimeStep, setAirtimeStep] = useState<
    "form" | "confirm" | "success"
  >("form");

  const [depositMethod, setDepositMethod] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositError, setDepositError] = useState("");
  const [depositStep, setDepositStep] = useState<
    "form" | "confirm" | "success"
  >("form");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Payments
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Send money, pay bills and manage your payments
        </p>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-white p-8 text-center shadow-lg dark:border-green-500/20 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Available Balance
        </h2>

        <p className="mt-3 text-3xl md:text-4xl font-bold text-green-600">
          ₦{account.balance.toLocaleString()}
        </p>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Available for payments
        </p>
      </div>

      {/* Payment Actions */}
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paymentActions.map((action) => {
          const isSelected = selectedAction === action.title;

          return (
            <div
              key={action.id}
              className={`rounded-2xl border bg-white shadow-lg transition dark:bg-slate-800 ${
                isSelected
                  ? "border-blue-500 dark:border-blue-500"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {/* Action Header */}
              <button
                onClick={() =>
                  setSelectedAction(isSelected ? null : action.title)
                }
                className="group w-full cursor-pointer p-5 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                    {action.icon}
                  </div>

                  <span className="text-slate-400">
                    {isSelected ? "▲" : "▼"}
                  </span>
                </div>

                <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">
                  {action.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {action.description}
                </p>
              </button>

              {/* Expanded Content */}
              {isSelected && (
                <div className="border-t border-slate-200 p-5 dark:border-slate-700">
                  {action.title === "Transfer Money" && (
                    <div className="space-y-4">
                      {transferStep === "form" && (
                        <>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Destination Account
                            </label>

                            <select
                              value={selectedAccount}
                              onChange={(e) => {
                                setSelectedAccount(e.target.value);
                                setTransferError("");
                              }}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            >
                              <option value="">Select an account</option>

                              {destinationAccounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                  {account.name} - {account.bank} (
                                  {account.accountNumber})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Amount
                            </label>

                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                ₦
                              </span>

                              <input
                                type="number"
                                min="100"
                                value={amount}
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                  setTransferError("");
                                }}
                                placeholder="0.00"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          {/* Error Message */}
                          {transferError && (
                            <p className="text-sm text-red-500">
                              {transferError}
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const transferAmount = Number(amount);

                              if (!selectedAccount) {
                                setTransferError(
                                  "Please select a destination account.",
                                );
                                return;
                              }

                              if (!amount || transferAmount < 100) {
                                setTransferError(
                                  "Please enter a valid amount.",
                                );
                                return;
                              }

                              if (transferAmount > account.balance) {
                                setTransferError("Insufficient balance.");
                                return;
                              }

                              setTransferError("");
                              setTransferStep("confirm");
                            }}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Continue
                          </button>
                        </>
                      )}

                      {transferStep === "confirm" && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              Confirm Transfer
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Review the transfer details before continuing.
                            </p>
                          </div>

                          <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Recipient</span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {
                                  destinationAccounts.find(
                                    (item) =>
                                      String(item.id) === selectedAccount,
                                  )?.name
                                }
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Bank</span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {
                                  destinationAccounts.find(
                                    (item) =>
                                      String(item.id) === selectedAccount,
                                  )?.bank
                                }
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Amount</span>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                ₦{Number(amount).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setTransferStep("form")}
                              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                              Back
                            </button>

                            <button
                              type="button"
                              onClick={() => setTransferStep("success")}
                              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Transfer Success */}
                      {transferStep === "success" && (
                        <div className="py-4 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-500">
                            ✓
                          </div>

                          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Transfer Successful
                          </h3>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            ₦{Number(amount).toLocaleString()} has been sent
                            successfully.
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAccount("");
                              setAmount("");
                              setTransferError("");
                              setTransferStep("form");
                            }}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Make Another Transfer
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {action.title === "Pay Bills" && (
                    <div className="space-y-4">
                      {billStep === "form" && (
                        <>
                          {/* Bill Category */}
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Bill Category
                            </label>

                            <select
                              value={billCategory}
                              onChange={(e) => {
                                setBillCategory(e.target.value);
                                setBillProvider("");
                                setBillError("");
                              }}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            >
                              <option value="">Select a category</option>

                              {billCategories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Provider
                            </label>

                            <select
                              value={billProvider}
                              onChange={(e) => {
                                setBillProvider(e.target.value);
                                setBillError("");
                              }}
                              disabled={!billCategory}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            >
                              <option value="">
                                {billCategory
                                  ? "Select a provider"
                                  : "Select a category first"}
                              </option>

                              {billCategory &&
                                billProviders[billCategory].map((provider) => (
                                  <option key={provider} value={provider}>
                                    {provider}
                                  </option>
                                ))}
                            </select>
                          </div>

                          {/* Customer / Meter Number */}
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              {billCategory === "Electricity"
                                ? "Meter Number"
                                : "Customer Number"}
                            </label>

                            <input
                              type="text"
                              inputMode="numeric"
                              value={billCustomerNumber}
                              onChange={(e) => {
                                setBillCustomerNumber(e.target.value);
                                setBillError("");
                              }}
                              placeholder="Enter number"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Amount
                            </label>

                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                ₦
                              </span>

                              <input
                                type="number"
                                min="100"
                                value={billAmount}
                                onChange={(e) => {
                                  setBillAmount(e.target.value);
                                  setBillError("");
                                }}
                                placeholder="0.00"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          {/* Error Message*/}
                          {billError && (
                            <p className="text-sm text-red-500">{billError}</p>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const amount = Number(billAmount);

                              if (!billCategory) {
                                setBillError("Please select a bill category.");
                                return;
                              }

                              if (!billProvider) {
                                setBillError("Please select a provider.");
                                return;
                              }

                              if (!billCustomerNumber.trim()) {
                                setBillError(
                                  "Please enter your customer number.",
                                );
                                return;
                              }

                              if (!billAmount || amount < 100) {
                                setBillError("Minimum payment amount is ₦100.");
                                return;
                              }

                              if (amount > account.balance) {
                                setBillError("Insufficient balance.");
                                return;
                              }

                              setBillError("");
                              setBillStep("confirm");
                            }}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Continue
                          </button>
                        </>
                      )}

                      {billStep === "confirm" && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              Confirm Payment
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Review your bill payment before continuing.
                            </p>
                          </div>

                          <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Category</span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {billCategory}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Provider</span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {billProvider}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">
                                Customer Number
                              </span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {billCustomerNumber}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Amount</span>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                ₦{Number(billAmount).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setBillStep("form")}
                              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                              Back
                            </button>

                            <button
                              type="button"
                              onClick={() => setBillStep("success")}
                              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}

                      {billStep === "success" && (
                        <div className="py-4 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-500">
                            ✓
                          </div>

                          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Payment Successful
                          </h3>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            ₦{Number(billAmount).toLocaleString()}{" "}
                            {billCategory.toLowerCase()} payment completed
                            successfully.
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setBillCategory("");
                              setBillProvider("");
                              setBillCustomerNumber("");
                              setBillAmount("");
                              setBillError("");
                              setBillStep("form");
                            }}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Make Another Payment
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {action.title === "Buy Airtime" && (
                    <div className="space-y-4">
                      {airtimeStep === "form" && (
                        <>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Network
                            </label>

                            <select
                              value={airtimeNetwork}
                              onChange={(e) => {
                                setAirtimeNetwork(e.target.value);
                                setAirtimeError("");
                              }}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            >
                              <option value="">Select a network</option>

                              {airtimeNetworks.map((network) => (
                                <option key={network} value={network}>
                                  {network}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Phone Number
                            </label>

                            <input
                              type="tel"
                              value={airtimePhoneNumber}
                              onChange={(e) => {
                                setAirtimePhoneNumber(e.target.value);
                                setAirtimeError("");
                              }}
                              placeholder="08012345678"
                              maxLength={11}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Amount
                            </label>

                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                ₦
                              </span>

                              <input
                                type="number"
                                min="100"
                                value={airtimeAmount}
                                onChange={(e) => {
                                  setAirtimeAmount(e.target.value);
                                  setAirtimeError("");
                                }}
                                placeholder="0.00"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          {/* Error Message*/}
                          {airtimeError && (
                            <p className="text-sm text-red-500">
                              {airtimeError}
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const amount = Number(airtimeAmount);

                              if (!airtimeNetwork) {
                                setAirtimeError("Please select a network.");
                                return;
                              }

                              if (!/^0\d{10}$/.test(airtimePhoneNumber)) {
                                setAirtimeError(
                                  "Please enter a valid 11-digit phone number.",
                                );
                                return;
                              }

                              if (!airtimeAmount || amount < 100) {
                                setAirtimeError(
                                  "Minimum airtime amount is ₦100.",
                                );
                                return;
                              }

                              if (amount > account.balance) {
                                setAirtimeError("Insufficient balance.");
                                return;
                              }

                              setAirtimeError("");
                              setAirtimeStep("confirm");
                            }}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Continue
                          </button>
                        </>
                      )}

                      {airtimeStep === "confirm" && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              Confirm Airtime Purchase
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Review your airtime purchase before continuing.
                            </p>
                          </div>

                          <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Network</span>

                              <span className="font-medium text-slate-900 dark:text-white">
                                {airtimeNetwork}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">
                                Phone Number
                              </span>

                              <span className="font-medium text-slate-900 dark:text-white">
                                {airtimePhoneNumber}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Amount</span>

                              <span className="font-semibold text-slate-900 dark:text-white">
                                ₦{Number(airtimeAmount).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setAirtimeStep("form")}
                              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                              Back
                            </button>

                            <button
                              type="button"
                              onClick={() => setAirtimeStep("success")}
                              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}

                      {airtimeStep === "success" && (
                        <div className="py-4 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-500">
                            ✓
                          </div>

                          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Airtime Purchase Successful
                          </h3>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            ₦{Number(airtimeAmount).toLocaleString()} airtime
                            has been successfully purchased for{" "}
                            {airtimePhoneNumber}.
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setAirtimeNetwork("");
                              setAirtimePhoneNumber("");
                              setAirtimeAmount("");
                              setAirtimeError("");
                              setAirtimeStep("form");
                            }}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Buy Airtime Again
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {action.title === "Deposit Money" && (
                    <div className="space-y-4">
                      {depositStep === "form" && (
                        <>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Deposit Method
                            </label>

                            <select
                              value={depositMethod}
                              onChange={(e) => {
                                setDepositMethod(e.target.value);
                                setDepositError("");
                              }}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                            >
                              <option value="">Select a deposit method</option>

                              {depositMethods.map((method) => (
                                <option key={method.id} value={method.name}>
                                  {method.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Bank Transfer Details */}
                          {depositMethod === "Bank Transfer" && (
                            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Transfer money to this account
                              </p>

                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between gap-4 text-sm">
                                  <span className="text-slate-500">Bank</span>

                                  <span className="font-medium text-slate-900 dark:text-white">
                                    {depositBankAccount.bank}
                                  </span>
                                </div>

                                <div className="flex justify-between gap-4 text-sm">
                                  <span className="text-slate-500">
                                    Account Name
                                  </span>

                                  <span className="font-medium text-slate-900 dark:text-white">
                                    {depositBankAccount.accountName}
                                  </span>
                                </div>

                                <div className="flex justify-between gap-4 text-sm">
                                  <span className="text-slate-500">
                                    Account Number
                                  </span>

                                  <span className="font-semibold tracking-wide text-slate-900 dark:text-white">
                                    {depositBankAccount.accountNumber}
                                  </span>
                                </div>
                              </div>

                              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                Transfer your desired amount to this account.
                                Your balance will be updated after the transfer
                                is confirmed.
                              </p>
                            </div>
                          )}

                          {/* Debit Card Info */}
                          {depositMethod === "Debit Card" && (
                            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Pay securely with your debit card
                              </p>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                You will be redirected to a secure payment page
                                to complete your deposit.
                              </p>
                            </div>
                          )}

                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Amount
                            </label>

                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                ₦
                              </span>

                              <input
                                type="number"
                                min="100"
                                value={depositAmount}
                                onChange={(e) => {
                                  setDepositAmount(e.target.value);
                                  setDepositError("");
                                }}
                                placeholder="0.00"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          {depositError && (
                            <p className="text-sm text-red-500">
                              {depositError}
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const amount = Number(depositAmount);

                              if (!depositMethod) {
                                setDepositError(
                                  "Please select a deposit method.",
                                );
                                return;
                              }

                              if (!depositAmount || amount < 100) {
                                setDepositError(
                                  "Minimum deposit amount is ₦100.",
                                );
                                return;
                              }

                              setDepositError("");
                              setDepositStep("confirm");
                            }}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Continue
                          </button>
                        </>
                      )}

                      {depositStep === "confirm" && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              Confirm Deposit
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Review your deposit before continuing.
                            </p>
                          </div>

                          <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Method</span>

                              <span className="font-medium text-slate-900 dark:text-white">
                                {depositMethod}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 text-sm">
                              <span className="text-slate-500">Amount</span>

                              <span className="font-semibold text-slate-900 dark:text-white">
                                ₦{Number(depositAmount).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setDepositStep("form")}
                              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                              Back
                            </button>

                            <button
                              type="button"
                              onClick={() => setDepositStep("success")}
                              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}

                      {depositStep === "success" && (
                        <div className="py-4 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-500">
                            ✓
                          </div>

                          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Deposit Successful
                          </h3>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            ₦{Number(depositAmount).toLocaleString()} has been
                            successfully added to your account.
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setDepositMethod("");
                              setDepositAmount("");
                              setDepositError("");
                              setDepositStep("form");
                            }}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Make Another Deposit
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Payments;

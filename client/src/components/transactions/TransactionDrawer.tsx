import { IoClose } from "react-icons/io5";
import type { Transaction } from "./transactions";

interface TransactionDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionDrawer = ({
  transaction,
  onClose,
}: TransactionDrawerProps) => {
  if (!transaction) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#0F172A]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Transaction Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Amount */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
            Transaction Amount
          </p>

          <h3
            className={`text-right text-lg font-semibold ${
              transaction.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {transaction.type === "income"
              ? `+₦${Math.abs(transaction.amount).toLocaleString()}`
              : `-₦${Math.abs(transaction.amount).toLocaleString()}`}
          </h3>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <DetailItem label="Recipient" value={transaction.recipient} />

          <DetailItem label="Bank" value={transaction.bank} />

          <DetailItem label="Category" value={transaction.category} />

          <DetailItem
            label="Date"
            value={`${transaction.date}, ${transaction.time}`}
          />

          <DetailItem label="Reference" value={transaction.reference} />

          <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
              Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm ${
                transaction.status === "Completed"
                  ? "bg-green-500/20 text-green-400"
                  : transaction.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>

        {/* Receipt Button */}
        <button className="mt-10 w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
          Download Receipt
        </button>
      </div>
    </>
  );
};

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
    <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>

    <p className="font-medium text-slate-900 dark:text-white">{value}</p>
  </div>
);

export default TransactionDrawer;

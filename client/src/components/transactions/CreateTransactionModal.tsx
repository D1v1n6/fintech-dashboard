import { useState, useEffect } from "react";
import type { AccountData } from "../../types/account";

interface CreateTransactionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTransactionModal = ({
  onClose,
  onSuccess,
}: CreateTransactionModalProps) => {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState<"Income" | "Expense">(
    "Expense",
  );
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User might not be authenticated.");
          return;
        }
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accounts/list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          console.error("Failed to fetch accounts:", response.status);
          return;
        }

        const data = await response.json();
        if (!Array.isArray(data.accounts)) {
          console.error("Invalid accounts response");
          return;
        }
        setAccounts(data.accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User might not be authenticated.");
        setIsSubmitting(false);
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            account,
            type: transactionType,
            category,
            amount,
            description,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();

        setError(errorData.message || "Failed to create transaction.");
        return;
      }

      const result = await response.json();

      console.log("Transaction created successfully:", result);

      onSuccess();
    } catch (error) {
      console.error("Error creating transaction:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account</label>

          <select value={account} onChange={(e) => setAccount(e.target.value)}>
            <option value="">Select an account</option>

            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name} — {account.bankName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Transaction Type</label>

          <select
            value={transactionType}
            onChange={(e) =>
              setTransactionType(e.target.value as "Income" | "Expense")
            }
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div>
          <label>Category</label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Add a category"
          />
        </div>

        <div>
          <label>Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            placeholder="Enter an amount"
          />
        </div>
        <div>
          <label>Description</label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
          />
        </div>
        {error && <div>{error}</div>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTransactionModal
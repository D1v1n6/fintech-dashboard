import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  account: mongoose.Types.ObjectId;
  type: "Income" | "Expense";
  category?: string;
  amount: number;
  description?: string;
  date: Date;
  status: "Pending" | "Completed" | "Failed";
}

const transactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    category: { type: String },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      required: true,
      default: "Completed"
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction; 
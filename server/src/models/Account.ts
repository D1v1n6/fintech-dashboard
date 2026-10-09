import mongoose, { Document, Schema } from "mongoose";


export interface IAccount extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    accountNumber: string;
    bankName: string;
    type: "Savings" | "Current" | "Business";
    balance: number;
    status: "Active" | "Frozen" | "Closed";
}

const accountSchema = new Schema<IAccount>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        accountNumber: { type: String, required: true, unique: true },
        bankName: { type: String, required: true },
        type: { type: String, enum: ["Savings", "Current", "Business"], required: true },
        balance: { type: Number, default: 0 },
        status: { type: String, enum: ["Active", "Frozen", "Closed"], default: "Active" }
    },
    { timestamps: true }
);

const Account = mongoose.model<IAccount>("Account", accountSchema);

export default Account;
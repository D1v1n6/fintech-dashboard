import { Request, Response } from "express";
import Transaction from "../models/Transactions.js";
import Account from "../models/Account.js";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { account, type, category, amount, description } = req.body;
    if (
      !account ||
      !type ||
      typeof amount !== "number" ||
      !amount ||
      amount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    if (!["Income", "Expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type. Must be 'Income' or 'Expense'.",
      });
    }

    const accountExists = await Account.findOne({
      _id: account,
      user: req.userId,
    });
    if (!accountExists) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    if (type === "Expense" && accountExists.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance.",
      });
    }

    if (type === "Income") {
      accountExists.balance += amount;
    } else {
      accountExists.balance -= amount;
    }

    await accountExists.save();

    const transaction = await Transaction.create({
      user: req.userId,
      account,
      type,
      category,
      amount,
      description,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully.",
      data: transaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      success: false,
      message: "Error creating transaction.",
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).populate(
      "account",
      "name accountNumber bankName type",
    );
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully.",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching transactions.",
    });
  }
};

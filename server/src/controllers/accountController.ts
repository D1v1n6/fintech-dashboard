import { Request, Response } from "express";
import Account from "../models/Account.js";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, accountNumber, bankName, type } = req.body;

    if (!name || !accountNumber || !bankName || !type) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    if (!["Savings", "Current", "Business"].includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid account type. Must be 'Savings', 'Current', or 'Business'.",
      });
    }

    const existingAccount = await Account.findOne({ accountNumber });

    if (existingAccount) {
      return res.status(409).json({
        success: false,
        message: "Account with this number already exists.",
      });
    }

    const account = await Account.create({
      user: req.userId,
      name,
      accountNumber,
      bankName,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      account,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({
      success: false,
      message: "Error creating account.",
    });
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find({ user: req.userId }).populate(
      "user",
      "name email",
    );

    return res.status(200).json({
      success: true,
      message: "Accounts retrieved successfully",
      accounts,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching accounts.",
    });
  }
};

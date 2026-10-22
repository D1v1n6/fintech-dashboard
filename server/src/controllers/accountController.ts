import { Request, Response } from "express";
import Account from "../models/Account.js";

const generateAccountNumber = async (): Promise<string> => {
  while (true) {
    const accountNumber = Math.floor(
      1000000000 + Math.random() * 9000000000,
    ).toString();

    const existingAccount = await Account.findOne({ accountNumber });

    if (!existingAccount) {
      return accountNumber;
    }
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, bankName, type } = req.body;

    if (!name || !bankName || !type) {
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

    const accountNumber = await generateAccountNumber();

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

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: "Account number already exists. Please try again.",
      });
    }

    return res.status(500).json({
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

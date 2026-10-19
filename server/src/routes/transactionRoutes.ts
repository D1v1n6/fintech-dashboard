import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", auth, createTransaction);
router.get("/", auth, getTransactions);

export default router;

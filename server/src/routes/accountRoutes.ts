import { Router } from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createAccount,
  getAccounts,
} from "../controllers/accountController.js";

const router = Router();

router.post("/create", auth, createAccount);
router.get("/list", auth, getAccounts);

export default router;

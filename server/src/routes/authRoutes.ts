import { Router } from "express";

import { getCurrentUser, login, register } from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", auth, (_req, res) => {
  res.json({
    success: true,
    message: "You have accessed a protected route",
  });
});
router.get("/me", auth, getCurrentUser);

export default router;
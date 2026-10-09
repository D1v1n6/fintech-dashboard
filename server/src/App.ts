import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/accounts", accountRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Vault X API is running",
  });
});

export default app;

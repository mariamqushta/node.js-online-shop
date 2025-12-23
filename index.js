// index.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import serverless from "serverless-http";

import { ConnectToDB } from "./DB/mongoose.js";
import authRouter from "./routes/auth-routes.js";
import productRouter from "./routes/product-routes.js";

dotenv.config();

const app = express();

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://react-online-shop-xzgh.vercel.app", // your deployed frontend
    ],
    credentials: true,
  })
);

// JSON parsing and logging
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/products", productRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    database: isConnected ? "Connected" : "Disconnected",
  });
});

/* Database connection */
let isConnected = false;
let dbConnectionPromise = null;

async function connectDB() {
  if (isConnected) return;

  try {
    console.log("Connecting to MongoDB...");
    await ConnectToDB();
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

// Connect on cold start
connectDB().catch(console.error);

// Export handler for Vercel
export const handler = serverless(app);

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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://react-online-shop-xzgh.vercel.app",
      "https://your-frontend-domain.vercel.app" // Add your actual frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/.netlify/functions/api/auth", authRouter);
app.use("/.netlify/functions/api/products", productRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "API is running 🚀",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    database: isConnected ? "Connected" : "Disconnected" 
  });
});

/* DB connection with better error handling */
let isConnected = false;
let dbConnectionPromise = null;

async function connectDB() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    console.log("Creating new database connection");
    await ConnectToDB();
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

// Connect on cold start
connectDB().catch(console.error);

// Export for Vercel
const handler = serverless(app);

export { handler };
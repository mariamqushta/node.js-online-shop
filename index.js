import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ConnectToDB } from "./DB/mongoose.js";
import authRouter from "./routes/auth-routes.js";
import productRouter from "./routes/product-routes.js";

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: ["http://localhost:3000", "https://react-online-shop-xzgh.vercel.app"],
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀", timestamp: new Date().toISOString() });
});

// Connect DB
ConnectToDB().then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});

// For Vercel
export default app;
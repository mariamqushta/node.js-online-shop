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

app.use(cors({
  origin: ["http://localhost:3000", "https://react-online-shop-xzgh.vercel.app/register"],
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await ConnectToDB();
    isConnected = true;
  }
  return app(req, res);
}


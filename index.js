import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ConnectToDB } from "../DB/mongoose.js";
import authRouter from "../routes/auth-routes.js";
import productRouter from "../routes/product-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default async function handler(req, res) {
  await ConnectToDB();
  return app(req, res);
}

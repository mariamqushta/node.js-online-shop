import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import serverless from "serverless-http";
import { ConnectToDB } from "./DB/mongoose.js";
import authRouter from "./routes/auth-routes.js"
import productRouter from "./routes/product-routes.js";

dotenv.config();

const app = express();

// Allow your frontend origin + localhost for dev
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// Connect once to DB
ConnectToDB();

export default serverless(app);

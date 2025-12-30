import express from "express";
import dotenv from "dotenv";
import { ConnectToDB } from "./DB/mongoose.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes.js"
import productRouter from "./routes/product-routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port=process.env.PORT||3000;
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use("/auth",authRouter)
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("API is running!");
});

// export default function handler(req, res) {
//   res.status(200).json({ message: "Backend is live 🚀" });
// }


ConnectToDB()

app.listen(port,()=>{
    console.log(`app work on port ${port}`)
});
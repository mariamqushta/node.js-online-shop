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
app.use(
  cors({
    origin: [
      "*",
      "http://localhost:3000",
      ""
     
    ], // Allow only your frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials
  })
);
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use("/auth",authRouter)
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("<h1> API is running! </h1> ");
});

// export default function handler(req, res) {
//   res.status(200).json({ message: "Backend is live 🚀" });
// }



ConnectToDB()

app.listen(port,()=>{
    console.log(`app work on port ${port}`)
});

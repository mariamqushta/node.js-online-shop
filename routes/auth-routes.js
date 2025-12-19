import express from "express";
import { register, login } from "../controller/auth-controller.js";
import { validate } from "../middelware/validate.js";
import { userValidation, loginValidation } from "../services/auth-validation.js";

const authRouter = express.Router();

authRouter.post("/register", validate(userValidation), register);
authRouter.post("/login", validate(loginValidation), login);

export default authRouter;

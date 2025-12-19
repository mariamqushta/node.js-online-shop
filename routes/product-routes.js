import express from "express";
import { validate , adminOnly } from "../middelware/validate.js";
import { auth } from "../middelware/auth.js";
import { productValidation } from "../services/auth-validation.js";

import { createProduct, getAllProducts } from "../controller/auth-controller.js";

const productRouter = express.Router();

// Admin add product
productRouter.post(
  "/add",
  auth,          // check token
  adminOnly,     // check role
  validate(productValidation),
  createProduct
);


// Get all products
productRouter.get("/", getAllProducts);

export default productRouter;

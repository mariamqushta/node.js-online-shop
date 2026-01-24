import expressAsyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import Product from "../models/product-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, ProfileImage, role } = req.body;

  // 1. Check if user already exists
  const userExists = await User.findOne({ email : email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    ProfileImage,
    role,
  });

  // 4. Return user info + token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // 3. Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  // 4. Return user info + token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

export const product = expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

export const createProduct = async (req, res) => {
  try {
    const { name, type, img, cost, rate, description } = req.body;

    const product = await Product.create({
      name,
      type,
      img: Array.isArray(img) ? img : [img],   // <– convert string to array
      cost: Number(cost),
      rate: Number(rate),
      description
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  img: [String],
  cost: Number,
  rate: Number,
  description: String,
}, {
  timestamps: true,
  collection: "product",
});

const Product = mongoose.model("Product", productSchema);

export default Product;
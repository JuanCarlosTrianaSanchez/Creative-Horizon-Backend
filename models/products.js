import mongoose from "../config/mongoose.config.js";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  size: String,
  colour: String,
  stock: Number,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;

import mongoose from "../config/mongoose.config.js";

const productSchema = mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  stock: Number,
  imageUrl: String,
  size: String,
  colour: String,
  material: String,
  description: String,
  featured: { type: Boolean, default: false },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

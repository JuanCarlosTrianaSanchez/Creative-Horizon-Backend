import mongoose from "../config/mongoose.config.js";

const categorySchema = mongoose.Schema({
  type: String,
  size: String,
  color: String,
  material: String,
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

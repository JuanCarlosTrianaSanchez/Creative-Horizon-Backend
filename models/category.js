import mongoose from "../config/mongoose.config.js";

const categorySchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Pincel", "Pintura", "Lienzo"],
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

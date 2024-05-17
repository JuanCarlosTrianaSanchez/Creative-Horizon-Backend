import Category from "../models/category.js";

async function list(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

export default {
  list,
};

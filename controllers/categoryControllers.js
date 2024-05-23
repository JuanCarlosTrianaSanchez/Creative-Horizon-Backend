import Category from "../models/category.js";

async function list(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function find(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json("Category not found");
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function create(req, res) {
  try {
    const newCategory = await Category.create({
      type: req.body.type,
      size: req.body.size,
      color: req.body.color,
      material: req.body.material,
    });
    res.json(newCategory);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function update(req, res) {
  try {
    const categoryFound = await Category.findById(req.params.id);
    if (!categoryFound) {
      return res.status(404).json("Category not found");
    }

    categoryFound.type = req.body.type || categoryFound.type;
    categoryFound.size = req.body.size || categoryFound.size;
    categoryFound.color = req.body.color || categoryFound.color;
    categoryFound.material = req.body.material || categoryFound.material;

    await categoryFound.save();
    res.json(categoryFound);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

export default {
  list,
  find,
  create,
  update,
};

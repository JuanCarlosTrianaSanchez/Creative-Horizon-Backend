import Category from "../models/category.js";

async function list(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al listar categorías", error: err.message });
  }
}
async function find(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al buscar categoría", error: err.message });
  }
}

async function create(req, res) {
  try {
    const newCategory = await Category.create({
      type: req.body.type,
    });
    res.json(newCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear categoría", error: err.message });
  }
}

async function update(req, res) {
  try {
    const categoryFound = await Category.findById(req.params.id);
    if (!categoryFound) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    categoryFound.type = req.body.type || categoryFound.type;

    await categoryFound.save();
    res.json(categoryFound);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar categoría", error: err.message });
  }
}

export default {
  list,
  find,
  create,
  update,
};

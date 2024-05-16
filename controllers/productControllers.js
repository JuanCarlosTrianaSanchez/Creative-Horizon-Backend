import Product from "../models/products.js";

async function list(req, res) {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function create(req, res) {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      category: req.body.category,
      brand: req.body.brand,
      size: req.body.size,
      colour: req.body.colour,
      stock: req.body.stock,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    });
    res.json(newProduct);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

export default {
  list,
  create,
};

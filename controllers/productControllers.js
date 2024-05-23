import Product from "../models/product.js";

async function list(req, res) {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function find(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    res.status(200).json(product);
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

async function update(req, res) {
  try {
    const productFound = await Product.findById(req.params.id);
    if (!productFound) {
      return res.status(404).json("Product not found");
    }

    productFound.name = req.body.name || productFound.name;
    productFound.category = req.body.category || productFound.category;
    productFound.brand = req.body.brand || productFound.brand;
    productFound.size = req.body.size || productFound.size;
    productFound.colour = req.body.colour || productFound.colour;
    productFound.stock = req.body.stock || productFound.stock;
    productFound.price = req.body.price || productFound.price;
    productFound.imageUrl = req.body.imageUrl || productFound.imageUrl;

    await productFound.save();
    res.json(productFound);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function destroy(req, res) {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productDeleted) {
      return res.status(404).json("Product not found");
    }
    res.json("Product deleted");
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

export default {
  list,
  find,
  create,
  update,
  destroy,
};

import Product from "../models/product.js";

async function search(req, res) {
  try {
    const { featured } = req.query;
    let filter = {};

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al buscar productos", error: err.message });
  }
}

async function list(req, res) {
  try {
    const productos = await Product.find().populate("category");
    res.json(productos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al listar productos", error: err.message });
  }
}

async function find(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al buscar producto", error: err.message });
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
      material: req.body.material,
      description: req.body.description,
      featured: req.body.featured || false,
    });
    res.json(newProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: err.message });
  }
}

async function update(req, res) {
  try {
    const productFound = await Product.findById(req.params.id);
    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    productFound.name = req.body.name || productFound.name;
    productFound.category = req.body.category || productFound.category;
    productFound.brand = req.body.brand || productFound.brand;
    productFound.size = req.body.size || productFound.size;
    productFound.colour = req.body.colour || productFound.colour;
    productFound.stock = req.body.stock || productFound.stock;
    productFound.price = req.body.price || productFound.price;
    productFound.imageUrl = req.body.imageUrl || productFound.imageUrl;
    productFound.material = req.body.material || productFound.material;
    productFound.description = req.body.description || productFound.description;
    productFound.featured = req.body.featured || productFound.featured;

    await productFound.save();
    res.json(productFound);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar producto", error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json("Product deleted");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: err.message });
  }
}

export default {
  list,
  find,
  create,
  update,
  destroy,
  search,
};

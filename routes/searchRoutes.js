import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar producto", error: error.message });
  }
});

export default router;

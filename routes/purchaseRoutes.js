import express from "express";
import Purchase from "../models/purchase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, products, total, paymentMethod } = req.body;
    const newPurchase = new Purchase({
      userId,
      products,
      total,
      paymentMethod,
    });
    await newPurchase.save();
    res.status(201).json(newPurchase);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la orden de compra", error });
  }
});

export default router;

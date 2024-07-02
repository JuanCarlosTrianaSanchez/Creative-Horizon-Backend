import Purchase from "../models/purchase.js";

const purchaseControllers = {
  create: async (req, res) => {
    try {
      const { userId, products, total, paymentMethod } = req.body;

      console.log("Datos recibidos en el backend:", req.body);

      const newPurchase = new Purchase({
        userId,
        products,
        total,
        paymentMethod,
        createdAt: new Date(),
      });

      const savedPurchase = await newPurchase.save();

      res.status(201).json(savedPurchase);
    } catch (error) {
      console.error("Error al crear la orden de compra:", error);
      res.status(500).json({ error: "Error al crear la orden de compra" });
    }
  },
};

export default purchaseControllers;

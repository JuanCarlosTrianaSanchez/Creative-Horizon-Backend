import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "./config/mongoose.config.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoritesRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://18.116.46.224:4200", "http://localhost:4400"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

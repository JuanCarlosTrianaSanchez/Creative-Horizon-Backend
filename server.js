import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "./config/mongoose.config.js"; // Importa tu configuración de mongoose
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(
  "/assets/images",
  express.static(path.join(__dirname, "assets/images"))
);

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/auth", authRoutes);

// Arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

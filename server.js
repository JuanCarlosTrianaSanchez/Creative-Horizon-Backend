import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/addresses", addressRoutes);

/* app.post("/api/address"); */

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

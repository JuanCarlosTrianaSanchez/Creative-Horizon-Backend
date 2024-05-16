import productControllers from "./controllers/productControllers.js";

import express from "express";

const app = express();

app.use(express.json());
app.get("/api/product", productControllers.list);
app.post("/api/product", productControllers.create);

app.listen(3000, () => {
  console.log("servidor corriendo en el puerto 3000");
});

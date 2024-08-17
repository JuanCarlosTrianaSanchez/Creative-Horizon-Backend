import mongoose from "mongoose";

mongoose
  .connect("mongodb://database:27017")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

export default mongoose;

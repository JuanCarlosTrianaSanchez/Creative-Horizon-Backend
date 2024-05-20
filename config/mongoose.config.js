import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1/creativeHorizon")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

export default mongoose;

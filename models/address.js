import mongoose from "../config/mongoose.config.js";

const addressSchema = mongoose.Schema({
  direccion: String,
  barrio: String,
  ciudad: String,
  pais: String,
});

const Address = mongoose.model("Address", addressSchema);

export default Address;

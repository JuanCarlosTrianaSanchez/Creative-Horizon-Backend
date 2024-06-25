import mongoose from "../config/mongoose.config.js";

const addressSchema = mongoose.Schema(
  {
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
      maxlength: [100, "La dirección no puede exceder los 100 caracteres"],
    },
    barrio: {
      type: String,
      required: [true, "El barrio es obligatorio"],
      trim: true,
      maxlength: [
        50,
        "El nombre del barrio no puede exceder los 50 caracteres",
      ],
    },
    ciudad: {
      type: String,
      required: [true, "La ciudad es obligatoria"],
      trim: true,
      maxlength: [
        50,
        "El nombre de la ciudad no puede exceder los 50 caracteres",
      ],
    },
    pais: {
      type: String,
      required: [true, "El país es obligatorio"],
      trim: true,
      maxlength: [50, "El nombre del país no puede exceder los 50 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);
const Address = mongoose.model("Address", addressSchema);

export default Address;

import bcrypt from "bcryptjs";
import mongoose from "../config/mongoose.config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
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
    methods: {
      async hashCompare(string) {
        return await bcrypt.compare(string, this.password);
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;

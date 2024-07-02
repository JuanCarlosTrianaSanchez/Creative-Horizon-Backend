import mongoose from "../config/mongoose.config.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const insertUser = async () => {
  try {
    // No necesitamos llamar a mongoose.connect aquí
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = new User({
      name: "Test",
      lastname: "User",
      phone: 5555551,
      email: "test@example.com",
      password: hashedPassword,
      direccion: "Calle 123",
      barrio: "Centro",
      ciudad: "Bogotá",
      pais: "Colombia",
    });

    await user.save();
    console.log("User inserted successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error inserting user:", err);
    mongoose.disconnect();
  }
};

insertUser();

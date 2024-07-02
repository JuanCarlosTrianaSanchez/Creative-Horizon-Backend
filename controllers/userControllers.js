import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { login } from "./authController.js";

async function list(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json("Server Error List");
  }
}

async function find(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function update(req, res) {
  try {
    const userFound = await User.findById(req.params.id);
    if (!userFound) {
      return res.status(404).json("User not found");
    }

    userFound.name = req.body.name || userFound.name;
    userFound.lastname = req.body.lastname || userFound.lastname;
    userFound.email = req.body.email || userFound.email;
    userFound.password = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : userFound.password;
    userFound.phone = req.body.phone || userFound.phone;
    userFound.direccion = req.body.direccion || userFound.direccion;
    userFound.barrio = req.body.barrio || userFound.barrio;
    userFound.ciudad = req.body.ciudad || userFound.ciudad;
    userFound.pais = req.body.pais || userFound.pais;

    await userFound.save();

    res.json(userFound);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete) {
      return res.status(404).json("User not found");
    }
    res.json("Usuario eliminado");
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function register(req, res) {
  try {
    const {
      name,
      lastname,
      phone,
      email,
      password,
      direccion,
      barrio,
      ciudad,
      pais,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "El usuario ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      phone,
      email,
      password: hashedPassword,
      direccion,
      barrio,
      ciudad,
      pais,
    });
    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: newUser._id,
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
}

async function profile(req, res) {
  try {
    const { email } = await User.findById(req.auth.sub);
    res.json(`Hola ${email}, Puedes Acceder a tu perfil`);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

export default {
  list,
  find,
  update,
  destroy,
  register,
  login,
  profile,
};

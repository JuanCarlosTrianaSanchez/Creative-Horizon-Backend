import bcrypt from "bcryptjs";
import User from "../models/user.js";

async function list(req, res) {
  try {
    const listadoDeUsusarios = await User.find().populate("addresses");
    res.json(listadoDeUsusarios);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function find(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("addresses");
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function create(req, res) {
  try {
    const contrasenia = req.body.password;
    const hash = await bcrypt.hash(contrasenia, 10);

    const elNuevoUsuario = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      addresses: req.body.addresses,
      city: req.body.city,
    });
    res.json(elNuevoUsuario);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function update(req, res) {
  try {
    const usuarioEncontrado = await User.findById(req.params.id);
    if (!usuarioEncontrado) {
      return res.status(404).json("User not found");
    }

    usuarioEncontrado.name = req.body.name || usuarioEncontrado.name;
    usuarioEncontrado.lastname =
      req.body.lastname || usuarioEncontrado.lastname;
    usuarioEncontrado.email = req.body.email || usuarioEncontrado.email;
    usuarioEncontrado.phone = req.body.phone || usuarioEncontrado.phone;
    usuarioEncontrado.addresses =
      req.body.addresses || usuarioEncontrado.addresses;
    usuarioEncontrado.city = req.body.city || usuarioEncontrado.city;

    await usuarioEncontrado.save();
    res.json(usuarioEncontrado);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function destroy(req, res) {
  try {
    const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json("User not found");
    }
    res.json("Usuario eliminado");
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function login(req, res) {}

export default {
  list,
  find,
  create,
  update,
  destroy,
};

import User from "../models/products.js";

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
    const elNuevoUsuario = await User.create({
      email: req.body.email,
      age: req.body.age,
      active: req.body.active,
      hobbies: req.body.hobbies,
      addresses: req.body.addresses,
      birthdate: req.body.birthdate,
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

export default {
  list,
  find,
  create,
  update,
  destroy,
};

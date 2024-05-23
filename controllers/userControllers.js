import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

async function list(req, res) {
  try {
    const users = await User.find().populate("addresses");
    res.json(users);
  } catch (err) {
    res.status(500).json("Server Error List");
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
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      addresses: req.body.addresses,
      city: req.body.city,
    });
    res.json(newUser);
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
    userFound.addresses = req.body.addresses || userFound.addresses;
    userFound.city = req.body.city || userFound.city;

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

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user !== null) {
      const hashValido = await bcrypt.compare(req.body.password, user.password);
      if (hashValido) {
        const tokenPayload = {
          sub: user.id,
          iat: Date.now(),
        };
        const token = jwt.sign(tokenPayload, "secretPassword");
        res.json({ token: token });
      } else {
        res.json("Credenciales Incorrectas");
      }
    } else {
      res.json("Credenciales Incorrectas");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
}

async function profile(req, res) {
  try {
    const user = await User.findById(req.user.sub).select("email");
    res.json("hola ${email}, Puedes Acceder a tu perfil");
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
  login,
  profile,
};

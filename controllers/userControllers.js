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
    if (Array.isArray(req.body.addresses)) {
      userFound.addresses = req.body.addresses.filter(
        (address) => typeof address === "object"
      );
    }
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

async function register(req, res) {
  try {
    const { name, lastname, email, password } = req.body;
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
      email,
      password: hashedPassword,
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
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_TOKEN);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json("Credenciales Incorrectas");
      }
    } else {
      res.status(401).json("Credenciales Incorrectas");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error");
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
  create,
  update,
  destroy,
  register,
  login,
  profile,
};

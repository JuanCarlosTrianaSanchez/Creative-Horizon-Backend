/* import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(404).json("User not found");
    }

    console.log("Plain password:", password);
    console.log("Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Direct bcrypt password match result:", isMatch);

    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(401).json("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated:", token);

    console.log("User logged in successfully!");
    return res.json({ token });
  } catch (err) {
    console.log("Error during login:", err.message);
    return res.status(500).json("Internal server error");
  }
};

const register = async (req, res) => {
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

    console.log("Original password:", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const user = new User({
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

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { login, register };
 */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(404).json("User not found");
    }

    console.log("Plain password:", password);
    console.log("Hashed password from DB:", user.password);

    // Línea de prueba para verificar hashCompare
    const isMatch = await user.hashCompare(password);
    console.log("Using hashCompare method result:", isMatch);

    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(401).json("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated:", token);

    console.log("User logged in successfully!");
    return res.json({ token });
  } catch (err) {
    console.log("Error during login:", err.message);
    return res.status(500).json("Internal server error");
  }
};

const register = async (req, res) => {
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

    // Eliminamos el hash aquí para que solo se maneje en el middleware
    const user = new User({
      name,
      lastname,
      phone,
      email,
      password,
      direccion,
      barrio,
      ciudad,
      pais,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { login, register };

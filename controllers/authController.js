import jwt from "jsonwebtoken";
import User from "../models/user.js";

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user && (await user.hashCompare(req.body.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token });
  } else {
    return res.status(404).json("Credenciales invalidas");
  }
}

export { login };

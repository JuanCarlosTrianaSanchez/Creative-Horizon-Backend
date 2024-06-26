import User from "../models/user.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    console.log("User found:", user);

    console.log("Plain password:", password);
    console.log("Hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(401).send("Invalid credentials");
    }

    console.log("User logged in successfully!");
    res.send("User logged in successfully!");
  } catch (error) {
    console.log("Error during login:", error.message);
    res.status(500).send(error.message);
  }
};

export default { login };

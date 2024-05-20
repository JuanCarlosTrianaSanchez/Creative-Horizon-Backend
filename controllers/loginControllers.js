import User from "../models/user.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User logged in successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { login, list };

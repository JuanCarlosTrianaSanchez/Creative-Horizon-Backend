import mongoose from "../config/mongoose.config.js";

const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  phone: Number,
  /* addresses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
  ], */
  city: String,
});

const User = mongoose.model("User", userSchema);

export default User;

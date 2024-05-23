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
  city: String,
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;

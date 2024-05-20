import mongoose from "../config/mongoose.config.js";

const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  city: String,
});

const User = mongoose.model("User", userSchema);

export default User;

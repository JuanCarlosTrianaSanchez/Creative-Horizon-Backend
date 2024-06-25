import bcrypt from "bcryptjs";
import mongoose from "../config/mongoose.config.js";

const userSchema = mongoose.Schema(
  {
    name: String,
    lastname: String,
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    phone: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
  },
  {
    methods: {
      async hashCompare(string) {
        return bcrypt.compare(string, this.password);
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModifified("password")) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;

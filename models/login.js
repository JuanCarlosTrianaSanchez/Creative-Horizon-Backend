import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Por favor ingrese un correo electrónico válido"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    methods: {
      async hashCompare(string) {
        console.log("Comparing:", string, "with", this.password);
        return await bcrypt.compare(string, this.password);
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;

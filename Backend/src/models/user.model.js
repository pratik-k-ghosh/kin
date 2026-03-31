import mongoose from "mongoose";
import * as argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;

    return;
  } catch (error) {
    throw new Error("Error hashing password");
  }
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (error) {
    return false;
  }
};

const user = new mongoose.model("user", userSchema);

export default user;

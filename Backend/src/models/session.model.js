import mongoose from "mongoose";
import * as argon2 from "argon2";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    refreshToken: { type: String },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true },
);

sessionSchema.pre("save", async function () {
  try {
    if (!this.isModified("refreshToken")) {
      return;
    }

    const hash = await argon2.hash(this.refreshToken);
    this.refreshToken = hash;

    return;
  } catch (error) {
    throw new Error("Error hashing Refresh Token");
  }
});

sessionSchema.methods.verifyRefreshToken = async function (token) {
  try {
    const isValid = await argon2.verify(this.refreshToken, token);
    return isValid;
  } catch (error) {
    throw new Error("Error verifying Refresh Token");
  }
};

const session = mongoose.model("session", sessionSchema);

export default session;

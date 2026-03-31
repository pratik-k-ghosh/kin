import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const session = mongoose.model("session", sessionSchema);

export default session;

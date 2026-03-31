import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    content: { type: String, default: "" },
    caption: { type: String, default: "" },
  },
  { timestamps: true },
);

const post = new mongoose.model("post", postSchema);

export default post;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    img: { type: String, default: null },
    content: { type: String, default: null },
    caption: { type: String, default: null },
  },
  { timestamps: true },
);

const post = new mongoose.model("post", postSchema);

export default post;

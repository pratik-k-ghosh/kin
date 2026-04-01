import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    content: { type: String, default: "" },
    caption: { type: String, default: "" },
  },
  { timestamps: true },
);

const Post = new mongoose.model("post", postSchema);

export default Post;

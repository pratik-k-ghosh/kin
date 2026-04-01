import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    content: { type: String, default: "" },
    caption: { type: String, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const Post = new mongoose.model("post", postSchema);

export default Post;

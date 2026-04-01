import Post from "../../models/posts.model.js";
import { uploadImage } from "../../services/imagekit.service.js";

// to get all the posts for the feed
export const getPost = async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
};

// Create Post Controller
export const createPost = async (req, res) => {
  const { content, caption } = req.body;
  const img = req.file;

  // There should be atleast an image or some content to create a post
  if (!img && !content) {
    return res.status(400).send({ message: "You Can't create an Empty Post" });
  }

  const uploadedImage = img ? await uploadImage(img) : null;

  const newPost = await Post.create({
    img: uploadedImage?.url || "",
    content,
    caption,
  });

  res.status(201).send(newPost);
};

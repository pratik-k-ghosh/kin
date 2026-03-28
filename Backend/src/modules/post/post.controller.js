import post from "../../models/posts.model.js";
import { uploadImage } from "../../services/imagekit.service.js";

export const getPost = async (req, res) => {
  const posts = await post.find();
  res.status(200).send(posts);
};

export const createPost = async (req, res) => {
  const { content, caption } = req.body;
  const img = req.file;

  const uploadedImage = await uploadImage(img);
  console.log(uploadedImage.url);

  const newPost = await post.create({
    img: uploadedImage.url,
    content,
    caption,
  });

  res.status(201).send(newPost);
};

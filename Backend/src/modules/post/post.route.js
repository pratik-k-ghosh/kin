import express from "express";
import { getPost, createPost } from "./post.controller.js";
import multer from "multer";

const postRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRoute.get("/", getPost);
postRoute.post("/create", upload.single("img"), createPost);

export default postRoute;

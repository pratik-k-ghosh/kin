import express from "express";
import multer from "multer";
import { getPost, createPost } from "./post.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const postRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRoute.get("/", getPost);
postRoute.post("/create", authMiddleware, upload.single("img"), createPost);

export default postRoute;

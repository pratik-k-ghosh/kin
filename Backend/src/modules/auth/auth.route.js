import express from "express";
import { register } from "./auth.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const authRoute = express.Router();

authRoute.post("/register", upload.single("profilePicture"), register);

export default authRoute;

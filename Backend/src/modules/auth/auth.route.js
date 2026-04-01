import express from "express";
import multer from "multer";
import * as authController from "./auth.controller.js";

const authRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

authRoute.post(
  "/register",
  upload.single("profilePicture"),
  authController.register,
);

authRoute.post("/login", authController.login);

authRoute.post("/refresh-token", authController.refreshToken);

export default authRoute;

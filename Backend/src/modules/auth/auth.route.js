import express from "express";
import multer from "multer";
import * as authController from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const authRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

authRoute.post(
  "/register",
  authMiddleware,
  upload.single("profilePicture"),
  authController.register,
);

authRoute.post("/login", authMiddleware, authController.login);

authRoute.post("/logout", authMiddleware, authController.logout);

export default authRoute;

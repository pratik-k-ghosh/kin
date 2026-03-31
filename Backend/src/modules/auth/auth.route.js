import express from "express";
import * as authController from "./auth.controller.js";
import multer from "multer";

const authRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

authRoute.post(
  "/register",
  upload.single("profilePicture"),
  authController.register,
);

authRoute.post("/login", authController.login);

authRoute.get("/get", authController.test);

export default authRoute;

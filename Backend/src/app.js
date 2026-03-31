import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/db.js";
import postRoute from "./modules/post/post.route.js";
import authRoute from "./modules/auth/auth.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

connectDb();

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

export default app;

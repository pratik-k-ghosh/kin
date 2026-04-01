// import all modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// import all routes
import { connectDb } from "./config/db.js";
import postRoute from "./modules/post/post.route.js";
import authRoute from "./modules/auth/auth.route.js";

// create app instance
const app = express();

// configure the app to use middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// connect to the database
connectDb();

// use routes
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

export default app;

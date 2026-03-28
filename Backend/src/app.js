import express from "express";
import dotenv from "dotenv";

import { connectDb } from "./config/db.js";
import postRoute from "./modules/post/post.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.status(200).send("Home");
});

export default app;

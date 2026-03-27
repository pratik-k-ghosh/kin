import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Home");
});

export default app;

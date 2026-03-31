import jwt from "jsonwebtoken";
import { user } from "./auth.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await user
      .findById(decodedToken.userId)
      .select("-password");

    if (!userData) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userData = userData;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

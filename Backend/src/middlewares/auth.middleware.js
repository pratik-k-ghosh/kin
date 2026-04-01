import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// middleware to protect routes that require authentication
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    // if there is no access token in the cookies, return an error
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(decodedToken.userId).select(
      "-password",
    );

    // if no user is found with the userId from the token, return an error
    if (!userData) {
      return res.status(500).json({ error: "Unauthorized" });
    }

    // if everything is valid, attach the user data to the request object and allow the request to proceed
    req.user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

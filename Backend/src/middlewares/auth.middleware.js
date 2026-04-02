import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { refreshToken } from "../utils/refresh.token.js";

// middleware to protect routes that require authentication
export const authMiddleware = async (req, res, next) => {
  try {
    const cookies = { accessToken: "", refreshToken: "" };
    cookies.accessToken = req.cookies.accessToken;

    // if there is no Access Token in the cookies, return an error
    if (!cookies.accessToken) {
      const { accessToken } = await refreshToken(req, res);

      if (!accessToken) {
        req.user = null;
        return next();
      }

      cookies.accessToken = accessToken;
    }

    const decodedToken = jwt.verify(
      cookies.accessToken,
      process.env.JWT_SECRET,
    );

    const userData = await User.findById(decodedToken.userId).select(
      "-password",
    );

    // if no user is found with the userId from the Access Token, return an error
    if (!userData) {
      req.user = null;
      return next();
    }

    // if everything is valid, attach the user data to the request object
    req.user = userData;

    return next();
  } catch (error) {
    req.user = null;
    return next();
  }
};

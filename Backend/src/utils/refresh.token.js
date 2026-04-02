import jwt from "jsonwebtoken";
import Session from "../models/session.model.js";
import { createSession } from "./auth.session.js";
import { authTokenGenerator } from "./auth.token.js";
import { setAuthCookies } from "./auth.cookies.js";

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // Without a refresh token, we cannot refresh the access token
    if (!refreshToken) {
      return null;
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // return an error if the refresh token is invalid or expired
    if (!decoded) {
      return null;
    }

    // get the session from the database
    const existingSession = await Session.findOne({
      _id: decoded.sessionId,
      valid: true,
    });

    // return no valid session error
    if (!existingSession) {
      return null;
    }

    // match both refresh tokens
    const isVerified = await existingSession.verifyRefreshToken(refreshToken);

    if (!isVerified) {
      return null;
    }

    // if everything is valid, we can refresh all the tokens

    // invalidate the existing session
    existingSession.valid = false;
    await existingSession.save();

    // create a new session and generate new tokens
    const newSession = await createSession({
      userId: decoded.userId,
      refreshToken: "",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      authTokenGenerator({
        userId: decoded.userId,
        sessionId: newSession._id,
      });

    newSession.refreshToken = newRefreshToken;
    await newSession.save();

    setAuthCookies({
      res,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    return null;
  }
};

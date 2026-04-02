import User from "../../models/user.model.js";
import Session from "../../models/session.model.js";
import { uploadProfileImage } from "../../services/imagekit.service.js";
import { createSession } from "../../utils/auth.session.js";
import { authTokenGenerator } from "../../utils/auth.token.js";
import { setAuthCookies } from "../../utils/auth.cookies.js";
import jwt from "jsonwebtoken";

// controller for Registering New Users
export const register = async (req, res) => {
  try {
    if (req.user) {
      return res.status(400).json({ error: "You are already logged in" });
    }

    const { userName, name, email, password } = req.body;
    const profilePicture = req.file;

    // Checking if any field is missing
    if (!userName || !name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // User that already exists with the same email or username
    const doesUserExist = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (doesUserExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // if profile picture is provided, upload it and get the URL, otherwise set it to null
    const uploadedProfilePicture = profilePicture
      ? await uploadProfileImage(profilePicture)
      : null;

    // Storing the new user data in the database
    const newUser = await User.create({
      userName: userName.toLowerCase(),
      name,
      email,
      password,
      profilePicture:
        uploadedProfilePicture?.url || userName.charAt(0).toUpperCase(),
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user" });
  }
};

// Controller for Logging in Users
export const login = async (req, res) => {
  try {
    if (req.user) {
      return res.status(400).json({ error: "You are already logged in" });
    }

    // an identifier can be either email or username, so we will check for both
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    // if no user exists with the credentials provided, return an error
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await existingUser.verifyPassword(password);

    // Check if the password is valid, if not return an error
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // if everything is valid, we can generate tokens
    const newSession = await createSession({
      userId: existingUser._id,
      refreshToken: "",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    const { accessToken, refreshToken } = authTokenGenerator({
      userId: existingUser._id,
      sessionId: newSession._id,
    });

    newSession.refreshToken = refreshToken;
    await newSession.save();

    setAuthCookies({ res, accessToken, refreshToken });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in" });
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "You are not logged in" });
    }

    const { refreshToken } = req.cookies;

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (decoded) {
      await Session.findOneAndUpdate(
        { _id: decoded.sessionId },
        { valid: false },
      );
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error logging out" });
  }
};

import user from "../../models/user.model.js";
import { uploadProfileImage } from "../../services/imagekit.service.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { userName, name, email, password } = req.body;
    const profilePicture = req.file;

    if (!userName || !name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const doesUserExist = await user.findOne({
      $or: [{ email }, { userName }],
    });

    if (doesUserExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const uploadedProfilePicture = profilePicture
      ? await uploadProfileImage(profilePicture)
      : null;

    const newUser = await user.create({
      userName: userName.toLowerCase(),
      name,
      email,
      password,
      profilePicture: uploadedProfilePicture?.url || "",
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await user.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!existingUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await existingUser.verifyPassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in" });
  }
};

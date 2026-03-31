import user from "../../models/user.model.js";
import { uploadProfileImage } from "../../services/imagekit.service.js";

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

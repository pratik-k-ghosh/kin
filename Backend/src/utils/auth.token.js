import jwt from "jsonwebtoken";

// Function to generate access and refresh tokens for a user session
export const authTokenGenerator = ({ userId, sessionId }) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId, sessionId },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      },
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens");
  }
};

import Session from "../models/session.model.js";

// Function to create a new session in the database
export const createSession = async ({
  userId,
  refreshToken,
  ip,
  userAgent,
}) => {
  try {
    const newSession = await Session.create({
      userId,
      refreshToken,
      ip,
      userAgent,
    });

    return newSession;
  } catch (error) {
    throw new Error("Error creating session");
  }
};

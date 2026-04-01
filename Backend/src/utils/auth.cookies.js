// Function to set authentication cookies for access and refresh tokens
export const setAuthCookies = ({ res, accessToken, refreshToken }) => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    return true;
  } catch (error) {
    throw new Error("Error setting cookies");
  }
};

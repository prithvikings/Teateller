import { generateToken, setTokenCookie } from "../utils/jwt.js";

export const googleCallback = (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }

  const token = generateToken(req.user._id);
  setTokenCookie(res, token);

  if (!req.user.isOnboarded) {
    return res.redirect(`${process.env.CLIENT_URL}/onboarding`);
  }

  res.redirect(`${process.env.CLIENT_URL}/`);
};

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

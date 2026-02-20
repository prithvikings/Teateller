import rateLimit from "express-rate-limit";

export const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "You're spilling too much tea! Take a break and come back in an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

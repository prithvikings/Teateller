import express from "express";
import passport from "passport";
import {
  googleCallback,
  logout,
  getMe,
} from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  googleCallback,
);

router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

export default router;

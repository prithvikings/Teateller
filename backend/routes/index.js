import express from "express";
import authRoutes from "./auth.js";
import confessionRoutes from "./confessionRoutes.js";
import {
  getComments,
  createComment,
} from "../controllers/commentController.js";
import {
  getMyWhispers,
  getWallet,
  spendCoins,
  deleteAccount,
} from "../controllers/userController.js";
import {
  getCollections,
  createCollection,
  addBookmark,
  getCollectionBookmarks,
  getAllBookmarks,
} from "../controllers/collectionController.js";
import { completeOnboarding } from "../controllers/userController.js";
import { onboardingSchema } from "../validations/index.js";
import { validateBody } from "../middlewares/validateRequest.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/confessions", confessionRoutes);

router.post(
  "/users/onboard",
  requireAuth,
  validateBody(onboardingSchema),
  completeOnboarding,
);

router
  .route("/confessions/:id/comments")
  .get(getComments)
  .post(requireAuth, createComment);

router.get("/users/me/whispers", requireAuth, getMyWhispers);
router.get("/users/me/wallet", requireAuth, getWallet);
router.delete("/users/me", requireAuth, deleteAccount);
router.post("/wallet/spend", requireAuth, spendCoins);

router
  .route("/collections")
  .get(requireAuth, getCollections)
  .post(requireAuth, createCollection);
router.get("/bookmarks", requireAuth, getAllBookmarks);
router.get("/collections/:id/bookmarks", requireAuth, getCollectionBookmarks);
router.post("/bookmarks", requireAuth, addBookmark);

export default router;

import express from "express";
import {
  getConfessions,
  getTrending,
  createConfession,
  getConfession,
  updateConfession,
  deleteConfession,
  voteConfession,
} from "../controllers/confessionController.js";
import { requireAuth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateRequest.js";
import {
  createConfessionSchema,
  updateConfessionSchema,
  voteSchema,
} from "../validations/index.js";
import { postLimiter } from "../middlewares/ratelimiter.js";

const router = express.Router();

router
  .route("/")
  .get(getConfessions)
  .post(requireAuth, validateBody(createConfessionSchema), createConfession);

router.get("/trending", getTrending);

router
  .route("/:id")
  .get(getConfession)
  .put(requireAuth, validateBody(updateConfessionSchema), updateConfession)
  .delete(requireAuth, deleteConfession);

router.post("/:id/vote", requireAuth, validateBody(voteSchema), voteConfession);

export default router;

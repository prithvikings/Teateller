import Comment from "../models/Comment.js";
import Confession from "../models/Confession.js";
import AppError from "../utils/AppError.js";

export const getComments = async (req, res) => {
  const { id: confessionId } = req.params;
  const comments = await Comment.find({ confessionId })
    .sort({ createdAt: -1 })
    .lean();

  res
    .status(200)
    .json({ success: true, count: comments.length, data: comments });
};

export const createComment = async (req, res) => {
  const { id: confessionId } = req.params;
  const { content } = req.body;

  if (!content) throw new AppError("Comment content is required", 400);

  const confession = await Confession.findByIdAndUpdate(confessionId, {
    $inc: { commentsCount: 1 },
  });

  if (!confession) throw new AppError("Confession not found", 404);

  const comment = await Comment.create({
    confessionId,
    authorId: req.user._id,
    authorAlias: req.user.alias,
    authorAvatar: req.user.avatarSeed,
    content,
  });

  res.status(201).json({ success: true, data: comment });
};

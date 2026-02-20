import Confession from "../models/Confession.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const getConfessions = async (req, res) => {
  const { page = 1, limit = 20, sort = "latest", topic, search } = req.query;
  let query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (topic) {
    query.topic = topic;
  }

  let sortOption = { createdAt: -1 };

  if (search && sort === "relevance") {
    sortOption = { score: { $meta: "textScore" } };
  } else if (sort === "popular") {
    sortOption = { upvotes: -1, views: -1 };
  }

  const confessions = await Confession.find(
    query,
    search ? { score: { $meta: "textScore" } } : {},
  )
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  res.status(200).json({
    success: true,
    results: confessions.length,
    data: confessions,
  });
};

export const getTrending = async (req, res) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const trending = await Confession.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
        status: "Public",
      },
    },
    {
      $addFields: {
        hoursPassed: {
          $divide: [{ $subtract: [new Date(), "$createdAt"] }, 3600000],
        },
      },
    },
    {
      $addFields: {
        trendingScore: {
          $divide: [
            {
              $add: ["$upvotes", { $multiply: ["$commentsCount", 2] }, 1],
            },
            { $pow: [{ $add: ["$hoursPassed", 2] }, 1.5] },
          ],
        },
      },
    },
    { $sort: { trendingScore: -1 } },
    { $limit: 15 },
    {
      $project: {
        secretCode: 0,
        trendingScore: 0,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: trending,
  });
};
export const createConfession = async (req, res) => {
  const { content, topic, secretCode } = req.body;

  if (!content || !topic || !secretCode || secretCode.length !== 4) {
    throw new AppError(
      "Invalid input. A 4-digit secret code is required.",
      400,
    );
  }

  const hashedSecret = await bcrypt.hash(secretCode, 10);

  const confession = await Confession.create({
    content,
    topic,
    authorId: req.user._id,
    authorAlias: req.user.alias,
    authorAvatar: req.user.avatarSeed,
    secretCode: hashedSecret,
  });

  confession.secretCode = undefined;
  res.status(201).json({ success: true, data: confession });
};

export const getConfession = async (req, res) => {
  const confession = await Confession.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true },
  ).lean();

  if (!confession) throw new AppError("Confession not found", 404);

  res.status(200).json({ success: true, data: confession });
};

export const updateConfession = async (req, res) => {
  const { content, secretCode } = req.body;
  const confession = await Confession.findById(req.params.id).select(
    "+secretCode",
  );

  if (!confession) throw new AppError("Confession not found", 404);
  if (confession.authorId.toString() !== req.user._id.toString()) {
    throw new AppError("Unauthorized action", 403);
  }

  const isMatch = await bcrypt.compare(secretCode, confession.secretCode);
  if (!isMatch) throw new AppError("Invalid secret code", 401);

  confession.content = content || confession.content;
  await confession.save();

  confession.secretCode = undefined;
  res.status(200).json({ success: true, data: confession });
};

export const deleteConfession = async (req, res) => {
  const { secretCode } = req.body;
  const confession = await Confession.findById(req.params.id).select(
    "+secretCode",
  );

  if (!confession) throw new AppError("Confession not found", 404);
  if (confession.authorId.toString() !== req.user._id.toString()) {
    throw new AppError("Unauthorized action", 403);
  }

  const isMatch = await bcrypt.compare(secretCode, confession.secretCode);
  if (!isMatch) throw new AppError("Invalid secret code", 401);

  await confession.deleteOne();
  res.status(200).json({ success: true, message: "Confession deleted" });
};

export const voteConfession = async (req, res) => {
  const { action } = req.body;
  const userId = req.user._id;

  if (!["upvote", "downvote"].includes(action))
    throw new AppError("Invalid action", 400);

  const confession = await Confession.findById(req.params.id);
  if (!confession) throw new AppError("Confession not found", 404);

  const existingVoteIndex = confession.voters.findIndex(
    (v) => v.userId.toString() === userId.toString(),
  );

  if (existingVoteIndex > -1) {
    const existingVote = confession.voters[existingVoteIndex];

    if (existingVote.voteType === action) {
      confession[action === "upvote" ? "upvotes" : "downvotes"] -= 1;
      confession.voters.splice(existingVoteIndex, 1);
    } else {
      confession[
        existingVote.voteType === "upvote" ? "upvotes" : "downvotes"
      ] -= 1;
      confession[action === "upvote" ? "upvotes" : "downvotes"] += 1;
      confession.voters[existingVoteIndex].voteType = action;
    }
  } else {
    confession[action === "upvote" ? "upvotes" : "downvotes"] += 1;
    confession.voters.push({ userId, voteType: action });
  }

  await confession.save();

  res.status(200).json({
    success: true,
    data: {
      upvotes: confession.upvotes,
      downvotes: confession.downvotes,
      userVote:
        confession.voters.find((v) => v.userId.toString() === userId.toString())
          ?.voteType || null,
    },
  });
};

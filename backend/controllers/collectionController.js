import Collection from "../models/Collection.js";
import Bookmark from "../models/Bookmark.js";
import AppError from "../utils/AppError.js";

export const getCollections = async (req, res) => {
  const collections = await Collection.aggregate([
    { $match: { userId: req.user._id } },
    {
      $lookup: {
        from: "bookmarks",
        localField: "_id",
        foreignField: "collectionId",
        as: "bookmarks",
      },
    },
    {
      $addFields: {
        bookmarkCount: { $size: "$bookmarks" },
      },
    },
    { $project: { bookmarks: 0 } },
    { $sort: { createdAt: -1 } },
  ]);

  res.status(200).json({ success: true, data: collections });
};

export const createCollection = async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new AppError("Collection name is required", 400);

  const collection = await Collection.create({
    userId: req.user._id,
    name,
    description,
  });

  res.status(201).json({ success: true, data: collection });
};

export const addBookmark = async (req, res) => {
  const { confessionId, collectionId, privateNote } = req.body;

  if (!confessionId || !collectionId) {
    throw new AppError("Confession ID and Collection ID are required", 400);
  }

  try {
    const bookmark = await Bookmark.create({
      userId: req.user._id,
      confessionId,
      collectionId,
      privateNote,
    });
    res.status(201).json({ success: true, data: bookmark });
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError(
        "Confession already bookmarked in this collection",
        400,
      );
    }
    throw error;
  }
};

export const getCollectionBookmarks = async (req, res) => {
  const { id: collectionId } = req.params;

  const collection = await Collection.findOne({
    _id: collectionId,
    userId: req.user._id,
  });
  if (!collection)
    throw new AppError("Collection not found or unauthorized", 404);

  const bookmarks = await Bookmark.find({ collectionId })
    .populate("confessionId")
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({ success: true, data: { collection, bookmarks } });
};

export const getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id })
      .populate("confessionId")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    throw new AppError("Failed to fetch all bookmarks", 500);
  }
};

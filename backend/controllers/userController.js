import User from "../models/User.js";
import Confession from "../models/Confession.js";
import Bookmark from "../models/Bookmark.js";
import Transaction from "../models/Transaction.js";
import AppError from "../utils/AppError.js";

export const getMyWhispers = async (req, res) => {
  const confessions = await Confession.find({ authorId: req.user._id })
    .sort({ createdAt: -1 })
    .lean();

  res
    .status(200)
    .json({ success: true, count: confessions.length, data: confessions });
};

export const getWallet = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  res.status(200).json({
    success: true,
    data: { balance: req.user.coinsBalance, transactions },
  });
};

export const spendCoins = async (req, res) => {
  const { action, amount } = req.body;

  if (!action || !amount || amount <= 0) {
    throw new AppError("Valid action and positive amount required", 400);
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id, coinsBalance: { $gte: amount } },
    { $inc: { coinsBalance: -amount } },
    { new: true },
  );

  if (!updatedUser) {
    throw new AppError("Insufficient coins", 400);
  }

  const transaction = await Transaction.create({
    userId: req.user._id,
    type: "spend",
    action,
    amount,
  });

  res.status(200).json({
    success: true,
    data: { newBalance: updatedUser.coinsBalance, transaction },
  });
};

export const completeOnboarding = async (req, res) => {
  const { alias, avatarSeed, interests } = req.body;

  if (req.user.isOnboarded) {
    throw new AppError("User is already onboarded", 400);
  }

  const existingAlias = await User.findOne({ alias });
  if (existingAlias) {
    throw new AppError(
      "This ghost name is already haunting the wall. Pick another.",
      400,
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      alias,
      avatarSeed,
      interests,
      isOnboarded: true,
      coinsBalance: 10,
    },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    message: "Onboarding complete",
    data: updatedUser,
  });
};

export const deleteAccount = async (req, res) => {
  const userId = req.user._id;

  await Promise.all([
    Confession.deleteMany({ authorId: userId }),
    Bookmark.deleteMany({ userId: userId }),
    User.findByIdAndDelete(userId),
  ]);

  res.cookie("jwt", "", { expires: new Date(0) });

  res.status(200).json({ success: true, message: "Account deleted" });
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, select: false },
    email: { type: String, required: true, unique: true, select: false },
    isOnboarded: { type: Boolean, default: false },
    alias: { type: String, sparse: true, unique: true },
    avatarSeed: { type: String },
    interests: [{ type: String }],
    coinsBalance: { type: Number, default: 0, min: 0 },
    globalSecretCode: { type: String, select: false },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

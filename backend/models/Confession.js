import mongoose from "mongoose";

const confessionSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, maxlength: 5000 },
    topic: {
      type: String,
      enum: [
        "Funny",
        "College",
        "Work",
        "Relationships",
        "Spiciest",
        "Deep Thoughts",
      ],
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorAlias: { type: String, required: true },
    authorAvatar: { type: String, required: true },
    secretCode: { type: String, required: true, select: false },
    upvotes: { type: Number, default: 0, min: 0 },
    downvotes: { type: Number, default: 0, min: 0 },
    commentsCount: { type: Number, default: 0, min: 0 },
    views: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["Public", "Private"], default: "Public" },
    isPremiumBlurred: { type: Boolean, default: false },
    voters: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        voteType: { type: String, enum: ["upvote", "downvote"] },
      },
    ],
  },
  { timestamps: true },
);

confessionSchema.index({ createdAt: -1 });
confessionSchema.index({ upvotes: -1, views: -1 });
confessionSchema.index({ topic: 1, createdAt: -1 });
confessionSchema.index({ content: "text" });
confessionSchema.index({ authorId: 1 });
confessionSchema.index(
  { content: "text", topic: "text" },
  { weights: { topic: 10, content: 5 }, name: "ConfessionTextSearch" },
);

export default mongoose.model("Confession", confessionSchema);

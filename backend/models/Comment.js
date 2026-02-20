import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    confessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Confession",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorAlias: { type: String, required: true },
    authorAvatar: { type: String, required: true },
    content: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true },
);

commentSchema.index({ confessionId: 1, createdAt: 1 });

export default mongoose.model("Comment", commentSchema);

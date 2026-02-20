import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    confessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Confession",
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    privateNote: { type: String, maxlength: 500 },
  },
  { timestamps: true },
);

bookmarkSchema.index(
  { userId: 1, confessionId: 1, collectionId: 1 },
  { unique: true },
);
bookmarkSchema.index({ collectionId: 1 });

export default mongoose.model("Bookmark", bookmarkSchema);

import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, maxlength: 200 },
  },
  { timestamps: true },
);

collectionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Collection", collectionSchema);

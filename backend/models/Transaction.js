import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["add", "spend"], required: true },
    action: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

transactionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Transaction", transactionSchema);

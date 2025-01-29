import mongoose from "mongoose";
import { date } from "zod";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  deletedAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("sessionModel", sessionSchema);

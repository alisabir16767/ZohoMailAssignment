import mongoose, { Schema } from "mongoose";

const emailLogSchema = new Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: {
      type: String,
      enum: ["sent", "failed"],
      default: "sent",
    },
    error: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("EmailLog", emailLogSchema);

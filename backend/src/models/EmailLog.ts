import mongoose, { Document, Schema } from "mongoose";

export interface IEmailLog extends Document {
  to: string;
  subject: string;
  body: string;
  status: "sent" | "failed";
  error?: string;
}

const emailLogSchema = new Schema<IEmailLog>(
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

export default mongoose.model<IEmailLog>("EmailLog", emailLogSchema);

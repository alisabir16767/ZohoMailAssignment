import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);

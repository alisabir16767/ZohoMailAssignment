import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  user: mongoose.Types.ObjectId;
  subject: string;
  message: string;
  status: "open" | "in-progress" | "closed";
}

const ticketSchema = new Schema<ITicket>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", ticketSchema);

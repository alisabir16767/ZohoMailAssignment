import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  user: mongoose.Types.ObjectId;
  subject: string;
  message: string;
  status: "open" | "in-progress" | "closed";
  eventName: string;       // added
  eventDate: Date;         // added
  createdAt?: Date;
  updatedAt?: Date;
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
    eventName: { type: String, required: true },   // added
    eventDate: { type: Date, required: true },    // added
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", ticketSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IInvoice extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  status: "pending" | "paid" | "cancelled";
}

const invoiceSchema = new Schema<IInvoice>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);

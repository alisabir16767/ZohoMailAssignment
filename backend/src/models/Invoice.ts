import mongoose, { Document, Schema } from "mongoose";

export interface IInvoice extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  items: string[];         // added
  createdAt?: Date;
  updatedAt?: Date;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    items: [{ type: String, required: true }],  // added
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);

import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    items: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);

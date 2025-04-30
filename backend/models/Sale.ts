import mongoose, { Schema } from "mongoose";
import { ISale } from "../interfaces/ISale";

const saleSchema = new Schema<ISale>(
  {
    saleCode: { type: String, unique: true, sparse: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    payment: {
      method: {
        type: String,
        enum: ["dinheiro", "cartao", "pix"],
        required: true
      },
      received: { type: Number, required: true },
      change: { type: Number, required: true }
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Sale = mongoose.model<ISale>("Sale", saleSchema);

export default Sale;
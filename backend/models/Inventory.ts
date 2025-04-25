import mongoose, { Schema } from "mongoose";
import { IInventory } from "../interfaces/IInventory";

const inventorySchema = new Schema<IInventory>(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        countedQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model<IInventory>("Inventory", inventorySchema);

export default Inventory;

import { Document, Types } from "mongoose";

export interface IInventory extends Document {
  products: {
    productId: Types.ObjectId;
    countedQuantity: number;
  }[];
  performedBy: Types.ObjectId;
}
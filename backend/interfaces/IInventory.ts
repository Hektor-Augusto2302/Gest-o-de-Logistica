import { Document, Types } from "mongoose";

export interface IInventory extends Document {
  products: {
    codeOrName: string;
    countedQuantity: number;
  }[];
  performedBy: Types.ObjectId;
}
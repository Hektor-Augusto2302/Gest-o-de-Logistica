import { Document, Types } from "mongoose";

export interface ISale extends Document {
  saleCode?: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  payment: {
    method: 'dinheiro' | 'cartao' | 'pix';
    received: number;
    change: number;
  };
  user?: Types.ObjectId;
  createdAt: Date;
  userName: string;
}
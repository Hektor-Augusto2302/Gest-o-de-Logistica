import { Document, Types } from "mongoose";

export interface IProduct extends Document {
    name: string;
    code: string;
    quantity: number;
    description?: string;
    costPrice: number;
    salePrice: number;
    unit: string;
    category: string;
    suppliers: string[];
    minStock: number;
    createdBy: Types.ObjectId;
}
import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        quantity: { type: Number, required: true, default: 0 },
        description: { type: String },
        costPrice: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        unit: { type: String, required: true },
        category: { type: String, required: true },
        suppliers: [{ type: String }],
        minStock: { type: Number, default: 1 },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
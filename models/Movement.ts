import mongoose, { Schema } from "mongoose";
import { IMovement } from "../interfaces/IMovement";

const movementSchema = new Schema<IMovement>(
    {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        movementQuantity: { 
            type: Number, 
            required: true, 
            min: [1, "A quantidade deve ser no mínimo 1"] 
        },
        type: { type: String, enum: ["entrada", "saida"], required: true },
        date: { type: Date, default: Date.now },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

const Movement = mongoose.model<IMovement>("Movement", movementSchema);

export default Movement;
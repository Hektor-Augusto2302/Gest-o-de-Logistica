import { Document, Types } from "mongoose";

export interface IMovement extends Document {
    product: Types.ObjectId;
    movementQuantity: number;
    type: "entrada" | "saida";
    date: Date;
    createdBy: Types.ObjectId;
}
import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
    {
        name: String,
        email: String,
        password: String,
        profileImage: String,
        role: { type: String, enum: ["user", "admin"], default: "user" }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

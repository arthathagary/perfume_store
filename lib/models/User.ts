import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: String,
    address: String,
    city: String,
    zip: String,
    country: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

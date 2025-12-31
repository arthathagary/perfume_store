import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["PERCENTAGE", "FIXED"],
        required: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0,
    },
    expirationDate: {
        type: Date,
    },
    usageLimit: {
        type: Number, // Global usage limit (e.g., first 100 users)
        default: null,
    },
    usedCount: {
        type: Number,
        default: 0,
    },
    perUserLimit: {
        type: Boolean, // If true, one use per email/user
        default: false,
    },
    usedBy: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        email: String,
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        usedAt: { type: Date, default: Date.now }
    }],
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);

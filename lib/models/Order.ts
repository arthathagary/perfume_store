import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        address: String,
        city: String,
        zip: String,
        country: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User account
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
    }],
    total: Number,
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        default: "cod", // Cash on Delivery for M1
    },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

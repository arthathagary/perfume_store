import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String, // e.g., Eau de Parfum, Gift Set
        required: true,
    },
    images: [{
        type: String, // Array of image URLs
    }],
    notes: {
        top: String,
        heart: String,
        base: String,
    },
    details: {
        longevity: String,
        sillage: String,
        concentration: String,
    },
    stock: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

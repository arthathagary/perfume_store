"use server";

import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { revalidatePath } from "next/cache";

// Type definition for product data
export interface ProductData {
    name: string;
    description: string;
    price: number;
    offerPrice?: number | null;
    category: string;
    notes: {
        top: string;
        heart: string;
        base: string;
    };
    details: {
        longevity: string;
        sillage: string;
        concentration: string;
    };
    images: string[];
    stock?: number;
    showStock?: boolean;
}

export async function createProduct(data: ProductData) {
    try {
        await dbConnect();
        console.log("Creating product with data:", JSON.stringify(data, null, 2));
        const newProduct = await Product.create(data);
        console.log("Created product result:", JSON.stringify(newProduct, null, 2));
        revalidatePath("/admin/products");
        revalidatePath("/"); // Update storefront too
        return { success: true, product: JSON.parse(JSON.stringify(newProduct)) };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function getProducts(filter: { category?: string; limit?: number } = {}) {
    try {
        await dbConnect();

        const query: any = {};
        if (filter.category) {
            // Case-insensitive regex search for category
            query.category = { $regex: new RegExp(filter.category, 'i') };
        }

        let productsQuery = Product.find(query).sort({ createdAt: -1 });

        if (filter.limit) {
            productsQuery = productsQuery.limit(filter.limit);
        }

        const products = await productsQuery;
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Failed to fetch products (DB Connection likely missing):", error);
        // Return empty array to allow build to pass / page to render empty state
        return [];
    }
}

export async function getProductById(id: string) {
    try {
        await dbConnect();
        const product = await Product.findById(id);
        if (!product) return null;
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

export async function updateProduct(id: string, data: ProductData) {
    try {
        await dbConnect();
        console.log("Updating product with data:", JSON.stringify(data, null, 2));
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        console.log("Updated product result:", JSON.stringify(updatedProduct, null, 2));
        revalidatePath("/admin/products");
        revalidatePath("/");
        revalidatePath(`/products/${id}`);
        return { success: true, product: JSON.parse(JSON.stringify(updatedProduct)) };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await dbConnect();
        await Product.findByIdAndDelete(id);
        revalidatePath("/admin/products");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function getProductCount() {
    try {
        await dbConnect();
        return await Product.countDocuments();
    } catch (error) {
        return 0;
    }
}

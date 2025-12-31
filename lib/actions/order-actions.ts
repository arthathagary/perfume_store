"use server";

import dbConnect from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

interface CreateOrderData {
    customer: {
        name: string;
        email: string;
    };
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    total: number;
    status: string;
    userId?: string;
    couponCode?: string;
}

import { Product } from "@/lib/models/Product";
import { validateCoupon, recordCouponUsage } from "@/lib/actions/coupon-actions";

export async function createOrder(data: CreateOrderData) {
    try {
        await dbConnect();

        let finalTotal = data.total;

        // 1. Validate & Apply Coupon if present
        if (data.couponCode) {
            const validation = await validateCoupon(data.couponCode, data.total, data.customer.email);
            if (!validation.valid) {
                return { success: false, error: `Invalid Coupon: ${validation.message}` };
            }
            // Recalculate total just to be safe and authoritative
            finalTotal = data.total - validation.discountAmount!;
            
            // Record Usage
            // We need order ID first? No, recordCouponUsage takes orderId string.
            // But we haven't created order yet.
            // We should create order first, then record usage.
        }

        // 2. Create the Order
        const orderPayload = {
            ...data,
            total: finalTotal,
            discountAmount: data.total - finalTotal
        };

        const order = await Order.create(orderPayload);

        // 3. Record Coupon Usage (Atomic-ish)
        if (data.couponCode) {
            await recordCouponUsage(data.couponCode, data.customer.email, order._id.toString(), data.userId);
        }

        // 4. Reduce Stock for each item
        for (const item of data.items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity }
            });
        }

        revalidatePath("/admin/products"); // Update product list to show new stock
        revalidatePath("/"); // Update storefront
        revalidatePath("/admin/orders");
        return { success: true, orderId: order._id.toString() };
    } catch (error) {
        console.error("Failed to create order:", error);
        return { success: false, error: "Failed to create order" };
    }
}

export async function getOrders() {
    try {
        await dbConnect();
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
    }
}

export async function getOrderById(id: string) {
    try {
        await dbConnect();
        const order = await Order.findById(id).populate("items.productId");
        if (!order) return null;
        return JSON.parse(JSON.stringify(order));
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return null;
    }
}

import { sendOrderUpdateEmail } from "@/lib/email";

export async function updateOrderStatus(id: string, status: string) {
    try {
        await dbConnect();
        const order = await Order.findByIdAndUpdate(id, { status });

        if (order) {
            // Send email notification (fire and forget to not block UI)
            sendOrderUpdateEmail(order.customer.email, order._id.toString(), status, order.customer.name);
        }

        revalidatePath("/admin/orders");
        revalidatePath(`/admin/orders/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function getUserOrders() {
    try {
        const session = await auth();
        if (!session?.user?.id) return [];

        await dbConnect();
        const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to fetch user orders:", error);
        return [];
    }
}

export async function getDashboardStats() {
    try {
        await dbConnect();

        // Parallelize queries for performance
        const [totalOrders, pendingOrders, revenueResult, recentOrders] = await Promise.all([
            Order.countDocuments(),
            Order.countDocuments({ status: "pending" }),
            Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
            Order.find().sort({ createdAt: -1 }).limit(5)
        ]);

        const totalRevenue = revenueResult[0]?.total || 0;

        return {
            totalOrders,
            pendingOrders,
            totalRevenue,
            recentOrders: JSON.parse(JSON.stringify(recentOrders))
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            totalOrders: 0,
            pendingOrders: 0,
            totalRevenue: 0,
            recentOrders: []
        };
    }
}

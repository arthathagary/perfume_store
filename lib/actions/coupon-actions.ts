"use server";

import dbConnect from "@/lib/db";
import { Coupon } from "@/lib/models/Coupon";
import { revalidatePath } from "next/cache";

export interface CouponData {
    code: string;
    type: "PERCENTAGE" | "FIXED";
    value: number;
    expirationDate?: Date;
    usageLimit?: number;
    perUserLimit?: boolean;
}

export async function createCoupon(data: CouponData) {
    try {
        await dbConnect();
        const existing = await Coupon.findOne({ code: data.code.toUpperCase() });
        if (existing) {
            return { success: false, error: "Coupon code already exists" };
        }
        
        await Coupon.create({
            ...data,
            code: data.code.toUpperCase(),
        });
        
        revalidatePath("/admin/coupons");
        return { success: true };
    } catch (error) {
        console.error("Create coupon error:", error);
        return { success: false, error: "Failed to create coupon" };
    }
}

export async function getCoupons() {
    try {
        await dbConnect();
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(coupons));
    } catch (error) {
        return [];
    }
}

export async function deleteCoupon(id: string) {
    try {
        await dbConnect();
        await Coupon.findByIdAndDelete(id);
        revalidatePath("/admin/coupons");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete coupon" };
    }
}

export async function validateCoupon(code: string, cartTotal: number, userEmail?: string) {
    try {
        await dbConnect();
        const coupon = await Coupon.findOne({ code: code.toUpperCase() });

        if (!coupon) {
            return { valid: false, message: "Invalid coupon code" };
        }

        if (!coupon.isActive) {
            return { valid: false, message: "Coupon is no longer active" };
        }

        if (coupon.expirationDate && new Date() > new Date(coupon.expirationDate)) {
            return { valid: false, message: "Coupon has expired" };
        }

        if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
            return { valid: false, message: "Coupon usage limit reached" };
        }

        if (coupon.perUserLimit && userEmail) {
            const hasUsed = coupon.usedBy.some((usage: any) => usage.email === userEmail);
            if (hasUsed) {
                return { valid: false, message: "You have already used this coupon" };
            }
        }

        let discountAmount = 0;
        if (coupon.type === "PERCENTAGE") {
            discountAmount = (cartTotal * coupon.value) / 100;
        } else {
            discountAmount = coupon.value;
        }

        // Ensure discount doesn't exceed total
        discountAmount = Math.min(discountAmount, cartTotal);

        return { 
            valid: true, 
            discountAmount, 
            message: "Coupon applied successfully",
            details: {
                code: coupon.code,
                type: coupon.type,
                value: coupon.value
            }
        };
    } catch (error) {
        console.error("Validate coupon error:", error);
        return { valid: false, message: "Error validating coupon" };
    }
}

export async function recordCouponUsage(code: string, userEmail: string, orderId: string, userId?: string) {
    try {
        await dbConnect();
        const coupon = await Coupon.findOne({ code: code.toUpperCase() });
        
        if (coupon) {
            coupon.usedCount += 1;
            coupon.usedBy.push({
                email: userEmail,
                orderId,
                userId: userId || null
            });
            await coupon.save();
        }
    } catch (error) {
        console.error("Record usage error:", error);
    }
}

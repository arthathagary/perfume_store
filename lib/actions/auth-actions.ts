"use server";

import dbConnect from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function registerCustomer(name: string, email: string, password: string) {
    try {
        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: "Email already registered. Please login or use a different email." };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new customer user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user" // Default to customer role
        });

        return {
            success: true,
            userId: newUser._id.toString(),
            user: JSON.parse(JSON.stringify(newUser))
        };
    } catch (error) {
        console.error("Registration failed:", error);
        return { success: false, error: "Failed to create account. Please try again." };
    }
}

import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function requestPasswordReset(email: string) {
    try {
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            // Return success even if user not found for security
            return { success: true };
        }

        // Generate token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 hour

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await user.save();

        await sendPasswordResetEmail(email, token);
        return { success: true };
    } catch (error) {
        console.error("Request password reset failed:", error);
        return { success: false, error: "Failed to process request" };
    }
}

export async function resetPassword(token: string, newPassword: string) {
    try {
        await dbConnect();
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return { success: false, error: "Invalid or expired token" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return { success: true };
    } catch (error) {
        console.error("Reset password failed:", error);
        return { success: false, error: "Failed to reset password" };
    }
}

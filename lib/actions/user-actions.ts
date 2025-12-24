"use server";

import dbConnect from "@/lib/db";
import { User } from "@/lib/models/User";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
    try {
        const session = await auth();
        if (!session?.user) return null;

        await dbConnect();
        const user = await User.findById(session.user.id);
        if (!user) return null;

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return null;
    }
}

export async function updateUserProfile(data: any) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Not authenticated" };
        }

        await dbConnect();

        // Remove sensitive fields
        delete data.password;
        delete data.role;
        delete data.email; // Prevent email change for now

        await User.findByIdAndUpdate(session.user.id, data);

        revalidatePath("/account");
        return { success: true };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

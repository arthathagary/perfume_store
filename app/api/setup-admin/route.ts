import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function GET() {
    try {
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@example.com" });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin account already exists." });
        }

        // Create new admin
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const adminUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
        });

        return NextResponse.json({
            success: true,
            message: "Admin account created successfully.",
            credentials: {
                email: "admin@example.com",
                password: "admin123"
            }
        });
    } catch (error) {
        console.error("Error seeding admin:", error);
        return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
    }
}

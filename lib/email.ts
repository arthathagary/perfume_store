import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOrderUpdateEmail(to: string, orderId: string, status: string, name: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`[Email Mock] To: ${to}, Config Status: User=${!!process.env.SMTP_USER}, Pass=${!!process.env.SMTP_PASS}`);
        console.log(`[Email Mock] Subject: Order #${orderId} Update, Status: ${status}`);
        return;
    }

    try {
        const subject = `Order Status Update: #${orderId.substring(0, 8)}`;
        const html = `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-weight: 300; letter-spacing: 1px;">LUXE SCENTS</h1>
                </div>
                <div style="padding: 30px;">
                    <p>Dear ${name},</p>
                    <p>The status of your order <strong>#${orderId.substring(0, 8)}</strong> has been updated to:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-radius: 4px; margin: 20px 0;">
                        <span style="font-size: 18px; font-weight: 600; text-transform: uppercase; color: #000;">${status}</span>
                    </div>
                    <p>Thank you for choosing Luxe Scents.</p>
                </div>
                <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                    &copy; ${new Date().getFullYear()} Luxe Scents. All rights reserved.
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Luxe Scents" <noreply@luxescents.com>',
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to} for order ${orderId}`);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

export async function sendPasswordResetEmail(to: string, token: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`[Email Mock] To: ${to}, Reset Token: ${token}`);
        return;
    }

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password/${token}`;

    try {
        const subject = "Reset your password";
        const html = `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-weight: 300; letter-spacing: 1px;">LUXE SCENTS</h1>
                </div>
                <div style="padding: 30px;">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to choose a new one:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">Reset Password</a>
                    </div>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Luxe Scents" <noreply@luxescents.com>',
            to,
            subject,
            html,
        });
        console.log(`Password reset email sent to ${to}`);
    } catch (error) {
        console.error("Failed to send reset email:", error);
    }
}

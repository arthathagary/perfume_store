"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { resetPassword } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle } from "lucide-react";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const { token } = params;
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setStatus("error");
            setErrorMessage("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setStatus("error");
            setErrorMessage("Password must be at least 6 characters");
            return;
        }

        setStatus("loading");

        try {
            const result = await resetPassword(token, newPassword);
            if (result.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Failed to reset password. Link may be expired.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-2xl font-light tracking-tight text-foreground">
                            Set New Password
                        </h2>
                    </div>

                    {status === "success" ? (
                        <div className="text-center space-y-4 animate-in fade-in duration-500">
                            <div className="flex justify-center">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium">Password Reset Successful</h3>
                            <p className="text-sm text-muted-foreground">
                                Your password has been updated. You can now log in with your new credentials.
                            </p>
                            <Link href="/login">
                                <Button className="mt-4 w-full">Go to Login</Button>
                            </Link>
                        </div>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4 rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="new-password" className="sr-only">New Password</label>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        required
                                        className="relative block w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        required
                                        className="relative block w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={status === "loading"}
                                    />
                                </div>
                            </div>

                            {status === "error" && (
                                <div className="text-sm text-red-500 text-center bg-red-50 py-2 rounded">
                                    {errorMessage}
                                </div>
                            )}

                            <div>
                                <Button
                                    type="submit"
                                    className="group relative flex w-full justify-center"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

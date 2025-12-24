"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { requestPasswordReset } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await requestPasswordReset(email);
            // Always show success for security
            setStatus("success");
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
                            Reset Password
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter your email to receive a reset link
                        </p>
                    </div>

                    {status === "success" ? (
                        <div className="text-center space-y-4 animate-in fade-in duration-500">
                            <div className="flex justify-center">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium">Check your email</h3>
                            <p className="text-sm text-muted-foreground">
                                We have sent a password reset link to <strong>{email}</strong>.
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="mt-4">Back to Login</Button>
                            </Link>
                        </div>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </Button>
                            </div>

                            <div className="text-center text-sm">
                                <Link href="/login" className="font-medium text-primary hover:text-primary/80 hover:underline">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

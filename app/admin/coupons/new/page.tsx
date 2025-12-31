"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCoupon } from "@/lib/actions/coupon-actions";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCouponForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const generateCode = (e: React.MouseEvent) => {
        e.preventDefault();
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        // Set the input value directly
        const codeInput = document.querySelector('input[name="code"]') as HTMLInputElement;
        if (codeInput) codeInput.value = randomCode;
    };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            code: formData.get("code") as string,
            type: formData.get("type") as "PERCENTAGE" | "FIXED",
            value: parseFloat(formData.get("value") as string),
            expirationDate: formData.get("expirationDate") ? new Date(formData.get("expirationDate") as string) : undefined,
            usageLimit: formData.get("usageLimit") ? parseInt(formData.get("usageLimit") as string) : undefined,
            perUserLimit: formData.get("perUserLimit") === "on",
        };

        const result = await createCoupon(data);

        if (result.success) {
            router.push("/admin/coupons");
            router.refresh();
        } else {
            alert(result.error || "Error creating coupon");
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
             <div className="flex items-center gap-4">
                <Link href="/admin/coupons">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-light tracking-tight">Create New Coupon</h1>
            </div>

            <form onSubmit={onSubmit} className="space-y-8 bg-background p-8 border border-border rounded-sm">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-border pb-2">Coupon Details</h3>
                    
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Coupon Code</label>
                        <div className="flex gap-2">
                            <input name="code" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground uppercase font-mono tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. SUMMER20" />
                            <Button type="button" variant="outline" onClick={generateCode} title="Generate Random Code">
                                <Wand2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Discount Type</label>
                            <select name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <option value="PERCENTAGE">Percentage (%)</option>
                                <option value="FIXED">Fixed Amount (LKR)</option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Discount Value</label>
                            <input name="value" type="number" min="0" step="0.01" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. 10 or 1000" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-border pb-2">Restrictions</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Expiration Date (Optional)</label>
                            <input name="expirationDate" type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                        </div>
                         <div className="grid gap-2">
                            <label className="text-sm font-medium">Global Usage Limit (Optional)</label>
                            <input name="usageLimit" type="number" min="1" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. 100" />
                            <p className="text-[10px] text-muted-foreground">First X users only.</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <input type="checkbox" name="perUserLimit" id="perUserLimit" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <label htmlFor="perUserLimit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Limit to one use per customer?
                        </label>
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Coupon
                    </Button>
                </div>
            </form>
        </div>
    );
}

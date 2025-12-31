import Link from "next/link";
import { Plus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoupons, deleteCoupon } from "@/lib/actions/coupon-actions";

export default async function CouponsPage() {
    const coupons = await getCoupons();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light tracking-tight">Coupons</h1>
                <Link href="/admin/coupons/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Create Coupon
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border border-border bg-background">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b border-border">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Code</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Discount</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Usage (Used/Limit)</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Expiry</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {coupons.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No coupons found. Create your first one.
                                    </td>
                                </tr>
                            ) : (
                                coupons.map((coupon: any) => (
                                    <tr key={coupon._id} className="border-b border-border transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            <div className="flex items-center gap-2">
                                                <Tag className="h-3 w-3 text-primary" />
                                                <span className="font-mono tracking-wider">{coupon.code}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {coupon.type === "PERCENTAGE" ? `${coupon.value}% OFF` : `Rs. ${coupon.value} OFF`}
                                        </td>
                                        <td className="p-4 align-middle">
                                            {coupon.usedCount} / {coupon.usageLimit || "∞"}
                                            {coupon.perUserLimit && <span className="ml-2 text-[10px] bg-secondary px-1 py-0.5 rounded">1/User</span>}
                                        </td>
                                        <td className="p-4 align-middle">
                                            {coupon.expirationDate ? new Date(coupon.expirationDate).toLocaleDateString() : "Never"}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <form action={async () => {
                                                "use server";
                                                await deleteCoupon(coupon._id);
                                            }}>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

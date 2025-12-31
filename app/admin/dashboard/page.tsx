import { auth } from "@/auth";

import { getDashboardStats } from "@/lib/actions/order-actions";
import { getProductCount } from "@/lib/actions/product-actions";
import { DollarSign, Package, ShoppingCart, Clock } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboard() {
    const session = await auth();
    const { totalOrders, pendingOrders, totalRevenue, recentOrders } = await getDashboardStats();
    const productCount = await getProductCount();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-light tracking-tight">Overview</h1>
                <p className="text-muted-foreground">
                    Welcome back, {session?.user?.name || "Admin"}. Here's what's happening today.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Revenue</h3>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                </div>
                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Orders</h3>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                </div>
                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Products</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{productCount}</div>
                </div>
                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pending</h3>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{pendingOrders}</div>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-background shadow-sm">
                <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">Recent Orders</h3>
                    <p className="text-sm text-muted-foreground">Latest transactions from the store.</p>
                </div>
                <div className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b border-border">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-6 align-middle font-medium text-muted-foreground">Order ID</th>
                                    <th className="h-12 px-6 align-middle font-medium text-muted-foreground">Customer</th>
                                    <th className="h-12 px-6 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-6 align-middle font-medium text-muted-foreground text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No recent orders.
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order: any) => (
                                        <tr key={order._id} className="border-b border-border transition-colors hover:bg-muted/50">
                                            <td className="p-6 align-middle font-medium">
                                                <Link href={`/admin/orders/${order._id}`} className="hover:underline">
                                                    #{order._id.substring(0, 8)}
                                                </Link>
                                            </td>
                                            <td className="p-6 align-middle">{order.customer.name}</td>
                                            <td className="p-6 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-6 align-middle text-right">{formatCurrency(order.total)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

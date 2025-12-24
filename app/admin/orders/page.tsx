import { getOrders } from "@/lib/actions/order-actions";

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light tracking-tight">Orders</h1>
            </div>

            <div className="rounded-md border border-border bg-background">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b border-border">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Order ID</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Customer</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order: { _id: string; customer: { name: string; email: string }; createdAt: string; status: string; total: number }) => (
                                    <tr key={order._id} className="border-b border-border transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            <a href={`/admin/orders/${order._id}`} className="hover:underline">
                                                #{order._id.substring(0, 8)}
                                            </a>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex flex-col">
                                                <span>{order.customer.name}</span>
                                                <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="p-4 align-middle text-right font-medium">
                                            ${order.total.toFixed(2)}
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

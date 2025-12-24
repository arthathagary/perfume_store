import { getOrderById } from "@/lib/actions/order-actions";
import { OrderStatusSelector } from "@/components/admin/OrderStatusSelector";
import { ArrowLeft, MapPin, Mail, Phone, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-light tracking-tight">Order #{order._id.substring(0, 8)}</h1>
                        <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Status:</span>
                    <OrderStatusSelector orderId={order._id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="border border-border rounded-sm bg-background p-6">
                        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Package className="h-4 w-4" /> Order Items
                        </h2>
                        <div className="space-y-4">
                            {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center py-3 border-b border-border/40 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-xs font-medium">
                                            {item.quantity}x
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">${item.price}</p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="pt-4 flex justify-between items-center font-medium text-lg border-t border-border">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="border border-border rounded-sm bg-background p-6">
                        <h2 className="text-lg font-medium mb-4">Customer Details</h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5"><div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-xs uppercase font-bold">{order.customer.name.charAt(0)}</div></div>
                                <div>
                                    <p className="font-medium">{order.customer.name}</p>
                                    <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-xs">
                                        <Mail className="h-3 w-3" /> {order.customer.email}
                                    </div>
                                    {order.customer.phone && (
                                        <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-xs">
                                            <Phone className="h-3 w-3" /> {order.customer.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-border rounded-sm bg-background p-6">
                        <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <p className="leading-relaxed">
                                {order.customer.address}
                            </p>
                        </div>
                    </div>
                    <div className="border border-border rounded-sm bg-background p-6">
                        <h2 className="text-lg font-medium mb-4">Payment</h2>
                        <div className="text-sm">
                            <p className="font-medium">Method: <span className="uppercase">{order.paymentMethod}</span></p>
                            <p className="text-muted-foreground mt-1">Payment Status: {order.status === 'pending' ? 'Pending' : 'Paid'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

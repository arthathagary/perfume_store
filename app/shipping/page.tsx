import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";

export default function ShippingPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-lg py-20 px-8">
                    <h1 className="text-3xl font-light tracking-tight mb-12 sm:text-4xl">Shipping Policy</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground font-light">
                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Delivery Areas</h3>
                        <p className="mb-4">
                            We act primarily within Sri Lanka and offer island-wide delivery to all districts.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Shipping Rates</h3>
                        <ul className="list-disc pl-5 mb-6 space-y-2">
                            <li><strong>Standard Shipping:</strong> A flat rate of Rs. 350.00 applies to all orders under Rs. 15,000.</li>
                            <li><strong>Free Shipping:</strong> We offer complimentary shipping on all orders over Rs. 15,000.</li>
                        </ul>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Delivery Time</h3>
                        <p className="mb-4">
                            Orders are usually dispatched within 1-2 business days.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-2">
                            <li><strong>Colombo & Suburbs:</strong> 1-3 business days.</li>
                            <li><strong>Outstation:</strong> 2-5 business days.</li>
                        </ul>
                        <p>
                            Please note that delivery times may be affected during holidays or extreme weather conditions.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Order Tracking</h3>
                        <p className="mb-4">
                            Once your order is shipped, you will receive a confirmation email/SMS with a tracking number to monitor your package's journey.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

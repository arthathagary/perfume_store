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
                        <p className="mb-6">
                            We offer complimentary standard shipping on all orders over $150.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Processing Time</h3>
                        <p className="mb-4">
                            All orders are processed within 2-4 business days. You will receive a confirmation email once your order has shipped.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">International Shipping</h3>
                        <p className="mb-4">
                            We currently ship to select countries. Please check availability at checkout. Note that customs duties and taxes are the responsibility of the customer.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

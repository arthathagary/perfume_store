import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-lg py-20 px-8">
                    <h1 className="text-3xl font-light tracking-tight mb-12 sm:text-4xl">Privacy Policy</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground font-light">
                        <p className="mb-4">Effective Date: December 31, 2025</p>
                        <p className="mb-6">
                            At Atelier Voile ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Information We Collect</h3>
                        <p className="mb-4">
                            When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number. We refer to this information as "Order Information".
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Payment Information</h3>
                        <p className="mb-4">
                            All online payments are processed through our secure third-party payment gateway. We do not store your full credit card details on our servers. Your payment data is encrypted and processed securely in compliance with PCI-DSS standards.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">How We Use Your Information</h3>
                        <p className="mb-4">
                            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-2">
                            <li>Communicate with you;</li>
                            <li>Screen our orders for potential risk or fraud; and</li>
                            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                        </ul>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Data Retention</h3>
                        <p className="mb-4">
                            When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Contact Us</h3>
                        <p className="mb-4">
                            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@ateliervoile.com.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

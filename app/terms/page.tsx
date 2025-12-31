import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-lg py-20 px-8">
                    <h1 className="text-3xl font-light tracking-tight mb-12 sm:text-4xl">Terms of Service</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground font-light">
                        <p className="mb-6">
                            This website is operated by Atelier Voile. Throughout the site, the terms "we", "us" and "our" refer to Atelier Voile. Atelier Voile offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">1. General Conditions</h3>
                        <p className="mb-4">
                            We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">2. Products and Services</h3>
                        <p className="mb-4">
                            We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">3. Pricing and Payment</h3>
                        <p className="mb-4">
                            Prices for our products are subject to change without notice. All prices are listed in Sri Lankan Rupees (LKR). We accept payments via Visa, MasterCard, and other methods supported by our payment gateway. Full payment is due upon order placement.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">4. Shipping and Delivery</h3>
                        <p className="mb-4">
                            We deliver island-wide in Sri Lanka. Delivery times may vary depending on your location. We are not liable for any delays caused by courier services or unforeseen circumstances.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">5. Return and Refund Policy</h3>
                        <p className="mb-4">
                            Due to the nature of our products (fragrances), we generally do not accept returns once the product has been opened or used, for hygiene reasons.
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-2">
                            <li><strong>Damaged Items:</strong> If you receive a damaged or incorrect item, please contact us within 24 hours of delivery with photographic evidence. We will arrange a replacement.</li>
                            <li><strong>Cancellations:</strong> Orders can be cancelled within 12 hours of placement if they have not yet been dispatched. Once dispatched, orders cannot be cancelled.</li>
                        </ul>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">6. Governing Law</h3>
                        <p className="mb-4">
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Sri Lanka.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Content Ownership</h3>
                        <p className="mb-4">
                            All content included on this site, such as text, graphics, logos, images, is the property of Atelier Voile or its content suppliers and protected by international copyright laws.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

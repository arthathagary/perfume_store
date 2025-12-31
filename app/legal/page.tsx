import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";

export default function LegalPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-lg py-20 px-8">
                    <h1 className="text-3xl font-light tracking-tight mb-12 sm:text-4xl">Legal & Privacy</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground font-light">
                        <section className="mb-10">
                            <h2 className="text-xl font-medium text-foreground mb-4">Terms of Service</h2>
                            <p className="mb-4">
                                Welcome to Atelier Voile. By accessing our website, you agree to these terms. We reserve the right to modify these terms at any time.
                            </p>
                            <p>
                                All content on this site, including images and text, is the property of Atelier Voile and may not be used without permission.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-medium text-foreground mb-4">Privacy Policy</h2>
                            <p className="mb-4">
                                We respect your privacy. We only collect information necessary to process your orders and improve your experience. We do not sell your data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium text-foreground mb-4">Returns & Refunds</h2>
                            <p className="mb-4">
                                Due to the nature of our products, we cannot accept returns on opened perfume bottles. Unopened items may be returned within 14 days of delivery.
                            </p>
                            <p>
                                If your item arrives damaged, please contact us immediately for a replacement.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

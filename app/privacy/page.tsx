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
                        <p className="mb-4">Effective Date: December 24, 2025</p>
                        <p className="mb-6">
                            Your privacy is critically important to us. At LUXE SCENTS, we have a few fundamental principles:
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-2">
                            <li>We don’t ask you for personal information unless we truly need it.</li>
                            <li>We don’t share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
                            <li>We don’t store personal information on our servers unless required for the on-going operation of one of our services.</li>
                        </ul>
                        <p>
                            Checks regarding payment details are processed securely and we do not store full credit card numbers.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

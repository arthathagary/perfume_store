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
                            By using our website, you agree to be bound by these Terms of Service and to use the site in accordance with these Terms, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-8 mb-4">Content Ownership</h3>
                        <p className="mb-4">
                            All content included on this site, such as text, graphics, logos, images, is the property of LUXE SCENTS or its content suppliers and protected by international copyright laws.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

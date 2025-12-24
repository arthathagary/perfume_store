import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-screen-lg py-20 px-8">
                    <h1 className="text-4xl font-light tracking-tight mb-8 text-center sm:text-5xl">Our Story</h1>

                    <div className="prose prose-stone dark:prose-invert mx-auto text-lg leading-relaxed text-muted-foreground font-light">
                        <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-1 first-letter:float-left first-letter:text-foreground">
                            Founded in the heart of Grasse, LUXE SCENTS was born from a desire to return to the roots of perfumery: patience, precision, and passion. We reject the modern rush of mass production, choosing instead to honor the slow art of maceration.
                        </p>
                        <p className="mb-6">
                            Each bottle is a testament to the finest ingredients sourced from sustainable farms across the globe. From the rare Iris of Florence to the deep, resinous Oud of Cambodia, our materials are selected not for their cost, but for their character.
                        </p>
                        <p>
                            We invite you to discover a scent that doesn&apos;t just linger on the room, but lingers in the memory.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div className="p-6 bg-secondary/20 rounded-sm">
                            <h3 className="text-xl font-medium mb-2 text-foreground">Handcrafted</h3>
                            <p className="text-sm">Small batch production ensures uncompromising quality.</p>
                        </div>
                        <div className="p-6 bg-secondary/20 rounded-sm">
                            <h3 className="text-xl font-medium mb-2 text-foreground">Sustainable</h3>
                            <p className="text-sm">Ethically sourced ingredients and eco-conscious packaging.</p>
                        </div>
                        <div className="p-6 bg-secondary/20 rounded-sm">
                            <h3 className="text-xl font-medium mb-2 text-foreground">Timeless</h3>
                            <p className="text-sm">Scents designed to transcend fleeting trends.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/actions/product-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Products | Atelier Voile",
    description: "Browse our complete collection of luxury fragrances.",
};

export const dynamic = "force-dynamic";

export default async function CollectionsAllPage() {
    const products = await getProducts();

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 bg-background">
                <div className="container mx-auto px-4 py-16 sm:py-24 max-w-screen-2xl">
                    <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                        <h1 className="text-4xl font-light tracking-tight sm:text-5xl text-foreground">
                            All Collections
                        </h1>
                        <p className="max-w-xl text-muted-foreground font-light text-lg">
                            Every scent in our repertoire, available for your discovery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.length === 0 ? (
                            <p className="col-span-full text-center text-muted-foreground">No products found.</p>
                        ) : (
                            products.map((product: any) => (
                                <ProductCard
                                    key={product._id}
                                    product={{
                                        id: product._id.toString(),
                                        name: product.name,
                                        price: product.price,
                                        category: product.category,
                                        image: product.images?.[0]
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/Product";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import { Metadata } from "next";

async function getProduct(id: string) {
    try {
        await dbConnect();
        const product = await Product.findById(id);
        if (!product) return null;
        return JSON.parse(JSON.stringify(product));
    } catch (e) {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | LUXE SCENTS`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return notFound();
    }

    return <ProductDetailClient product={product} />;
}

import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/actions/product-actions';

// Base URL (replace with actual domain in production)
const BASE_URL = 'https://luxe-scents.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch dynamic routes
    const products = await getProducts();

    const productEntries: MetadataRoute.Sitemap = products.map((product: any) => ({
        url: `${BASE_URL}/products/${product._id}`,
        lastModified: new Date(product.updatedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Static routes
    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/legal`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    return [...staticEntries, ...productEntries];
}

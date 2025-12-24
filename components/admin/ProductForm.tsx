"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
    initialData?: any; // Using any for simplicity with mongoose doc, strictly should be typed
    isEdit?: boolean;
}

export function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: parseFloat(formData.get("price") as string),
            category: formData.get("category") as string,
            notes: {
                top: formData.get("notes.top") as string,
                heart: formData.get("notes.heart") as string,
                base: formData.get("notes.base") as string,
            },
            details: {
                longevity: formData.get("details.longevity") as string,
                sillage: formData.get("details.sillage") as string,
                concentration: formData.get("details.concentration") as string,
            },
            images: formData.get("imageUrl") ? [formData.get("imageUrl") as string] : [],
        };

        let result;
        if (isEdit && initialData?._id) {
            result = await updateProduct(initialData._id, data);
        } else {
            result = await createProduct(data);
        }

        if (result.success) {
            router.push("/admin/products");
            router.refresh();
        } else {
            alert(isEdit ? "Error updating product" : "Error creating product");
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 bg-background p-8 border border-border rounded-sm">
            <div className="space-y-4">
                <h3 className="text-lg font-medium border-b border-border pb-2">Basic Info</h3>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Product Name</label>
                    <input name="name" defaultValue={initialData?.name} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. Midnight Saffron" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Price ($)</label>
                        <input name="price" defaultValue={initialData?.price} type="number" step="0.01" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Category</label>
                        <select name="category" defaultValue={initialData?.category} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option value="Eau de Parfum">Eau de Parfum</option>
                            <option value="Extrait de Parfum">Extrait de Parfum</option>
                            <option value="Eau de Toilette">Eau de Toilette</option>
                            <option value="Gift Set">Gift Set</option>
                            <option value="Set">Set</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea name="description" defaultValue={initialData?.description} required className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Product description..." />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium border-b border-border pb-2">Fragrance Profile</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Top Notes</label>
                        <input name="notes.top" defaultValue={initialData?.notes?.top} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. Bergamot" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Heart Notes</label>
                        <input name="notes.heart" defaultValue={initialData?.notes?.heart} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. Jasmine" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Base Notes</label>
                        <input name="notes.base" defaultValue={initialData?.notes?.base} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. Oud" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium border-b border-border pb-2">Technical Details</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Longevity</label>
                        <input name="details.longevity" defaultValue={initialData?.details?.longevity || "10-12 Hours"} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Sillage</label>
                        <input name="details.sillage" defaultValue={initialData?.details?.sillage || "Heavy"} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Concentration</label>
                        <input name="details.concentration" defaultValue={initialData?.details?.concentration || "Eau de Parfum"} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium border-b border-border pb-2">Media</h3>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <input name="imageUrl" defaultValue={initialData?.images?.[0]} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">Provide a direct link to the product image.</p>
                </div>
            </div>

            <div className="pt-4">
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEdit ? "Update Product" : "Create Product"}
                </Button>
            </div>
        </form>
    );
}

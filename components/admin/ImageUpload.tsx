"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Check } from "lucide-react";
import Image from "next/image";

// We need the hooks to upload programmatically
const { useUploadThing: useUploadThingHook } = generateReactHelpers<OurFileRouter>();

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: (url: string) => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);
    
    // Uploadthing hook
    const { startUpload, isUploading } = useUploadThingHook("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res && res[0]) {
                onChange(res[0].url);
                setIsCropping(false);
                setImageSrc(null); // Reset local preview
            }
        },
        onUploadError: (error: Error) => {
            alert(`ERROR! ${error.message}`);
        },
    });

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl as string);
            setIsCropping(true);
        }
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new window.Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: any
    ): Promise<Blob | null> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        // set canvas size to match the bounding box
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // draw image
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, "image/jpeg", 0.95); // High quality
        });
    };

    const onUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedImageBlob) {
                // Determine file extension
                // const fileExt = "jpeg"; 
                // Create a File object from the Blob
                const file = new File([croppedImageBlob], "product-image.jpg", { type: "image/jpeg" });
                
                await startUpload([file]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-4">
            {/* Display existing image */}
            {value && !isCropping && (
                <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-border group">
                    <div className="absolute top-2 right-2 z-10 transition-opacity">
                        <Button 
                            type="button" 
                            onClick={() => onRemove(value)} 
                            size="icon" 
                            className="h-6 w-6 rounded-full bg-white text-black hover:bg-white/80 shadow-md"
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                    <Image fill src={value} alt="Product" className="object-cover" />
                </div>
            )}

            {/* Cropper UI */}
            {isCropping && imageSrc && (
                <div className="relative w-full h-[400px] bg-black/5 rounded-md overflow-hidden border border-border">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1} // Square for product images usually
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            )}

            {/* Controls */}
            {isCropping && (
                <div className="flex items-center gap-4">
                     <div className="flex-1">
                        <label className="text-xs">Zoom</label>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                     </div>
                     <div className="flex gap-2">
                         <Button type="button" variant="outline" onClick={() => { setIsCropping(false); setImageSrc(null); }}>
                             Cancel
                         </Button>
                         <Button type="button" onClick={onUpload} disabled={isUploading}>
                             {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                             Upload
                         </Button>
                     </div>
                </div>
            )}

            {/* File Input */}
            {!isCropping && !value && (
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors border-border">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>
            )}
        </div>
    );
}

function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

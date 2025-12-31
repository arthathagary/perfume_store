import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDirectImageUrl(url: string | undefined): string {
  if (!url) return "/bottle-placeholder.svg"; // Use existing SVG

  // Check if it's a Google Drive URL
  if (url.includes("drive.google.com") && url.includes("/view")) {
    // Extract ID
    const idMatch = url.match(/\/d\/(.*?)\/view/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }
  }

  return url;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2
  }).format(amount).replace('LKR', 'Rs.');
}

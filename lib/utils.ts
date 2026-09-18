import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToman(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

// Maps a painting id to its CSS gradient class defined in globals.css
export function paintingClass(id: string): string {
  const map: Record<string, string> = {
    "starry-night": "art-starry-night",
    "the-scream": "art-the-scream",
    "girl-pearl": "art-girl-pearl",
    "mona-lisa": "art-mona-lisa",
  };
  return map[id] ?? "art-starry-night";
}

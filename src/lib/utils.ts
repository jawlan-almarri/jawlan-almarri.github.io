import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-friendly className helper.
 *
 * - `clsx` handles conditional joining.
 * - `tailwind-merge` deduplicates conflicting Tailwind classes.
 *
 * Example:
 * cn("px-2", isActive && "bg-white", "px-3") -> "bg-white px-3"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


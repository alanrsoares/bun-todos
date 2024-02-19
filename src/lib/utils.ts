import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS classnames combiner
 * @param inputs
 * @returns Tailwind CSS classnames
 *
 * @example
 * ```ts
 * import { cn } from "@axelarjs/ui";
 *
 * const className = cn("text-red-500", "bg-blue-500");
 * // className = "text-red-500 bg-blue-500"
 * ```
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Delays the execution of the next line of code
 *
 * @param ms {number} - milliseconds
 * @returns Promise
 *
 * @example
 * ```ts
 * import { delay } from "@axelarjs/ui";
 *
 * async function example() {
 *   console.log("Hello");
 *   await delay(1000);
 *   console.log("World");
 * }
 * ```
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

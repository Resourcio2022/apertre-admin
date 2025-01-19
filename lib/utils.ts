import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Status } from "./types";
import { cache } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function getStatus() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/common/status`, {
      headers: {
        username: process.env.NEXT_PUBLIC_APERTRE_ADMIN_USERNAME as string,
        password: process.env.NEXT_PUBLIC_APERTRE_ADMIN_PASSWORD as string,
      },
    });
    const data = await res.json();
    return data as Status[];
  }
  catch (error) {
    console.error("Failed to fetch status options:", error);
    return [];
  }
}

export const getStatusOptions = cache(getStatus);

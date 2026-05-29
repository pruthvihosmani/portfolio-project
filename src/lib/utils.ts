import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resumeHref(profile: { resumeFileUrl?: string; resumeUrl?: string }) {
  return profile.resumeFileUrl || profile.resumeUrl || "/pruthvi-hosamani-resume.pdf";
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { skillLevel } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLevelColor = (level: skillLevel) => {
  switch (level) {
    case "Beginner":
      return "bg-blue-500";
    case "Intermediate":
      return "bg-green-500";
    case "Advanced":
      return "bg-purple-500";
    case "Expert":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

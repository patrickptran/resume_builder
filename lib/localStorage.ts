import { ResumeData } from "./types";

const STORAGE_KEY = "resume-data";

export const loadFromLocalStorage = (): Partial<ResumeData> => {
  if (typeof window === "undefined") return {}; // Ensure we're in a browser environment
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return {};
  }
};

export const saveToLocalStorage = (data: Partial<ResumeData>) => {
  if (typeof window === "undefined") return; // Ensure we're in a browser environment

  const existingData = loadFromLocalStorage();
  const newData = {
    ...existingData,
    ...data,
    lastSaved: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

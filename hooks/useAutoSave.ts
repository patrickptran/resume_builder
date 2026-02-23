"use client";
import { useState, useEffect, useRef } from "react";
import { useToast } from "./use-toast";
import { useDebouncedCallback } from "use-debounce";
import { saveToLocalStorage } from "@/lib/localStorage";
import { ResumeData } from "@/lib/types";

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
}

export const useAutoSave = <T extends object>(
  data: T,
  key: keyof ResumeData,
  isEnabled: boolean = true,
): AutoSaveState => {
  const [isSaving, setIsSaving] = useState(false); // use to track if auto-saving is in progress, block multiple saves at the same time

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  const previousDataRef = useRef<T>(null);

  // check if data has changed
  const hasDataChanged = (newdata: T): boolean => {
    if (!previousDataRef.current) return true; // First time, consider it changed
    return JSON.stringify(previousDataRef.current) !== JSON.stringify(newdata);
  };

  const debouncedSave = useDebouncedCallback((newData: T) => {
    if (!isEnabled || !Object.keys(newData).length) return;

    // Save to localStorage
    if (!hasDataChanged(newData)) return; // No changes, skip saving
    setIsSaving(true);

    try {
      saveToLocalStorage({ [key]: newData } as Partial<ResumeData>);
      window.dispatchEvent(new Event("Storage")); // Notify other tabs
      setLastSaved(new Date());
      previousDataRef.current = newData; // Update previous data reference
      toast({
        description: "Auto-saved successfully",
        duration: 3000, // Show toast for 3 seconds
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Auto-save failed",
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }, 500); // Debounce delay of 500ms

  useEffect(() => {
    if (isEnabled) {
      debouncedSave(data);
    }
  }, [data, isEnabled, debouncedSave]);
  return {
    isSaving,
    lastSaved,
  };
};

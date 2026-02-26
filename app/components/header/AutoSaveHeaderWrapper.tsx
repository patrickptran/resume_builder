"use client";
import { useState, useEffect } from "react";
import { AutoSaveHeader } from "./AutoSaveHeader";
import { useAutoSaveContext } from "@/context/AutoSaveContext";

export const AutoSaveHeaderWrapper: React.FC = () => {
  const { isAutoSaveEnabled, setAutoSaveEnabled } = useAutoSaveContext();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const handleStorage = () => {
      setLastSaved(new Date());
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <AutoSaveHeader
      isAutoSaveEnabled={isAutoSaveEnabled}
      isSaving={isSaving}
      onAutoSaveChange={setAutoSaveEnabled}
      lastSaved={lastSaved}
    />
  );
};

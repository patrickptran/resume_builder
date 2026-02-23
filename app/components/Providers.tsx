"use client";

import { ReactNode } from "react";
import { AutoSaveProvider } from "@/context/AutoSaveContext";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AutoSaveProvider>
      {children}
      <Toaster />
    </AutoSaveProvider>
  );
};

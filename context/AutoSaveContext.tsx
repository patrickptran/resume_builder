"use client";

import { createContext, useContext, useState } from "react";

interface AutoSaveContextType {
  isAutoSaveEnabled: boolean;
  setAutoSaveEnabled: (enabled: boolean) => void;
}

const AutoSaveContext = createContext<AutoSaveContextType | undefined>(
  undefined,
);

export const AutoSaveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAutoSavedEnabled, setAutoSaveEnabled] = useState(false);

  return (
    <AutoSaveContext.Provider
      value={{ isAutoSaveEnabled: isAutoSavedEnabled, setAutoSaveEnabled }}
    >
      {children}
    </AutoSaveContext.Provider>
  );
};

export const useAutoSaveContext = () => {
  const context = useContext(AutoSaveContext);
  if (context === undefined) {
    throw new Error(
      "useAutoSaveContext must be used within an AutoSaveProvider",
    );
  }
  return context;
};

"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface AutoSaveHeaderProps {
  isAutoSaveEnabled: boolean;
  isSaving: boolean;
  onAutoSaveChange: (enabled: boolean) => void;
  lastSaved: Date | null;
}

export const AutoSaveHeader: React.FC<AutoSaveHeaderProps> = ({
  isAutoSaveEnabled,
  isSaving,
  onAutoSaveChange,
  lastSaved,
}) => {
  return (
    <div className="border-b">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-save"
                checked={isAutoSaveEnabled}
                onCheckedChange={onAutoSaveChange}
              />
              <Label htmlFor="auto-save" className="text-sm">
                Auto-save
              </Label>
            </div>

            {isSaving && <Loader2 className="animate-spin" />}
            {lastSaved && (
              <span className="text-sm text-muted-foreground">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

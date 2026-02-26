"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  professtionalSummarySchema,
  type ProfessionalSummary as ProfessionalSummaryType,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";

export const ProfessionalSummary = () => {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<ProfessionalSummaryType>({
    resolver: zodResolver(professtionalSummarySchema),
    defaultValues: loadFromLocalStorage().professionalSummary,
  });

  const formData = watch();
  useAutoSave(formData, "professionalSummary", isAutoSaveEnabled);
  //character count for textarea
  const characterCount = formData.summary ? formData.summary.length : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary">
            Tell me about your career and professional background...
          </Label>
          <Textarea
            id="summary"
            {...register("summary")}
            placeholder="A software engineer with 5+ years of experience in building scalable web applications..."
            className="min-h-[150px] resize-none"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              {errors.summary && (
                <p className="text-red-500">{errors.summary.message}</p>
              )}
            </div>
            <div>{characterCount}/500</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

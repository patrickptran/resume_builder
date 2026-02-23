"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  educationSchema,
  type Education,
  type EducationItem,
} from "@/app/schemas/resume";

import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { EducationItem as EducationCard } from "./EducationItem";
import { EducationDialog } from "./EducationDialog";

export const Education = () => {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<EducationItem | null>(null);

  const { watch, setValue } = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: loadFromLocalStorage().education || { education: [] },
  });

  const education = watch("education");
  useAutoSave({ education }, "education", isAutoSaveEnabled);
  const handleAdd = () => {
    setEditingEducation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (education: EducationItem) => {
    setEditingEducation(education);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setValue(
      "education",
      education.filter((item) => item.id !== id),
      { shouldDirty: true },
    );
  };

  const handleSave = (educationItem: EducationItem) => {
    if (editingEducation) {
      // Update existing item
      setValue(
        "education",
        education.map((item) =>
          item.id === educationItem.id ? educationItem : item,
        ),
        { shouldDirty: true },
      );
    } else {
      // Add new item
      setValue("education", [...education, educationItem], {
        shouldDirty: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No education added yet. Click the button above to add your
              education background.
            </p>
          ) : (
            education.map((item) => (
              <EducationCard
                key={item.id}
                education={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <EducationDialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        onSave={handleSave}
        education={editingEducation}
      />
    </>
  );
};

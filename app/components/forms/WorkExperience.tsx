"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  workExperienceSchema,
  type WorkExperience as WorkExperienceType,
  type WorkExperienceItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { WorkExperienceDialog } from "./WordExperienceDialog";
import { WorkExperienceItem as ExperienceCard } from "./WorkExperienceItem";

export const WorkExperience = () => {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<WorkExperienceItem | null>(null);

  const { setValue, watch } = useForm<WorkExperienceType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: loadFromLocalStorage().workExperience || { experiences: [] },
  });

  const experiences = watch("experiences");
  useAutoSave({ experiences }, "workExperience", isAutoSaveEnabled);
  const handleAdd = () => {
    setEditingExperience(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (experience: WorkExperienceItem) => {
    setEditingExperience(experience);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setValue("experiences", updatedExperiences, { shouldDirty: true });
  };
  const handleSave = (experience: WorkExperienceItem) => {
    if (editingExperience) {
      const updatedExperiences = experiences.map((exp) => {
        if (exp.id === experience.id) {
          return experience;
        }
        return exp;
      });
      setValue("experiences", updatedExperiences, { shouldDirty: true });
    } else {
      setValue("experiences", [...experiences, experience], {
        shouldDirty: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl">Work Experience</CardTitle>
          <Button onClick={handleAdd} className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={() => handleEdit(experience)}
                onDelete={() => handleDelete(experience.id)}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No work experience added yet.
            </p>
          )}
          <Button onClick={handleAdd} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardContent>
      </Card>
      <WorkExperienceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        experience={editingExperience}
      />
    </>
  );
};

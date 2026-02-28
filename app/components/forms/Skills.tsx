"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  skillsSchema,
  type Skills as SkillsType,
  type SkillItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { SkillItem as SkillCard } from "./SkillItem";
import { SkillDialog } from "./SkillDialog";

export const Skills = () => {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, SetIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  const { watch, setValue } = useForm<SkillsType>({
    resolver: zodResolver(skillsSchema),
    defaultValues: loadFromLocalStorage().skills || { skills: [] },
  });
  const skills = watch("skills");
  useAutoSave({ skills }, "skills", isAutoSaveEnabled);

  const handleAdd = () => {
    setEditingSkill(null);
    SetIsDialogOpen(true);
  };

  const handleEdit = (project: SkillItem) => {
    setEditingSkill(project);
    SetIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setValue(
      "skills",
      skills.filter((skill) => skill.id !== id),
      { shouldDirty: true },
    );
  };

  const handleSave = (skillItem: SkillItem) => {
    if (editingSkill) {
      // edit existing project
      setValue(
        "skills",
        skills.map((skill) => (skill.id === skillItem.id ? skillItem : skill)),
        { shouldDirty: true },
      );
    } else {
      // add new value
      setValue("skills", [...skills, skillItem], { shouldDirty: true });
    }
    SetIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No skills added yet
            </p>
          ) : (
            skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={() => handleEdit(skill)}
                onDelete={() => handleDelete(skill.id)}
              ></SkillCard>
            ))
          )}
        </CardContent>
      </Card>

      <SkillDialog
        open={isDialogOpen}
        onOpenChange={SetIsDialogOpen}
        skill={editingSkill}
        onSave={handleSave}
      />
    </>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  projectsSchema,
  type Projects as ProjectsType,
  type ProjectItem,
} from "@/app/schemas/resume";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAutoSaveContext } from "@/context/AutoSaveContext";
import { ProjectItem as ProjectCard } from "./ProjectItem";
import { ProjectDialog } from "./ProjectDialog";

export const Projects = () => {
  const { isAutoSaveEnabled } = useAutoSaveContext();
  const [isDialogOpen, SetIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(
    null,
  );

  const { watch, setValue } = useForm<ProjectsType>({
    resolver: zodResolver(projectsSchema),
    defaultValues: loadFromLocalStorage().projects || { projects: [] },
  });
  const projects = watch("projects");

  useAutoSave({ projects }, "projects", isAutoSaveEnabled);

  const handleAdd = () => {
    setEditingProject(null);
    SetIsDialogOpen(true);
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingProject(project);
    SetIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setValue(
      "projects",
      projects.filter((project) => project.id !== id),
      { shouldDirty: true },
    );
  };

  const handleSave = (projectItem: ProjectItem) => {
    if (editingProject) {
      // edit existing project
      setValue(
        "projects",
        projects.map((project) =>
          project.id === projectItem.id ? projectItem : project,
        ),
        { shouldDirty: true },
      );
    } else {
      // add new value
      setValue("projects", [...projects, projectItem], { shouldDirty: true });
    }
    SetIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No project added yet. Click the button above to add your projects.
            </p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => handleEdit(project)}
                onDelete={() => handleDelete(project.id)}
              ></ProjectCard>
            ))
          )}
        </CardContent>
      </Card>

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={SetIsDialogOpen}
        project={editingProject}
        onSave={handleSave}
      />
    </>
  );
};

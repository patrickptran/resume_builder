"use client";

import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { skillItemSchema, type SkillItem } from "@/app/schemas/resume";

interface SkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: SkillItem | null;
  onSave: (skill: SkillItem) => void;
}

const skillCategories = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Cloud Services",
  "Tools & DevOps",
  "Soft Skills",
  "Languages",
  "Other",
];

const skillLevels = ["Beginer", "Intermediate", "Advanced", "Expert"] as const;

export const SkillDialog = ({
  open,
  onOpenChange,
  skill,
  onSave,
}: SkillsDialogProps) => {
  const form = useForm<SkillItem, any, SkillItem>({
    // the resolver has a typing mismatch with zod; casting to any keeps
    // the compiler happy while we still get runtime validation
    resolver: zodResolver(skillItemSchema) as unknown as Resolver<SkillItem>,
    defaultValues: {
      id: "",
      name: "",
      level: "Beginner",
      category: skillCategories[0],
    },
  });

  useEffect(() => {
    if (skill) {
      form.reset(skill);
    } else {
      form.reset({
        id: uuidv4(),
        name: "",
        level: "Beginner",
        category: skillCategories[0],
      });
    }
  }, [skill, form]);

  const onSubmit = (values: SkillItem) => {
    onSave(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skill name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

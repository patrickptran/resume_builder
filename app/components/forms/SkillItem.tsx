"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type SkillItem as SkillItemType } from "@/app/schemas/resume";
import { skillLevel } from "@/lib/types";

interface SkillItemProps {
  skill: SkillItemType;
  onEdit: () => void;
  ondelete: () => void;
}

export const SkillItem = ({ skill, onEdit, onDelete }: SkillItemProps) => {
  const getLevelColor = (level: skillLevel) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500";
      case "Intermediate":
        return "bg-green-500";
      case "Advanced":
        return "bg-purple-500";
      case "Expert":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <div className="dlex items-center gap-2">
            <h4 className="font-medium">{skill.name}</h4>
            <Badge variant="secondary">{skill.category}</Badge>
            <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

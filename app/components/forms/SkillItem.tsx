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
import { getLevelColor } from "@/lib/utils";

interface SkillItemProps {
  skill: SkillItemType;
  onEdit: () => void;
  onDelete: () => void;
}

export const SkillItem = ({ skill, onEdit, onDelete }: SkillItemProps) => {
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

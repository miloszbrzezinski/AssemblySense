"use client";

import { CheckSquare, Crown, Flag, Plus, ShipWheel, Users } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  AssemblyGroupWithProcesses,
  ProjectMemberWithProfile,
  WokrspaceMemberWithData,
} from "@/types";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProjectIssue } from "@prisma/client";
import { DonutGraph } from "./donut-graph";
import { StatusItem } from "./implementation/status-item";

interface ProjectTasksCardProps {
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectProblems: ProjectIssue[];
}

export const ProjectTasksCard = ({
  assemblyGroups,
  projectProblems,
}: ProjectTasksCardProps) => {
  const { onOpen } = useModal();

  return (
    <DashboardCard icon={<CheckSquare strokeWidth={1} />} title="Project tasks">
      <div className="bg-stone-700/60 space-y-[0.5px]">
        <StatusItem group={null} projectProblems={projectProblems} />
        {assemblyGroups.map((group) => (
          <StatusItem
            key={group.id}
            group={group}
            projectProblems={projectProblems}
          />
        ))}
      </div>
    </DashboardCard>
  );
};

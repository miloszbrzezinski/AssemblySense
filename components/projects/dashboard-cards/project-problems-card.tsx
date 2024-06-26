"use client";

import { Crown, Flag, Plus, ShipWheel, Users } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { Button } from "../../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  AssemblyGroupWithProcesses,
  ProjectMemberWithProfile,
  WokrspaceMemberWithData,
} from "@/types";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProjectIssue } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ProjectProblemsCardProps {
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectProblems: ProjectIssue[];
}

export const ProjectProblemsCard = ({
  workspaceId,
  projectId,
  assemblyGroups,
  projectProblems,
}: ProjectProblemsCardProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const displayedProblems = projectProblems.filter(
    (problem) => !problem.solved
  );

  return (
    <DashboardCard icon={<Flag strokeWidth={1} />} title="Project problems">
      <div className="bg-red-700/60 space-y-[0.5px]">
        {displayedProblems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => {
              router.push(
                `/workspace/${workspaceId}/projects/${projectId}/implementation/issues/${problem.id}`
              );
            }}
            className="w-full bg-white dark:bg-neutral-950 p-2 select-none hover:bg-red-50/90"
          >
            <h2 className="text-lg">
              <span className="font-medium text-red-600 dark:text-red-500 px-2 select-none">
                {"!".repeat(problem.priority)}
              </span>
              <span>{problem.name}</span>
            </h2>
            <p className="text-red-900 dark:text-red-600 pl-7">
              {problem.description}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

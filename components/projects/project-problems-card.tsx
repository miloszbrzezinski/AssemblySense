"use client";

import { Crown, Flag, Plus, ShipWheel, Users } from "lucide-react";
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

interface ProjectProblemsCardProps {
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectProblems: ProjectIssue[];
}

export const ProjectProblemsCard = ({
  assemblyGroups,
  projectProblems,
}: ProjectProblemsCardProps) => {
  const { onOpen } = useModal();

  return (
    <DashboardCard icon={<Flag strokeWidth={1} />} title="Project problems">
      <div className="bg-red-700/60 space-y-[0.5px]">
        {projectProblems.map((problem) => (
          <div
            key={problem.id}
            className="w-full h-20 bg-white p-2 select-none hover:bg-red-50/90"
          >
            <h2 className="text-lg">{problem.name}</h2>
            <p className="text-red-900">{problem.description}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

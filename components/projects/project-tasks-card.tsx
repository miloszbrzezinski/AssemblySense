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
        <div className="flex items-center justify-between w-full bg-white p-2 select-none hover:bg-slate-50">
          <div>
            <h2 className="text-xl">General</h2>
            <p className="text-stone-900">
              Tasks: <span className="text-lg font-medium">- / -</span>
            </p>
            <p className="text-red-900">
              Problems: <span className="text-lg font-medium">-</span>
            </p>
          </div>
          <DonutGraph tasksDone={20} problems={3} total={30} />
        </div>
        {assemblyGroups.map((group) => (
          <div className="flex items-center justify-between w-full bg-white p-2 select-none hover:bg-slate-50">
            <div>
              <h2 className="text-xl">{group.name}</h2>
              <p className="text-stone-900">
                Tasks: <span className="text-lg font-medium">- / -</span>
              </p>
              <p className="text-red-900">
                Problems: <span className="text-lg font-medium">-</span>
              </p>
            </div>
            <DonutGraph tasksDone={20} problems={3} total={30} />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

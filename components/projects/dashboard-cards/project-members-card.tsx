"use client";

import { Crown, Plus, ShipWheel, Users } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { Button } from "../../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProjectMemberItem } from "../project-member-item";
import { useRouter } from "next/navigation";

interface ProjectMembersCardProps {
  projectMembers: ProjectMemberWithProfile[];
}

export const ProjectMembersCard = ({
  projectMembers,
}: ProjectMembersCardProps) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const projectLeaders = projectMembers.filter((member) => member.isLeader);

  return (
    <DashboardCard icon={<Users strokeWidth={1} />} title="Leaders">
      <div className="bg-stone-300 dark:bg-neutral-800 space-y-[1px]">
        {projectLeaders.length === 0 && (
          <div className="bg-white dark:bg-neutral-950 text-center justify-center h-full flex flex-col py-10 text-2xl font-light">
            <p>No project leaders</p>
            <button
              onClick={() => {
                router.push("settings/members");
              }}
              className="underline text-lg"
            >
              add here
            </button>
          </div>
        )}
        {projectLeaders.map(
          (member) =>
            member.isLeader && (
              <ProjectMemberItem key={member.id} member={member} />
            )
        )}
      </div>
    </DashboardCard>
  );
};

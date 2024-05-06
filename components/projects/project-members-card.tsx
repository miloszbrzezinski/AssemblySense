"use client";

import { Crown, Plus, ShipWheel, Users } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProjectMemberItem } from "./project-member-item";

interface ProjectMembersCardProps {
  projectMembers: ProjectMemberWithProfile[];
}

export const ProjectMembersCard = ({
  projectMembers,
}: ProjectMembersCardProps) => {
  const { onOpen } = useModal();

  return (
    <DashboardCard icon={<Users strokeWidth={1} />} title="Leaders">
      <div className="bg-stone-300 space-y-[1px]">
        {projectMembers.map(
          (member) =>
            member.isLeader && (
              <ProjectMemberItem key={member.id} member={member} />
            )
        )}
      </div>
    </DashboardCard>
  );
};

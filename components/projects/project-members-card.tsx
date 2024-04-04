"use client";

import { Plus, Users } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";

interface ProjectMembersCardProps {
  profileId: string;
  projectId: string;
  workspaceMembars: WokrspaceMemberWithData[];
}

export const ProjectMembersCard = ({
  profileId,
  projectId,
  workspaceMembars,
}: ProjectMembersCardProps) => {
  const { onOpen } = useModal();
  return (
    <DashboardCard
      icon={<Users strokeWidth={1} />}
      title="Project members"
      addButton={
        <Button
          variant="ghost"
          className="rounded-full p-2 h-min"
          onClick={() => {
            onOpen("addProjectMember", {
              profileId,
              projectId,
              workspaceMembersWithData: workspaceMembars,
            });
          }}
        >
          <Plus strokeWidth={1} />
        </Button>
      }
    >
      Test
    </DashboardCard>
  );
};

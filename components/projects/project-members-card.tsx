"use client";

import { Crown, Plus, ShipWheel, Users } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
              <div
                key={member.id}
                className="flex p-1 w-full bg-white space-x-[1px]  items-center select-none"
              >
                <div className="flex w-full min-h-14  items-center p-2 space-x-2 hover:bg-stone-100">
                  <Avatar>
                    <AvatarImage
                      src={member.workspaceMember.profile.imageUrl}
                    />
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-1">
                      <p className="font-extralight text-lg">
                        {member.workspaceMember.profile.name}
                      </p>
                      <p className="font-light text-lg">
                        {member.workspaceMember.profile.lastName}
                      </p>
                    </div>
                    <p className="text-sm font-extralight text-stone-600">
                      {member.workspaceMember.department
                        ? member.workspaceMember.department.name
                        : "Other"}
                    </p>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </DashboardCard>
  );
};

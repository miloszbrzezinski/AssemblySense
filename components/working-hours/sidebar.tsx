"use client";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { AssemblyGroupWithProcesses } from "@/types";
import { useState } from "react";
import {
  ProjectComponent,
  ProjectIssue,
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { Calendar } from "./calendar";
import { CalendarCard } from "../ui/calendar-card";

interface DesignSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectMembers: ProjectMember[];
  projectComponents: ProjectComponent[];
  projectNetworks: ProjectNetwork[];
  projectProblems: ProjectIssue[];
}

export const WorkingHoursSidebar = ({
  profileId,
  workspaceId,
  projectId,
  assemblyGroups,
  projectMembers,
  projectComponents,
  projectNetworks,
  projectProblems,
}: DesignSidebarProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const [newGroup, setNewGroup] = useState(false);

  const hideNewGroup = () => {
    setNewGroup(false);
  };

  return (
    <div className="flex px-2 h-full border-r pb-20 border-stone-300 shadow-md">
      <Calendar />
    </div>
  );
};

"use client";
import { Separator } from "../../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { AssemblyGroupWithProcesses } from "@/types";
import { useState } from "react";
import {
  ProjectComponent,
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { ChangeLogItem } from "./changelog-item";

interface DesignSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectMembers: ProjectMember[];
  projectComponents: ProjectComponent[];
  projectNetworks: ProjectNetwork[];
}

export const DocumentationSidebar = ({
  profileId,
  workspaceId,
  projectId,
  assemblyGroups,
  projectMembers,
  projectComponents,
  projectNetworks,
}: DesignSidebarProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const [newGroup, setNewGroup] = useState(false);

  const hideNewGroup = () => {
    setNewGroup(false);
  };

  let processesCount = 0;
  assemblyGroups.forEach((g) => (processesCount += g.assemblyProcesses.length));

  return (
    <div className="w-full h-full border-r pt-3 pb-20 border-stone-300 shadow-md overflow-scroll">
      <ChapterSidebarItem chapterName="Project" />
      <ChapterSidebarItem chapterName="Layout" />
      <ChapterSidebarItem chapterName="Team" />
      <Separator />
      <ChapterSidebarItem chapterName="General" />
      {assemblyGroups.map((group) => (
        <ChapterSidebarItem key={group.id} chapterName={group.name} />
      ))}
      <Separator />
      <ChangeLogItem />
    </div>
  );
};

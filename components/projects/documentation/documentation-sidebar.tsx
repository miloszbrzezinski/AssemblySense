"use client";
import {
  Binary,
  FileClock,
  FolderPlus,
  Network,
  Puzzle,
  Shield,
  Waypoints,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { AssemblyGroupWithProcesses } from "@/types";
import { NewCategory } from "../../library/new-category";
import { useState } from "react";
import { NewAssemblyGroup } from "../new-assembly-group";
import {
  ProjectComponent,
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { ChapterItem } from "./chapter-item";
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
      <ChapterItem chapterName="Project" />
      <ChapterItem chapterName="Team" />
      <ChapterItem chapterName="Layout" />
      <Separator />
      <ChapterItem chapterName="General" />
      {assemblyGroups.map((group) => (
        <ChapterItem key={group.id} chapterName={group.name} />
      ))}
      <Separator />
      <ChangeLogItem />
    </div>
  );
};

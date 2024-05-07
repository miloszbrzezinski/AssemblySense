"use client";
import {
  Binary,
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
import { AssemblyGroupItem } from "../assembly-group-item";
import { NewCategory } from "../../library/new-category";
import { useState } from "react";
import { NewAssemblyGroup } from "../new-assembly-group";
import {
  ProjectComponent,
  ProjectIssue,
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { DonutGraph } from "../donut-graph";
import { StatusItem } from "./status-item";

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

export const ImplementationSidebar = ({
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
    <div className="w-full h-full border-r pb-20 border-stone-300 shadow-md overflow-scroll">
      <StatusItem group={null} projectProblems={projectProblems} />
      {assemblyGroups.map((group) => (
        <StatusItem
          key={group.id}
          group={group}
          projectProblems={projectProblems}
        />
      ))}
    </div>
  );
};

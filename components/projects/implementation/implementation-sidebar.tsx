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
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { DonutGraph } from "../donut-graph";

interface DesignSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectMembers: ProjectMember[];
  projectComponents: ProjectComponent[];
  projectNetworks: ProjectNetwork[];
}

export const ImplementationSidebar = ({
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

  return (
    <div className="w-full h-full border-r pb-20 border-stone-300 shadow-md overflow-scroll">
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
  );
};

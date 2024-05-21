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

interface DesignSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectMembers: ProjectMember[];
  projectComponents: ProjectComponent[];
  projectNetworks: ProjectNetwork[];
}

export const DesignSidebar = ({
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
    <div className="w-full h-full border-r pb-20 border-stone-300 dark:border-neutral-700 dark:bg-black/50 shadow-md overflow-scroll">
      <Accordion type="single" collapsible defaultValue="project">
        <AccordionItem value="project">
          <div className="shadow-sm shadow-stone-300 dark:shadow-none w-full">
            <AccordionTrigger>
              <p className="text-lg pl-1 font-normal">Project</p>
            </AccordionTrigger>
          </div>
          <AccordionContent className="pb-0">
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/layout`
                );
              }}
              variant="ghost"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 dark:hover:bg-neutral-800 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Waypoints strokeWidth={1} />
                <p className="font-light">Layout</p>
              </div>
              <p className="font-light">{processesCount}</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/network`
                );
              }}
              variant="ghost"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 dark:hover:bg-neutral-800 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Network strokeWidth={1} />
                <p className="font-light">Networks</p>
              </div>
              <p className="font-light">{projectNetworks.length}</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/components`
                );
              }}
              variant="ghost"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 dark:hover:bg-neutral-800 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Puzzle strokeWidth={1} />
                <p className="font-light">Components</p>
              </div>
              <p className="font-light">{projectComponents.length}</p>
            </Button>

            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/io-list`
                );
              }}
              variant="ghost"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 dark:hover:bg-neutral-800 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Binary strokeWidth={1} />
                <p className="font-light">I/O list</p>
              </div>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/enables`
                );
              }}
              variant="ghost"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 dark:hover:bg-neutral-800 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Shield strokeWidth={1} />
                <p className="font-light">Action enables</p>
              </div>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible defaultValue="groups">
        <AccordionItem value="groups">
          <div className="flex w-full justify-between items-center shadow-sm shadow-stone-300 dark:shadow-none">
            <AccordionTrigger>
              <div className="flex justify-between w-full">
                <p className="text-lg pl-1 font-normal">Control groups</p>
              </div>
            </AccordionTrigger>
            <div className="space-x-1 px-2 items-center flex">
              <button
                onClick={() => {
                  setNewGroup(true);
                }}
              >
                <FolderPlus strokeWidth={1} />
              </button>
            </div>
          </div>

          <AccordionContent className="pl-4 py-2">
            {newGroup && (
              <NewAssemblyGroup
                hide={hideNewGroup}
                profileId={profileId}
                workspaceId={workspaceId}
                projectId={projectId}
              />
            )}
            {assemblyGroups.map((group) => (
              <AssemblyGroupItem
                key={group.id}
                profileId={profileId}
                workspaceId={workspaceId}
                assemblyGroup={group}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

"use client";
import {
  Binary,
  Circle,
  FilePlus,
  FolderPlus,
  Network,
  Plus,
  Puzzle,
  Shield,
  Slash,
  Tally1,
  Target,
  Users,
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
import { ProjectComponent, ProjectMember } from "@prisma/client";

interface DesignSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectMembers: ProjectMember[];
  projectComponents: ProjectComponent[];
}

export const DesignSidebar = ({
  profileId,
  workspaceId,
  projectId,
  assemblyGroups,
  projectMembers,
  projectComponents,
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
      <Accordion type="multiple">
        <AccordionItem value="project">
          <div className="shadow-sm shadow-stone-300 w-full">
            <AccordionTrigger>
              <p className="text-lg pl-1 font-normal">Project</p>
            </AccordionTrigger>
          </div>
          <AccordionContent className="pb-0">
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/targets`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Target strokeWidth={1} />
              <p className="font-light">Project targets</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/members`,
                );
              }}
              variant="secondary"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Users strokeWidth={1} />
                <p className="font-light">Members</p>
              </div>
              <p className="font-light">{projectMembers.length}</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/network`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Network strokeWidth={1} />
              <p className="font-light">Network</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/components`,
                );
              }}
              variant="secondary"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
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
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/io-list`,
                );
              }}
              variant="secondary"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Binary strokeWidth={1} />
                <p className="font-light">I/O list</p>
              </div>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/io-list`,
                );
              }}
              variant="secondary"
              className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <div className="flex items-center justify-start space-x-2">
                <Shield strokeWidth={1} />
                <p className="font-light">Action enables</p>
              </div>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/sequence`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Waypoints strokeWidth={1} />
              <p className="font-light">Sequence</p>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="multiple">
        <AccordionItem value="project">
          <div className="flex w-full justify-between items-center shadow-sm shadow-stone-300">
            <AccordionTrigger>
              <div className="flex justify-between w-full">
                <p className="text-lg pl-1 font-normal">Control groups</p>
              </div>
            </AccordionTrigger>
            <div className="space-x-1 px-2 items-center flex">
              <button>
                <FilePlus strokeWidth={1} />
              </button>
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

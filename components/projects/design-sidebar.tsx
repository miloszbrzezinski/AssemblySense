"use client";
import {
  FilePlus,
  FolderPlus,
  Network,
  Plus,
  Puzzle,
  Users,
  Waypoints,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AssemblyGroupWithProcesses } from "@/types";
import { AssemblyGroupItem } from "./assembly-group-item";
import { NewCategory } from "../library/new-category";
import { useState } from "react";
import { NewAssemblyGroup } from "./new-assembly-group";

interface DesignSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
}

export const DesignSidebar = ({
  profileId,
  workspaceId,
  projectId,
  assemblyGroups,
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
          <AccordionTrigger>
            <p className="text-lg pl-1 font-normal">Project</p>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/network`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Users strokeWidth={1} />
              <p className="font-light">Members</p>
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
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Puzzle strokeWidth={1} />
              <p className="font-light">Components</p>
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
          <div className="flex w-full justify-between items-center">
            <AccordionTrigger>
              <div className="flex justify-between w-full">
                <p className="text-lg pl-1 font-normal">Processes</p>
              </div>
            </AccordionTrigger>
            <div className="space-x-1 px-2">
              <button>
                <FilePlus strokeWidth={1} />
              </button>
              <button
                onClick={() => {
                  setNewGroup(true);
                  // onOpen("addAssemblyGroup", {
                  //   profileId,
                  //   projectId,
                  //   workspaceId,
                  // });
                }}
              >
                <FolderPlus strokeWidth={1} />
              </button>
            </div>
          </div>

          <AccordionContent className="pl-4 pb-2">
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

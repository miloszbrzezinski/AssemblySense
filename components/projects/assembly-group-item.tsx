"use client";
import {
  Copy,
  Edit,
  FilePlus,
  Folder,
  FolderPlus,
  Plus,
  Scissors,
  Trash,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/catalog-accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { AssemblyGroupWithProcesses } from "@/types";
import { useModal } from "@/hooks/use-modal-store";
import { ProcessItem } from "./process-item";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AssemblyGroupItemProps {
  assemblyGroup: AssemblyGroupWithProcesses;
  profileId: string;
  workspaceId: string;
}

export const AssemblyGroupItem = ({
  assemblyGroup,
  profileId,
  workspaceId,
}: AssemblyGroupItemProps) => {
  const [newComponent, setNewComponent] = useState(false);
  const router = useRouter();
  const { onOpen } = useModal();

  const hideNewCategory = () => {
    setNewComponent(false);
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Accordion type="multiple" className="group">
          <AccordionItem value="group">
            <div className="flex w-full justify-between items-center pr-2">
              <AccordionTrigger className="justify-start items-center space-x-1">
                <Folder strokeWidth={1} className="w-5 h-5" />{" "}
                <p>{assemblyGroup.name}</p>
              </AccordionTrigger>
              <button
                onClick={() => {
                  onOpen("addProcess", {
                    assemblyGroup,
                    workspaceId,
                    profileId,
                  });
                }}
                className="hidden group-hover:block"
              >
                <FilePlus strokeWidth={1} />
              </button>
            </div>

            <AccordionContent className="w-full">
              {assemblyGroup.assemblyProcesses.length === 0 && (
                <button
                  onClick={() => {
                    onOpen("addProcess", {
                      assemblyGroup,
                      workspaceId,
                      profileId,
                    });
                  }}
                  className="flex font-thin text-base pl-4 hover:underline"
                >
                  <Plus strokeWidth={0.5} />
                  create first process
                </button>
              )}
              {assemblyGroup.assemblyProcesses.map((process) => (
                <ProcessItem
                  key={process.id}
                  assemblyProcess={process}
                  assemblyGroup={assemblyGroup}
                  workspaceId={workspaceId}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="space-x-2">
          <p>Open</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            onOpen("addProcess", {
              assemblyGroup,
              workspaceId,
              profileId,
            });
          }}
          className="space-x-2"
        >
          <FilePlus strokeWidth={1} className="w-5 h-5" />
          <p>New process</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2">
          <FolderPlus strokeWidth={1} className="w-5 h-5" />
          <p>New folder</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <Scissors strokeWidth={1} className="w-5 h-5" />
          <p>Cut</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2">
          <Copy strokeWidth={1} className="w-5 h-5" />
          <p>Copy</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <Edit strokeWidth={1} className="w-5 h-5" />
          <p>Rename</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2 text-red-800">
          <Trash strokeWidth={1} className="w-5 h-5" />
          <p>Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

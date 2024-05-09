"use client";
import {
  Edit,
  FilePlus,
  Flag,
  Folder,
  FolderPlus,
  Plus,
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
import { startTransition, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { setAssemblyGroupName } from "@/actions/assembly-group";
import { toast } from "sonner";

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
  const [nameEdit, setNameEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newAssemblyGroupName, setNewAssemblyGroupName] = useState(
    assemblyGroup.name
  );
  const router = useRouter();
  const { onOpen } = useModal();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setAssemblyGroupName(
          profileId,
          workspaceId,
          assemblyGroup.projectId,
          assemblyGroup.id,
          newAssemblyGroupName
        ).then((data) => {
          // setError(data.error);
          if (data) {
            toast(data.success, {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
            setNameEdit(false);
          }
        });
      });
    }
    if (event.key === "Escape") {
      setNameEdit(false);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Accordion type="multiple" className="group">
          <AccordionItem value="group">
            <div className="flex w-full justify-between items-center pr-2">
              <AccordionTrigger className="justify-start items-center space-x-1">
                <Folder strokeWidth={1} className="min-w-5 h-5" />{" "}
                {!nameEdit && <p>{assemblyGroup.name}</p>}
              </AccordionTrigger>
              {nameEdit && (
                <input
                  ref={inputRef}
                  type="text"
                  value={newAssemblyGroupName}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setNewAssemblyGroupName(e.target.value);
                  }}
                  className="h-min w-full text-md px-2"
                  onBlur={() => {
                    newAssemblyGroupName.length === 0 && setNameEdit(false);
                  }}
                />
              )}
              {!nameEdit && (
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
              )}
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
        {/* <ContextMenuItem className="space-x-2">
          <FolderPlus strokeWidth={1} className="w-5 h-5" />
          <p>New control group</p>
        </ContextMenuItem> */}
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            onOpen("reportProjectProblem", {
              profileId,
              workspaceId,
              projectId: assemblyGroup.projectId,
              assemblyGroup,
            });
          }}
          className="space-x-2"
        >
          <Flag strokeWidth={1} className="w-5 h-5" />
          <p>Report problem</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            setNameEdit(true);
          }}
          className="space-x-2"
        >
          <Edit strokeWidth={1} className="w-5 h-5" />
          <p>Rename</p>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            onOpen("removeAssemblyGroup", {
              profileId,
              workspaceId,
              projectId: assemblyGroup.projectId,
              groupId: assemblyGroup.id,
            });
          }}
          className="space-x-2 text-red-800"
        >
          <Trash strokeWidth={1} className="w-5 h-5" />
          <p>Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

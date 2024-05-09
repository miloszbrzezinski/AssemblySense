"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  reorderProjectStage,
  setActiveProjectStage,
} from "@/actions/project-stage";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { AssemblyProcess, ProjectStage } from "@prisma/client";
import { Edit, Grip, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { AssemblyGroupWithProcesses, AssemblyProcessWithGroup } from "@/types";

interface ProjectStagesListProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyProcesses: AssemblyProcessWithGroup[];
}

export const ProjectLayoutList = ({
  profileId,
  workspaceId,
  projectId,
  assemblyProcesses,
}: ProjectStagesListProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const [assemblyProcessesList, setAssemblyProcessesList] =
    useState(assemblyProcesses);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    const newList = [...assemblyProcessesList];
    console.log(
      `${newList[source.index].name} moved to pos of ${
        newList[destination.index].name
      }`
    );
    const items = reorder(newList, source.index, destination.index);
    setAssemblyProcessesList(items);

    reorderProjectStage(profileId, workspaceId, projectId, items).then(
      (data) => {
        toast(data.success, {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        router.refresh();
      }
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full h-full p-5 shadow-md">
        <Droppable droppableId={"projectStage"} type="projectStage">
          {(provided) => (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full shadow-md h-min space-y-[1px] bg-stone-300"
            >
              {assemblyProcessesList.map((process, index) => (
                <Draggable
                  key={process.id}
                  draggableId={process.id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="w-full bg-white items-center flex p-5 pl-2 justify-between"
                    >
                      <div className="flex space-x-2 items-center">
                        <div
                          {...provided.dragHandleProps}
                          className="flex h-10 items-center cursor-grab"
                        >
                          <Grip className="text-stone-300" />
                        </div>
                        <div>
                          <p>
                            {process.processId}{" "}
                            <span className="font-light">{process.name}</span>
                          </p>
                          <p className="space-x-2"></p>
                        </div>
                      </div>
                      <p className="font-light">{process.assemblyGroup.name}</p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

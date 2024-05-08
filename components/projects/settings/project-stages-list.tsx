"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  reorderProjectStage,
  setActiveProjectStage,
} from "@/actions/project-stage";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { ProjectStage } from "@prisma/client";
import { Edit, Grip, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "sonner";

interface ProjectStagesListProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  projectStages: ProjectStage[];
}

export const ProjectStagesList = ({
  profileId,
  workspaceId,
  projectId,
  projectStages,
}: ProjectStagesListProps) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const [stagesList, setStagesList] = useState(projectStages);

  const onActivate = (stageId: string) => {
    startTransition(() => {
      setActiveProjectStage(profileId, workspaceId, projectId, stageId).then(
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
    });
  };

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    const newList = [...stagesList];
    console.log(
      `${newList[source.index].name} moved to pos of ${
        newList[destination.index].name
      }`
    );
    const items = reorder(newList, source.index, destination.index);
    setStagesList(items);

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
              {stagesList.map((stage, index) => (
                <Draggable key={stage.id} draggableId={stage.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="w-full bg-white items-center flex p-5 pl-2 justify-between"
                    >
                      <div className="flex space-x-2 items-center">
                        <div
                          {...provided.dragHandleProps}
                          className="flex h-10 items-center"
                        >
                          <Grip className="text-stone-300" />
                        </div>
                        <div>
                          <p
                            className={cn(
                              stage.active && "font-medium underline"
                            )}
                          >
                            {index + 1}. {stage.name}
                          </p>
                          <p className="space-x-2">
                            {stage.startDate && (
                              <span className="font-light">
                                {new Date(stage.startDate).getDate()}/
                                {new Date(stage.startDate).getMonth()}/
                                {new Date(stage.startDate).getFullYear()}
                              </span>
                            )}
                            {stage.deadline && (
                              <>
                                <span>-</span>
                                <span className="font-light">
                                  {new Date(stage.deadline).getDate()}/
                                  {new Date(stage.deadline).getMonth()}/
                                  {new Date(stage.deadline).getFullYear()}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Button
                          onClick={() => {
                            onActivate(stage.id);
                          }}
                          disabled={stage.active}
                          variant={stage.active ? "secondary" : "outline"}
                        >
                          {stage.active ? "Activated" : "Active"}
                        </Button>
                        <Button
                          onClick={() => {
                            onOpen("editProjectStage", {
                              profileId,
                              workspaceId,
                              projectId: stage.projectId,
                              projectStage: stage,
                            });
                          }}
                          variant="outline"
                        >
                          <Edit strokeWidth={1} />
                        </Button>
                        <Button
                          onClick={() => {
                            onOpen("removeProjectStage", {
                              profileId,
                              workspaceId,
                              projectId: stage.projectId,
                              projectStageId: stage.id,
                            });
                          }}
                          variant="outline"
                        >
                          <Trash strokeWidth={1} />
                        </Button>
                      </div>
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

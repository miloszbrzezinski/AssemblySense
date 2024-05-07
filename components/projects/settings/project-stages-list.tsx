"use client";
import { setActiveProjectStage } from "@/actions/project-stage";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { ProjectStage } from "@prisma/client";
import { Edit, Grip, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
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

  return (
    <div className="flex w-full h-full p-5 shadow-md">
      <ol className="w-full shadow-md h-min space-y-[1px] bg-stone-300">
        {projectStages.map((stage) => (
          <li
            key={stage.id}
            className="w-full bg-white items-center flex p-5 pl-2 justify-between"
          >
            <div className="flex space-x-2 items-center">
              <Grip className="text-stone-300" />
              <div>
                <p className={cn(stage.active && "font-medium underline")}>
                  {stage.order + 1}. {stage.name}
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
        ))}
      </ol>
    </div>
  );
};

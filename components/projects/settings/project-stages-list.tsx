"use client";
import { setActiveProjectStage } from "@/actions/project-stage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectStage } from "@prisma/client";
import { Grip } from "lucide-react";
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
              <p className={cn(stage.active && "font-medium underline")}>
                {stage.order + 1}. {stage.name}
              </p>
            </div>
            <Button
              onClick={() => {
                onActivate(stage.id);
              }}
              disabled={stage.active}
              variant={stage.active ? "secondary" : "outline"}
            >
              {stage.active ? "Activated" : "Active"}
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
};

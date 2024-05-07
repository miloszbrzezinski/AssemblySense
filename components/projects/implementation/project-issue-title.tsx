"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectIssue } from "@prisma/client";

interface ProjectIssueTitleBarProps {
  profileId: string;
  workspaceId: string;
  projectIssue: ProjectIssue;
}

export const ProjectIssueTitleBar = ({
  profileId,
  workspaceId,
  projectIssue,
}: ProjectIssueTitleBarProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <div className="flex w-full pb-5 items-center justify-between">
        <h2 className="font-light text-2xl">
          {!projectIssue.solved && (
            <span className="font-medium text-red-600 px-2 select-none">
              {"!".repeat(projectIssue.priority)}
            </span>
          )}
          {projectIssue.solved && (
            <span className="font-medium text-green-600 px-2 select-none">
              Solved
            </span>
          )}
          Project issue:{" "}
          <span className="font-normal">{projectIssue.name}</span>
        </h2>
        <Button
          onClick={() => {
            onOpen("solveIssue", { profileId, workspaceId, projectIssue });
          }}
        >
          Solve
        </Button>
      </div>
      <Separator className="bg-stone-300" />{" "}
    </>
  );
};

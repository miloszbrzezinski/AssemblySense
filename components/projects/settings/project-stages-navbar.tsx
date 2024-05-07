"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface ProjectStagesNavbarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
}

export const ProjectStagesNavbar = ({
  profileId,
  workspaceId,
  projectId,
}: ProjectStagesNavbarProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex justify-between border-b text-xl items-center p-2 bg-white shadow-md">
      <h2>Project stages</h2>
      <Button
        onClick={() => {
          onOpen("addProjectStage", { profileId, workspaceId, projectId });
        }}
        variant="outline"
      >
        Add stage
      </Button>
    </div>
  );
};

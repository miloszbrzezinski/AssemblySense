"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface ProjectTargetNavbarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
}

export const ProjectTargetNavbar = ({
  profileId,
  workspaceId,
  projectId,
}: ProjectTargetNavbarProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex justify-between border-b text-xl items-center p-2 bg-white shadow-md">
      <h2>Project targets</h2>
      <Button
        onClick={() => {
          onOpen("addProjectTarget", { profileId, workspaceId, projectId });
        }}
        variant="outline"
      >
        Add target
      </Button>
    </div>
  );
};

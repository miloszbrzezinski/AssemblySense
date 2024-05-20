"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";

interface ProjectSettingsDangerZone {
  profileId: string;
  workspaceId: string;
  projectId: string;
}

export const ProjectSettingsDangerZone = ({
  profileId,
  workspaceId,
  projectId,
}: ProjectSettingsDangerZone) => {
  const { onOpen } = useModal();
  return (
    <div className="w-full space-y-3">
      <h3 className="text-2xl font-normal">Danger zone</h3>
      <div className="w-1/2 space-y-1 border-2 border-red-800 dark:border-red-900 bg-red-900/5 rounded-md">
        <div className="flex items-center justify-between p-3 w-full">
          <div>
            <h4>Change visibility</h4>
            <p className="font-light">
              Currently everyone can see this project.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-red-700 dark:border-red-900 border-2 text-red-800 dark:text-red-600"
          >
            Change visibility
          </Button>
        </div>
        <Separator className="bg-stone-900" />
        <div className="flex items-center justify-between p-3 w-full">
          <div>
            <h4>Change ownership</h4>
            <p className="font-light">Set owners of this project.</p>
          </div>
          <Button
            variant="outline"
            className="border-red-700 dark:border-red-900 border-2 text-red-800 dark:text-red-600"
          >
            Change
          </Button>
        </div>
        <Separator className="bg-stone-900" />
        <div className="flex items-center justify-between p-3 w-full">
          <div>
            <h4>Delete project</h4>
            <p className="font-light">Be aware. This can not be undone.</p>
          </div>
          <Button
            onClick={() => {
              onOpen("removeProject", { profileId, workspaceId, projectId });
            }}
            variant="outline"
            className="border-red-700 dark:border-red-900 border-2 text-red-800 dark:text-red-600"
          >
            Delete this project
          </Button>
        </div>
      </div>
    </div>
  );
};

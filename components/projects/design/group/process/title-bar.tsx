"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { AssemblyProcess } from "@prisma/client";
import { Trash } from "lucide-react";

interface TitleBarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  process: AssemblyProcess;
}

export const TitleBar = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  process,
}: TitleBarProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex space-x-3">
        <p className="text-4xl font-light">{process.processId}</p>
        <p className="text-4xl font-extralight">{process.name}</p>
      </div>
      <div className="flex items-center h-full">
        <Button
          onClick={() => {
            onOpen("removeProcess", {
              profileId,
              workspaceId,
              projectId,
              groupId,
              processId: process.id,
            });
          }}
          variant="ghost"
          className="hover:bg-red-900 hover:text-red-200"
        >
          <Trash strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

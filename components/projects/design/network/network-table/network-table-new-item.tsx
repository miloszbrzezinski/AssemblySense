"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";
import { MoreVertical, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addProjectNetwork } from "@/actions/project-network";

interface NetworkTableNewItemProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
}

export const NetworkTableNewItem = ({
  profileId,
  workspaceId,
  projectId,
}: NetworkTableNewItemProps) => {
  const router = useRouter();

  const onClick = () => {
    startTransition(() => {
      addProjectNetwork(profileId, workspaceId, projectId).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
  };

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="group rounded-none p-0 flex w-full h-10 bg-stone-200 hover:bg-stone-200 space-x-[1px]"
    >
      <div className="flex min-w-10 h-10 bg-white items-center group-hover:bg-slate-200">
        <div className="w-full h-full rounded-none p-0 flex items-center justify-center">
          <Plus strokeWidth={1} className="hidden group-hover:block" />
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start">
          <h3 className="text-sm font-light pl-2 select-none">New Network</h3>
        </div>
      </div>
    </Button>
  );
};

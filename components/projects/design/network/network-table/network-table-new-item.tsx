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
    <tr onClick={onClick} className="group h-10 select-none cursor-pointer">
      <td className="group-hover:bg-slate-100 border-b border-l-0 border-stone-300">
        <div className="flex items-center justify-center h-10 w-full">
          <Plus strokeWidth={1} />
        </div>
      </td>
      <td className="group-hover:bg-slate-100 border-b border-stone-300 font-light">
        Add network
      </td>
      <td className="group-hover:bg-slate-100 border-b border-stone-300"></td>
      <td className="group-hover:bg-slate-100 border-b border-stone-300"></td>
      <td className="group-hover:bg-slate-100 border-b border-stone-300"></td>
      <td className="group-hover:bg-slate-100 border-b border-r-0 border-stone-300"></td>
    </tr>
  );
};

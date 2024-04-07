"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";
import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IOTableNewItemProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectComponent: ProjectComponentWithData;
}

export const IOTableNewItem = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectComponent,
}: IOTableNewItemProps) => {
  return (
    <div className="group flex w-full h-10 bg-stone-300 space-x-[1px]">
      <div className="flex min-w-10 h-10 bg-white items-center group-hover:bg-slate-100">
        <Button
          variant="ghost"
          className="w-full h-full rounded-none p-0 hover:bg-slate-200  transition-none"
        >
          <Plus strokeWidth={1} className="hidden group-hover:block" />
        </Button>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
          <h3 className="text-sm font-light pl-2 select-none">New I/O Item</h3>
        </div>
      </div>
    </div>
  );
};

"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";
import { GripVertical, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IOTableItemProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectComponent: ProjectComponentWithData;
}

export const IOTableItem = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectComponent,
}: IOTableItemProps) => {
  return (
    <div className="group flex w-full h-10 bg-stone-300 space-x-[1px]">
      <div className="flex min-w-10 h-10 bg-white items-center group-hover:bg-slate-100">
        <Button
          variant="ghost"
          className="w-full h-full rounded-none p-0 hover:bg-slate-200  transition-none"
        >
          <GripVertical strokeWidth={1} className="hidden group-hover:block" />
        </Button>
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-28 h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
          <h3 className="text-sm font-light pl-2">OP101</h3>
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
          <h3 className="text-sm font-light pl-2">+100-CAM2</h3>
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-28 h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
          <h3 className="text-base font-medium pl-2">I0.0</h3>
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <h3 className="text-sm font-light pl-2">In Home Position</h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
          <h3 className="text-sm font-light pl-2"></h3>
        </div>
      </div>
    </div>
  );
};

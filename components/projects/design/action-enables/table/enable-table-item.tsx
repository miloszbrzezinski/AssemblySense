"use client";
import {
  AssemblyGroup,
  AssemblyProcess,
  ComponentEvent,
  EventType,
} from "@prisma/client";
import {
  AssemblyGroupWithProcesses,
  ComponentEventWithData,
  ProjectComponentWithData,
} from "@/types";
import { GripVertical, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnableFormulaPopover } from "./enable-formula-popover";
import { ComponentEnableDescription } from "./enable-description";

interface EnableTableItemProps {
  profileId: string;
  workspaceId: string;
  componentEvent: ComponentEventWithData;
  componentEvents: ComponentEvent[];
}

export const EnableTableItem = ({
  profileId,
  workspaceId,
  componentEvent,
  componentEvents,
}: EnableTableItemProps) => {
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
          <h3 className="text-sm font-light pl-2">
            {componentEvent.projectComponent.assemblyGroup?.name}
          </h3>
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-48 h-10 bg-white items-center">
        <h3 className="text-sm font-light pl-2">{componentEvent.name}</h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center overflow-x-scroll">
        <EnableFormulaPopover
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          componentStatuses={componentEvents}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ComponentEnableDescription
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          componentStatuses={componentEvents}
        />
      </div>
    </div>
  );
};

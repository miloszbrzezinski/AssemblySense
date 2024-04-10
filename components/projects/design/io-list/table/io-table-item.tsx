"use client";
import {
  AssemblyGroup,
  AssemblyProcess,
  ComponentEvent,
  EventType,
  ProjectComponent,
} from "@prisma/client";
import {
  AssemblyGroupWithProcesses,
  ComponentEventWithData,
  ProjectComponentWithData,
} from "@/types";
import { GripVertical, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentEventDescription } from "../../components/events-list/event-description";
import { ComponentEventName } from "../../components/events-list/event-name";
import { ComponentEventAddress } from "../../components/events-list/event-address";
import { ComponentEventSymbol } from "../../components/events-list/event-symbol";

interface IOTableItemProps {
  profileId: string;
  workspaceId: string;
  componentEvent: ComponentEventWithData;
}

export const IOTableItem = ({
  profileId,
  workspaceId,
  componentEvent,
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
          <h3 className="text-sm font-light pl-2">
            {componentEvent.projectComponent.assemblyGroup?.name}
          </h3>
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-52 h-10 bg-white items-center">
        <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
          <h3 className="text-sm font-light pl-2">
            {componentEvent.projectComponent.name}
          </h3>
        </div>
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-72 h-10 bg-white items-center">
        <ComponentEventName
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-28 h-10 bg-white items-center">
        <ComponentEventAddress
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex min-w-40 h-10 bg-white items-center">
        <ComponentEventSymbol
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ComponentEventDescription
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </div>
    </div>
  );
};

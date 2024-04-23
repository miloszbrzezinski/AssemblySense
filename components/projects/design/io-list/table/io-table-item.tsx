"use client";
import { ComponentEventWithData } from "@/types";
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
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <button className="hover:bg-slate-200 flex items-center justify-center h-10 w-full">
          <GripVertical strokeWidth={1} className="hidden group-hover:block" />
        </button>
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        {componentEvent.projectComponent.assemblyGroup?.name}
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        {componentEvent.projectComponent.name}
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ComponentEventName
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ComponentEventAddress
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ComponentEventSymbol
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-r-0 border-stone-300">
        <ComponentEventDescription
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          projectComponent={componentEvent.projectComponent}
        />
      </td>
    </tr>
  );
};

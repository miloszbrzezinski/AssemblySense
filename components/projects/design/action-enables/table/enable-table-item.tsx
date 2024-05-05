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
import { Flag, GripVertical, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnableFormulaPopover } from "./enable-formula-popover";
import { ComponentEnableDescription } from "./enable-description";
import { useModal } from "@/hooks/use-modal-store";

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
  const { onOpen } = useModal();
  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <button
          onClick={() => {
            onOpen("reportProjectProblem", {
              profileId,
              workspaceId,
              projectId: componentEvent.projectComponent.projectId,
              componentEvent,
            });
          }}
          className="hover:bg-slate-200 flex items-center justify-center h-10 w-full"
        >
          <Flag strokeWidth={1} className="hidden group-hover:block" />
        </button>
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300 text-sm font-light pl-2">
        {componentEvent.projectComponent.assemblyGroup?.name}
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300 text-sm font-light pl-2">
        {componentEvent.name}
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <EnableFormulaPopover
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          componentStatuses={componentEvents}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ComponentEnableDescription
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={componentEvent}
          componentStatuses={componentEvents}
        />
      </td>
    </tr>
  );
};

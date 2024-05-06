"use client";
import { ComponentEventWithData } from "@/types";
import { Flag, GripVertical, MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentEventDescription } from "../../components/events-list/event-description";
import { ComponentEventName } from "../../components/events-list/event-name";
import { ComponentEventAddress } from "../../components/events-list/event-address";
import { ComponentEventSymbol } from "../../components/events-list/event-symbol";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { removeProjectComponentEvent } from "@/actions/component-event";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";

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
  const router = useRouter();
  const { onOpen } = useModal();

  const removeEvent = () => {
    startTransition(() => {
      removeProjectComponentEvent(
        profileId,
        workspaceId,
        componentEvent.projectComponent.id,
        componentEvent.id,
        componentEvent.projectComponent.projectId
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          if (data.success) {
            toast(data.success, {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        }
      });
    });
  };

  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-slate-200 flex items-center justify-center h-10 w-full outline-none">
            <MoreVertical
              strokeWidth={1}
              className="hidden group-hover:block"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem
              onClick={() => {
                const assemblyGroupId = componentEvent.projectComponent
                  .assemblyGroupId
                  ? componentEvent.projectComponent.assemblyGroupId
                  : undefined;
                const assemblyProcessId = componentEvent.projectComponent
                  .assemblyProcessId
                  ? componentEvent.projectComponent.assemblyProcessId
                  : undefined;
                onOpen("reportProjectProblem", {
                  profileId,
                  workspaceId,
                  projectId: componentEvent.projectComponent.projectId,
                  addressIO: componentEvent.addressIO!,
                  assemblyGroupId,
                  assemblyProcessId,
                });
              }}
              className="text-stone-900"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report problem
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-900 hover:bg-red-200"
              onClick={removeEvent}
            >
              <Trash className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td className="group-hover:bg-slate-100 text-sm font-light p-2 border border-stone-300">
        {componentEvent.projectComponent.assemblyGroup?.name}
      </td>
      <td className="group-hover:bg-slate-100 text-sm font-light p-2 border border-stone-300">
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

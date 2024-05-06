import { ComponentEventWithData } from "@/types";
import { EventType, ProjectComponent } from "@prisma/client";
import { ComponentEventName } from "./event-name";
import { ComponentEventDescription } from "./event-description";
import { ComponentEventSymbol } from "./event-symbol";
import { ComponentEventAddress } from "./event-address";
import { Flag, MoreVertical, Trash, X } from "lucide-react";
import { startTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeProjectComponentEvent } from "@/actions/component-event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface EventListItemProps {
  profileId: string;
  workspaceId: string;
  event: ComponentEventWithData;
  projectComponent: ProjectComponent;
}

export const EventListItem = ({
  profileId,
  workspaceId,
  event,
  projectComponent,
}: EventListItemProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const removeEvent = () => {
    startTransition(() => {
      removeProjectComponentEvent(
        profileId,
        workspaceId,
        projectComponent.id,
        event.id,
        projectComponent.projectId
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

  const assemblyGroupId = event.projectComponent.assemblyGroupId
    ? event.projectComponent.assemblyGroupId
    : undefined;
  const assemblyProcessId = event.projectComponent.assemblyProcessId
    ? event.projectComponent.assemblyProcessId
    : undefined;

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
                onOpen("reportProjectProblem", {
                  profileId,
                  workspaceId,
                  projectId: projectComponent.projectId,
                  addressIO: event.addressIO!,
                  assemblyGroupId,
                  assemblyProcessId,
                });
              }}
              className="text-stone-900"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report address problem
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onOpen("reportProjectProblem", {
                  profileId,
                  workspaceId,
                  projectId: projectComponent.projectId,
                  componentEvent: event,
                  assemblyGroupId,
                  assemblyProcessId,
                });
              }}
              className="text-stone-900"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report event problem
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
      <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-l-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap">
        <ComponentEventName
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-l-0 border-stone-300 min-w-28 max-w-28 text-sm font-light whitespace-nowrap">
        <ComponentEventAddress
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-l-0 border-stone-300 min-w-32 max-w-32 text-sm font-light whitespace-nowrap">
        <ComponentEventSymbol
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </td>
      <td className=" group-hover:bg-slate-100 border bg-white border-t-0 border-r-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap">
        <ComponentEventDescription
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </td>
    </tr>
  );
};

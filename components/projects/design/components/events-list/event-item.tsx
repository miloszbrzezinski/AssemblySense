import { ComponentEventWithData } from "@/types";
import { EventType, ProjectComponent } from "@prisma/client";
import { ComponentEventName } from "./event-name";
import { ComponentEventDescription } from "./event-description";
import { ComponentEventSymbol } from "./event-symbol";
import { ComponentEventAddress } from "./event-address";
import { X } from "lucide-react";
import { startTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeProjectComponentEvent } from "@/actions/component-event";

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


  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <button
          onClick={removeEvent}
          className="hover:bg-red-200 flex items-center justify-center h-10 w-full"
        >
          <X
            strokeWidth={1}
            className="hidden group-hover:block"
          />
        </button>
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

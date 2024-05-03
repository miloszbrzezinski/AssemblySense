"use client";
import { addProjectComponentEvent } from "@/actions/component-event";
import { ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { EventType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { EventListItem } from "./event-item";
import { Binary, Plus } from "lucide-react";

interface ComponentEventListProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
  events: ComponentEventWithData[];
}

export const ComponentEventList = ({
  profileId,
  workspaceId,
  projectComponent,
  events,
}: ComponentEventListProps) => {
  const router = useRouter();

  const onAdd = () => {
    startTransition(() => {
      addProjectComponentEvent(profileId, workspaceId, projectComponent).then(
        (data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: ``,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        },
      );
    });
  };
  return (
    <div className="flex flex-col w-full h-min bg-stone-300 space-y-[0.5px]">
      <div className="flex w-full shadow-md items-center p-2 bg-white">
        <p className="text-lg font-light">IO List</p>
      </div>
      <table className="border-collapse shadow-sm relative w-full bg-white">
      <thead className="h-10">
        <tr>
          <th className="sticky top-0 border bg-white border-l-0 border-t-0 border-stone-300 w-10 min-w-10">
            <div className="flex items-center justify-center">
              <Binary strokeWidth={1} />
            </div>
          </th>
          <th className="sticky top-0 border bg-white border-t-0 border-l-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
            Event
          </th>
          <th className="sticky top-0 border bg-white border-t-0 border-stone-300 min-w-28 text-base font-light whitespace-nowrap px-6">
            Address
          </th>
          <th className="sticky top-0 border bg-white border-t-0 border-stone-300 min-w-32 max-w-32 text-base font-light whitespace-nowrap px-6">
            Symbol
          </th>
          <th className="sticky top-0 border bg-white border-t-0 border-r-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <EventListItem
            key={event.id}
            profileId={profileId}
            workspaceId={workspaceId}
            event={event}
            projectComponent={projectComponent}
          />
        ))}
      </tbody>
      </table>
      <button onClick={onAdd} className="text-base h-10 pl-2 w-full flex items-center justify-start bg-white hover:bg-slate-200">
        <Plus strokeWidth={1}/>
        <h3 className="text-base font-light pl-2">Add event</h3>
      </button>
    </div>
  );
};

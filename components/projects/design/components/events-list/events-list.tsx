"use client";
import { addProjectComponentEvent } from "@/actions/component-event";
import { ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { EventType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { EventListItem } from "./event-item";

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
    <div className="flex flex-col w-full h-full border bg-stone-300 space-y-[1px]">
      <div className="flex w-full shadow-md items-center p-2 bg-white">
        <p className="text-lg font-light">IO List</p>
      </div>
      <div className=" space-y-[1px] w-full flex flex-col">
        <div className="bg-stone-300 space-x-[1px] flex w-full h-10">
          <div className="bg-white h-10 w-full items-center justify-start flex">
            <p className="pl-2">Event</p>
          </div>
          <div className="bg-white h-10 min-w-32 items-center justify-start flex">
            <p className="pl-2">Address</p>
          </div>
          <div className="bg-white h-10 min-w-32 items-center justify-start flex">
            <p className="pl-2">Symbol</p>
          </div>
          <div className="bg-white h-10 w-full items-center justify-start flex">
            <p className="pl-2">Description</p>
          </div>
        </div>
        {events.map((event) => (
          <EventListItem
            key={event.id}
            profileId={profileId}
            workspaceId={workspaceId}
            event={event}
            projectComponent={projectComponent}
          />
        ))}
      </div>
      <div className="flex w-full h-full bg-white" />
      <button
        onClick={onAdd}
        className="w-full p-2 bg-white hover:bg-stone-100"
      >
        Add I/O
      </button>
    </div>
  );
};

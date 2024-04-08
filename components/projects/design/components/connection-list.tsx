"use client";
import { addProjectComponentEvent } from "@/actions/component-event";
import { ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { EventType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

interface ComponentConnectionListProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
  events: ComponentEventWithData[];
}

export const ComponentConnectionList = ({
  profileId,
  workspaceId,
  projectComponent,
  events,
}: ComponentConnectionListProps) => {
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
        <p className="text-lg font-light">Connections</p>
      </div>
      <div className=" space-y-[1px] w-full flex flex-col">
        <div className="bg-stone-300 space-x-[1px] flex w-full h-10">
          <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
            <p>Event</p>
          </div>
          <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
            <p>Address</p>
          </div>
          <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
            <p>Symbol</p>
          </div>
          <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
            Comment
          </div>
        </div>
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-stone-300 space-x-[1px] flex w-full h-10"
          >
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>{event.name}</p>
            </div>
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>
                <span>{event.eventType === EventType.ACTION && "O"}</span>
                <span>{event.eventType === EventType.STATUS && "I"}</span>
                <span>{event.addressIO?.byteAdress}</span>.
                <span>{event.addressIO?.bitAdress}</span>
              </p>
            </div>
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>
                <span>{event.addressIO?.symbol}</span>
              </p>
            </div>
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>{event.description}</p>
            </div>
          </div>
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

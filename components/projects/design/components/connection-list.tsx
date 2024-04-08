"use client";
import { addProjectComponentEvent } from "@/actions/component-event";
import {
  ComponentConnectionWithData,
  ComponentEventWithData,
  ProjectComponentWithData,
} from "@/types";
import { EventType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

interface ComponentConnectionListProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
  connections: ComponentConnectionWithData[];
}

export const ComponentConnectionList = ({
  profileId,
  workspaceId,
  projectComponent,
  connections,
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
            <p>Network</p>
          </div>
          <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
            <p>Address</p>
          </div>
          <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
            Description
          </div>
        </div>
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="bg-stone-300 space-x-[1px] flex w-full h-10"
          >
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>{connection.name}</p>
            </div>
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>
                <span>{connection.hostPortion}</span>
              </p>
            </div>
            <div className="bg-white h-10 w-full items-center justify-start pl-2 flex">
              <p>{connection.description}</p>
            </div>
          </div>
        ))}
        <button
          onClick={onAdd}
          className="w-full p-2 bg-white hover:bg-stone-100"
        >
          Add connection
        </button>
      </div>
      <div className="flex w-full h-full bg-white" />
    </div>
  );
};

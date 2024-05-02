"use client";
import { addProjectComponentConnection } from "@/actions/component-connection";
import { addProjectComponentEvent } from "@/actions/component-event";
import {
  ComponentConnectionWithData,
  ComponentEventWithData,
  ProjectComponentWithData,
  ProjectNetworkWithData,
} from "@/types";
import { EventType, ProjectNetwork } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { ProjectComponentConnectionPopover } from "./project-component-connection-popover";
import { Network, X } from "lucide-react";
import { ConnectionItem } from "./connection-item";

interface ComponentConnectionListProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
  projectNetworks: ProjectNetwork[];
  connections: ComponentConnectionWithData[];
}

export const ComponentConnectionList = ({
  profileId,
  workspaceId,
  projectComponent,
  projectNetworks,
  connections,
}: ComponentConnectionListProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-min bg-stone-300 space-y-[0.5px]">
      <div className="flex w-full shadow-md items-center p-2 bg-white">
        <p className="text-lg font-light">Connections</p>
      </div>
      <table className="border-collapse shadow-sm relative w-full bg-white">
        <thead className="h-10">
          <tr>
            <th className="sticky top-0 border bg-white border-l-0 border-t-0 border-stone-300 w-10 min-w-10">
              <div className="flex items-center justify-center">
                <Network strokeWidth={1} />
              </div>
            </th>
            <th className="sticky top-0 border bg-white border-t-0 border-l-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Network
            </th>
            <th className="sticky top-0 border bg-white border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Address
            </th>
            <th className="sticky top-0 border bg-white border-t-0 border-r-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
        {connections.map((connection) => (
          <ConnectionItem key={connection.id} profileId={profileId} workspaceId={workspaceId} projectComponent={projectComponent} connection={connection} projectNetworks={projectNetworks}/>
        ))}
        </tbody>
      </table>
      <ProjectComponentConnectionPopover profileId={profileId} workspaceId={workspaceId} projectNetworks={projectNetworks} projectComponent={projectComponent}/>
    </div>
  );
};

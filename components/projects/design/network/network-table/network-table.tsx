import { Network } from "lucide-react";
import {
  AssemblyGroupWithProcesses,
  ProjectComponentWithData,
  ProjectNetworkWithData,
} from "@/types";
import { NetworkTableNewItem } from "./network-table-new-item";
import { NetworkTableItem } from "./network-table-item";

interface NetworkTableProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectNetworks: ProjectNetworkWithData[];
}

export const NetworkTable = ({
  profileId,
  workspaceId,
  projectId,
  assemblyGroups,
  projectNetworks,
}: NetworkTableProps) => {
  return (
    <div className="flex flex-col w-full bg-stone-300 space-y-[1px] shadow-md">
      <div className="flex w-full h-14 bg-stone-300 space-x-[1px]">
        <div className="flex w-10 h-14 bg-white items-center p-2">
          <Network strokeWidth={1} />
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Control group</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Name</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Subnet Mask</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Network Portion</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Description</h3>
        </div>
      </div>
      {projectNetworks.map((network) => (
        <NetworkTableItem
          key={network.id}
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectNetwork={network}
        />
      ))}
      <NetworkTableNewItem
        profileId={profileId}
        workspaceId={workspaceId}
        projectId={projectId}
      />
    </div>
  );
};

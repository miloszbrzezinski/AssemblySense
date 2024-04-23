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
    <div className="flex-grow overflow-auto">
      <table className="border-collapse shadow-md relative w-full bg-white">
        <thead className="h-14">
          <tr>
            <th className="sticky top-0 border bg-neutral-100/90 border-l-0 border-t-0 border-stone-300 w-10 min-w-10">
              <div className="flex items-center justify-center">
                <Network strokeWidth={1} />
              </div>
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Control group
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Name
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Subnet Mask
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Network Portion
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="pb-20">
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
        </tbody>
      </table>
    </div>
  );
};

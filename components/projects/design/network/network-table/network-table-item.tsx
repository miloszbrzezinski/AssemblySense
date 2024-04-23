"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import AssemblyGroupPopover from "./assembly-groups-popover";
import {
  AssemblyGroupWithProcesses,
  ProjectComponentWithData,
  ProjectNetworkWithData,
} from "@/types";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectNetworkDescription } from "./project-network-description";
import { ProjectNetworkName } from "./project-network-name";
import { NetworkAddressInput } from "./address-input";

interface NetworkTableItemProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectNetwork: ProjectNetworkWithData;
}

export const NetworkTableItem = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectNetwork,
}: NetworkTableItemProps) => {
  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <button className="hover:bg-slate-200 flex items-center justify-center h-10 w-full">
          <MoreVertical strokeWidth={1} className="hidden group-hover:block" />
        </button>
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <AssemblyGroupPopover
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectNetwork={projectNetwork}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ProjectNetworkName
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <NetworkAddressInput
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <NetworkAddressInput
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-r-0 border-stone-300">
        <ProjectNetworkDescription
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </td>
    </tr>
  );
};

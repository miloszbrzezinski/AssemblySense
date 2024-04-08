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
    <div className="group flex w-full h-10 bg-stone-300 space-x-[1px]">
      <div className="flex min-w-10 h-10 bg-white items-center group-hover:bg-slate-100">
        <Button
          variant="ghost"
          className="w-full h-full rounded-none p-0 hover:bg-slate-200  transition-none"
        >
          <MoreVertical strokeWidth={1} className="hidden group-hover:block" />
        </Button>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <AssemblyGroupPopover
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectNetwork={projectNetwork}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ProjectNetworkName
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <NetworkAddressInput
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <NetworkAddressInput
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ProjectNetworkDescription
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
        />
      </div>
    </div>
  );
};

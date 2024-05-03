"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import AssemblyGroupPopover from "./assembly-groups-popover";
import {
  AssemblyGroupWithProcesses,
  ProjectComponentWithData,
  ProjectNetworkWithData,
} from "@/types";
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectNetworkDescription } from "./project-network-description";
import { ProjectNetworkName } from "./project-network-name";
import { NetworkAddressInput } from "./address-input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

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
  const { onOpen } = useModal()

  const onRemove = () => {
    onOpen("removeNetwork", {profileId, workspaceId, projectId: projectNetwork.projectId, projectNetworkId: projectNetwork.id})
  }

  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-slate-200 flex items-center justify-center h-10 w-full outline-none">
            <MoreVertical strokeWidth={1} className="hidden group-hover:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem
              className="text-red-900 hover:bg-red-200"
              onClick={onRemove}
            >
              <Trash className="h-4 w-4 mr-2"
                
              />
                Remove
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          type="mask"
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <NetworkAddressInput
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetwork={projectNetwork}
          type="ip"
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

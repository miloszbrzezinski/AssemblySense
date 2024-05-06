import { removeProjectComponentConnection } from "@/actions/component-connection";
import { ComponentConnectionWithData, ProjectComponentWithData } from "@/types";
import { Flag, MoreVertical, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { ConnectionDescription } from "./connection-description";
import { ProjectComponentConnectionPopover } from "./network-popover";
import { ProjectNetwork } from "@prisma/client";
import { NetworkAddressInput } from "./address-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ConnectionItemProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
  connection: ComponentConnectionWithData;
  projectNetworks: ProjectNetwork[];
}

export const ConnectionItem = ({
  profileId,
  workspaceId,
  projectComponent,
  connection,
  projectNetworks,
}: ConnectionItemProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const removeConnection = () => {
    startTransition(() => {
      removeProjectComponentConnection(
        profileId,
        workspaceId,
        connection.id,
        projectComponent
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          if (data.success) {
            toast(data.success, {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        }
      });
    });
  };

  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-slate-200 flex items-center justify-center h-10 w-full outline-none">
            <MoreVertical
              strokeWidth={1}
              className="hidden group-hover:block"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem
              onClick={() => {
                const assemblyGroupId = projectComponent.assemblyGroup
                  ? projectComponent.assemblyGroup.id
                  : undefined;
                const assemblyProcessId = projectComponent.assemblyProcess
                  ? projectComponent.assemblyProcess.id
                  : undefined;
                onOpen("reportProjectProblem", {
                  profileId,
                  workspaceId,
                  projectId: projectComponent.projectId,
                  projectConnection: connection,
                  assemblyGroupId,
                  assemblyProcessId,
                });
              }}
              className="text-stone-900"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report problem
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-900 hover:bg-red-200"
              onClick={removeConnection}
            >
              <Trash className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-l-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap">
        <ProjectComponentConnectionPopover
          profileId={profileId}
          workspaceId={workspaceId}
          projectNetworks={projectNetworks}
          projectComponent={projectComponent}
          connection={connection}
        />
      </td>
      <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-stone-300 max-w-36 w-36 items-baseline whitespace-nowrap">
        <NetworkAddressInput
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
          connection={connection}
        />
      </td>
      <td className=" group-hover:bg-slate-100 border bg-white border-t-0 border-r-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap">
        <ConnectionDescription
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
          connection={connection}
        />
      </td>
    </tr>
  );
};

import { removeProjectComponentConnection } from "@/actions/component-connection";
import { ComponentConnectionWithData, ProjectComponentWithData } from "@/types";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { ConnectionDescription } from "./connection-description";
import { ProjectComponentConnectionPopover } from "./network-popover";
import { ProjectNetwork } from "@prisma/client";

interface ConnectionItemProps {
    profileId: string;
    workspaceId: string;
    projectComponent: ProjectComponentWithData;
    connection: ComponentConnectionWithData
    projectNetworks: ProjectNetwork[];
}

export const ConnectionItem = ({profileId,workspaceId, projectComponent, connection, projectNetworks}: ConnectionItemProps) => {
  const router = useRouter();


  const removeConnection = () => {
    startTransition(() => {
      removeProjectComponentConnection(
        profileId,
        workspaceId,
        connection.id,
        projectComponent,
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
      <button
        onClick={removeConnection}
        className="hover:bg-red-200 flex items-center justify-center h-10 w-full"
      >
        <X
          strokeWidth={1}
          className="hidden group-hover:block"
        />
      </button>
    </td>
    <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-l-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap">
      <ProjectComponentConnectionPopover profileId={profileId} workspaceId={workspaceId} projectNetworks={projectNetworks} projectComponent={projectComponent} connection={connection}/>
    </td>
    <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-stone-300 max-w-36 w-36 items-baseline whitespace-nowrap px-2">
      <span className="font-light">{connection.projectNetwork.networkPortion}</span>.<span className="font-normal">{connection.hostPortion}</span>
    </td>
    <td className=" group-hover:bg-slate-100 border bg-white border-t-0 border-r-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap">
      <ConnectionDescription profileId={profileId} workspaceId={workspaceId} projectComponent={projectComponent} connection={connection}/>
    </td>
  </tr> 
  );
}

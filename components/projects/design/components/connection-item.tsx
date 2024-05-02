import { ComponentConnectionWithData, ProjectComponentWithData } from "@/types";
import { X } from "lucide-react";

interface ConnectionItemProps {
    profileId: string;
    workspaceId: string;
    projectComponent: ProjectComponentWithData;
    connection: ComponentConnectionWithData
}

export const ConnectionItem = ({profileId,workspaceId, projectComponent, connection}: ConnectionItemProps) => {
    return ( 
    <tr className="group h-10">
    <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
      <button
        className="hover:bg-red-200 flex items-center justify-center h-10 w-full"
      >
        <X
          strokeWidth={1}
          className="hidden group-hover:block"
        />
      </button>
    </td>
    <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-l-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap px-2">
      {connection.projectNetwork.name}
    </td>
    <td className="group-hover:bg-slate-100 border bg-white border-t-0 border-stone-300 min-w-36 items-baseline whitespace-nowrap px-2">
      <span className="font-light">{connection.projectNetwork.networkPortion}</span>.<span className="font-normal">{connection.hostPortion}</span>
    </td>
    <td className=" group-hover:bg-slate-100 border bg-white border-t-0 border-r-0 border-stone-300 min-w-36 text-sm font-light whitespace-nowrap px-2">
      {connection.description}
    </td>
  </tr> 
  );
}

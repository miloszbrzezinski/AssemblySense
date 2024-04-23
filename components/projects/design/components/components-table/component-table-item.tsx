"use client";
import AssemblyGroupPopover from "./assembly-groups-popover";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";
import { ProjectComponentName } from "./project-component-name";
import { AssemblyProcessPopover } from "./assembly-process-popover";
import { ProjectComponentDescription } from "./project-component-description";
import { ProjectComponentStatus } from "./project-component-status";
import { SquareArrowOutUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ComponentTableItemProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectComponent: ProjectComponentWithData;
}

export const ComponentTableItem = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectComponent,
}: ComponentTableItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`components/${projectComponent.id}`);
  };

  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-0 border-stone-300">
        <button
          onClick={onClick}
          className="hover:bg-slate-200 flex items-center justify-center h-10 w-full"
        >
          <SquareArrowOutUpLeft
            strokeWidth={1}
            className="hidden group-hover:block"
          />
        </button>
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <AssemblyGroupPopover
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectComponent={projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <AssemblyProcessPopover
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectComponent={projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ProjectComponentName
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <h3 className="text-sm font-light pl-2">
          {projectComponent.component.manufacturer}{" "}
          <span className="font-extralight">
            {projectComponent.component.name}
          </span>
        </h3>
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ProjectComponentStatus
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-r-0 border-stone-300">
        <ProjectComponentDescription
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
        />
      </td>
    </tr>
  );
};

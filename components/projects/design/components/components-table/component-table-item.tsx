"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import AssemblyGroupPopover from "./assembly-groups-popover";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";
import { ProjectComponentName } from "./project-component-name";
import { AssemblyProcessPopover } from "./assembly-process-popover";
import { ProjectComponentDescription } from "./project-component-description";
import { ProjectComponentStatus } from "./project-component-status";

interface ComponentTableItemProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectComponent: ProjectComponentWithData;
}

const ComponentTableItem = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectComponent,
}: ComponentTableItemProps) => {
  return (
    <div className="group flex w-full h-10 bg-stone-300 space-x-[1px]">
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <AssemblyGroupPopover
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectComponent={projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <AssemblyProcessPopover
          profileId={profileId}
          workspaceId={workspaceId}
          assemblyGroups={assemblyGroups}
          projectComponent={projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ProjectComponentName
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <h3 className="text-base font-light pl-2">
          {projectComponent.component.manufacturer}{" "}
          <span className="font-extralight">
            {projectComponent.component.name}
          </span>
        </h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ProjectComponentStatus
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
        />
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
        <ProjectComponentDescription
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={projectComponent}
        />
      </div>
    </div>
  );
};

export default ComponentTableItem;

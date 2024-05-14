import { MoreVertical } from "lucide-react";
import { HoursInput } from "./hours-input";
import { ProjectsPopover } from "./projects-popover";
import AssemblyGroupPopover from "./assembly-groups-popover";
import { WorkingHours } from "@prisma/client";
import { db } from "@/lib/db";
import { WorkingHoursWithProjectMember } from "@/types";
import { AssemblyProcessPopover } from "./assembly-process-popover";
import { WorkingHoursSourcePopover } from "./working-hours-source-popover";

interface WorkHoursItemProps {
  profileId: string;
  workspaceId: string;
  workingHours: WorkingHoursWithProjectMember;
}

export const WorkHoursItem = async ({
  profileId,
  workspaceId,
  workingHours,
}: WorkHoursItemProps) => {
  const projects = await db.project.findMany({
    where: {
      workspaceId,
    },
  });

  const assemblyGroups = await db.assemblyGroup.findMany({
    where: {
      project: {
        id: workingHours.projectMember.projectId,
      },
    },
    include: {
      assemblyProcesses: true,
    },
  });

  const projectComponents = await db.projectComponent.findMany({
    where: {
      project: {
        id: workingHours.projectMember.projectId,
      },
      assemblyGroupId: workingHours.assemblyGroupId,
      assemblyProcessId: workingHours.processId,
    },
    include: {
      component: true,
    },
  });

  const sequences = await db.sequence.findMany({
    where: {
      assemblyProcess: {
        assemblyGroup: {
          projectId: workingHours.projectMember.projectId,
        },
      },
    },
  });

  const projectNetworks = await db.projectNetwork.findMany({
    where: {
      project: {
        id: workingHours.projectMember.projectId,
      },
    },
  });

  const targets = await db.projectTarget.findMany({
    where: {
      Project: {
        id: workingHours.projectMember.projectId,
      },
    },
  });

  return (
    <tr className="group h-10">
      <td className="group-hover:bg-slate-100 border border-l-1 border-stone-300">
        <button className="hover:bg-slate-200 flex items-center justify-center h-10 w-full">
          <MoreVertical strokeWidth={1} className="hidden group-hover:block" />
        </button>
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <HoursInput />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <ProjectsPopover
          profileId={profileId}
          workspaceId={workspaceId}
          workingHours={workingHours}
          projects={projects}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <AssemblyGroupPopover
          profileId={profileId}
          workspaceId={workspaceId}
          workingHours={workingHours}
          assemblyGroups={assemblyGroups}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <AssemblyProcessPopover
          profileId={profileId}
          workspaceId={workspaceId}
          workingHours={workingHours}
          assemblyGroups={assemblyGroups}
        />
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        <WorkingHoursSourcePopover
          profileId={profileId}
          workspaceId={workspaceId}
          workingHours={workingHours}
          projectComponents={projectComponents}
          projectNewtorks={projectNetworks}
          sequences={sequences}
          targets={targets}
        />
      </td>
    </tr>
  );
};

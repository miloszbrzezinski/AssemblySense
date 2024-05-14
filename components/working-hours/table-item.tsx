import { MoreVertical } from "lucide-react";
import { HoursInput } from "./hours-input";
import { ProjectsPopover } from "./projects-popover";
import AssemblyGroupPopover from "./assembly-groups-popover";
import { WorkingHours } from "@prisma/client";
import { db } from "@/lib/db";
import { WorkingHoursWithData } from "@/types";

interface WorkHoursItemProps {
  profileId: string;
  workspaceId: string;
  workingHours: WorkingHoursWithData;
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
        {workingHours.process?.processId} {workingHours.process?.name}
      </td>
      <td className="group-hover:bg-slate-100 border border-stone-300">
        S O U R C E
      </td>
    </tr>
  );
};

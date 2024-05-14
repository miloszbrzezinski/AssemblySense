import AssemblyGroupPopover from "@/components/working-hours/assembly-groups-popover";
import { HoursInput } from "@/components/working-hours/hours-input";
import { NewItemButton } from "@/components/working-hours/new-item-button";
import { ProjectsPopover } from "@/components/working-hours/projects-popover";
import { WorkHoursItem } from "@/components/working-hours/table-item";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MoreVertical, Plus, Timer } from "lucide-react";

export default async function WorkTimePage({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return;
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id: params.workspaceId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      projects: true,
    },
  });

  if (!workspace) {
    return;
  }

  const date = new Date(
    `${searchParams?.year}-${searchParams?.month}-${searchParams?.day}`
  );
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const workingHours = await db.workingHours.findMany({
    where: {
      projectMember: {
        workspaceMember: {
          profileId: profile.id,
        },
      },
    },
    include: {
      projectMember: {
        include: {
          project: {
            include: {
              assemblyGroups: {
                include: {
                  assemblyProcesses: true,
                },
              },
            },
          },
        },
      },
      assemblyGroup: true,
      process: {
        include: {
          assemblyGroup: true,
        },
      },
      target: true,
      component: {
        include: {
          component: true,
        },
      },
      sequence: true,
    },
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full items-center p-5">
        <p className="text-3xl font-light">
          {weekDays[date.getDay()]}, {date.getDate()} {months[date.getMonth()]}
        </p>
      </div>
      <div className="p-5">
        <table className="border-collapse shadow-md relative w-full bg-white">
          <thead className="h-14">
            <tr>
              <th className="sticky top-0 border bg-neutral-100/90 border-l-1 border-t-1 border-stone-300 w-10 min-w-10">
                <div className="flex items-center justify-center">
                  <Timer strokeWidth={1} />
                </div>
              </th>
              <th className="sticky top-0 border bg-neutral-100/95 border-t-1 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
                Time
              </th>
              <th className="sticky top-0 border bg-neutral-100/95 border-t-1 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
                Project
              </th>
              <th className="sticky top-0 border bg-neutral-100/95 border-t-1 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
                Group
              </th>
              <th className="sticky top-0 border bg-neutral-100/95 border-t-1 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
                Process
              </th>
              <th className="sticky top-0 border bg-neutral-100/95 border-t-1 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
                Source
              </th>
            </tr>
          </thead>
          <tbody className="pb-20">
            {workingHours.map((wh) => (
              <WorkHoursItem key={wh.id} workingHours={wh} />
            ))}
          </tbody>
        </table>
        <NewItemButton
          profileId={profile.id}
          workspaceId={workspace.id}
          projects={workspace.projects}
        />
      </div>
    </div>
  );
}

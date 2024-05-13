import { HoursInput } from "@/components/working-hours/hours-input";
import { NewItemButton } from "@/components/working-hours/new-item-button";
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
          project: true,
        },
      },
      assemblyGroup: true,
      process: {
        include: {
          assemblyGroup: true,
        },
      },
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
              <tr className="group h-10">
                <td className="group-hover:bg-slate-100 border border-l-1 border-stone-300">
                  <button className="hover:bg-slate-200 flex items-center justify-center h-10 w-full">
                    <MoreVertical
                      strokeWidth={1}
                      className="hidden group-hover:block"
                    />
                  </button>
                </td>
                <td className="group-hover:bg-slate-100 border border-stone-300">
                  <HoursInput />
                </td>
                <td className="group-hover:bg-slate-100 border border-stone-300">
                  {wh.projectMember.project.projectNo}:{" "}
                  {wh.projectMember.project.name}
                </td>
                <td className="group-hover:bg-slate-100 border border-stone-300">
                  {wh.assemblyGroup?.name}
                </td>
                <td className="group-hover:bg-slate-100 border border-stone-300">
                  {wh.process?.processId} {wh.process?.name}
                </td>
                <td className="group-hover:bg-slate-100 border border-stone-300">
                  S O U R C E
                </td>
              </tr>
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

import { ProjectTargetNavbar } from "@/components/projects/settings/project-targets-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MoreVertical, Target, Timer } from "lucide-react";

export default async function ProjectTargetsPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
  };
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
      projects: {
        where: {
          id: params.projectId,
        },
        include: {
          projectTargets: true,
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const project = workspace.projects[0];

  if (!project) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <ProjectTargetNavbar
        profileId={profile.id}
        workspaceId={workspace.id}
        projectId={project.id}
      />
      <table>
        <tbody>
          {project.projectTargets.map((target) => (
            <tr key={target.id} className="h-20 hover:bg-stone-200 select-none">
              <td className="w-16 max-w-16">
                <div className="flex w-16 items-center justify-center border-stone-400">
                  <Timer strokeWidth={1} className="w-12 h-12" />
                </div>
              </td>
              <td className="w-min whitespace-nowrap">
                <div className="border-stone-400/70 border-r border-l px-5">
                  <h3 className="text-2xl font-light">{target.name}</h3>
                  <p className="font-extralight">{target.description}</p>
                </div>
              </td>
              <td className="text-4xl font-light w-full pl-5">
                {target.target}
              </td>
              <td className="max-w-14 w-14">
                <div className="flex items-center justify-center">
                  <MoreVertical strokeWidth={1} className="w-7 h-7" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

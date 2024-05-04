import { ProjectTargetNavbar } from "@/components/projects/settings/project-targets-navbar";
import { ProjectTargetsTable } from "@/components/projects/settings/project-targets-table";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Edit, MoreVertical, Target, Timer, Trash } from "lucide-react";

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
      <ProjectTargetsTable
        profileId={profile.id}
        workspaceId={workspace.id}
        projectTargets={project.projectTargets}
      />
    </div>
  );
}

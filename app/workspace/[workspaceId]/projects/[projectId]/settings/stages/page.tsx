import { ProjectStagesList } from "@/components/projects/settings/project-stages-list";
import { ProjectStagesNavbar } from "@/components/projects/settings/project-stages-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectStagesPage({
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
          projectStages: true,
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
      <ProjectStagesNavbar
        profileId={profile.id}
        workspaceId={workspace.id}
        projectId={project.id}
      />
      <ProjectStagesList projectStages={project.projectStages} />
    </div>
  );
}

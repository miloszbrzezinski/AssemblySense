import { ProjectLayoutList } from "@/components/projects/design/layout/project-layout-list";
import { TitleBar } from "@/components/projects/design/titlebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { AssemblyProcessWithGroup } from "@/types";

export default async function ProjectDesignLayoutPage({
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

  const processes = await db.assemblyProcess.findMany({
    where: {
      assemblyGroup: {
        projectId: params.projectId,
      },
    },
    include: {
      assemblyGroup: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="h-full w-full flex flex-col">
      <TitleBar title="Layout" />
      <ProjectLayoutList
        profileId={profile.id}
        workspaceId={params.workspaceId}
        projectId={project.id}
        assemblyProcesses={processes}
      />
    </div>
  );
}

import { ProjectLayoutList } from "@/components/projects/design/layout/project-layout-list";
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
        include: {
          assemblyGroups: {
            include: {
              assemblyProcesses: {
                include: {
                  assemblyGroup: true,
                },
              },
            },
            // orderBy: {
            //   order: "asc",
            // },
          },
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const project = workspace.projects[0];

  const processes: AssemblyProcessWithGroup[] = [];

  project.assemblyGroups.forEach((g) => processes.push(...g.assemblyProcesses));

  if (!project) {
    return;
  }
  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b text-xl font-light items-center p-2 bg-white shadow-md">
        <p>Layout</p>
      </div>
      <ProjectLayoutList
        profileId={profile.id}
        workspaceId={params.workspaceId}
        projectId={project.id}
        assemblyProcesses={processes}
      />
    </div>
  );
}

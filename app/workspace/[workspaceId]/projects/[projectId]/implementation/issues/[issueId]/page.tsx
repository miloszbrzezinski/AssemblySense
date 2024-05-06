import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectIssuePage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
    issueId: string;
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
              assemblyProcesses: true,
            },
          },
          projectIssues: {
            where: {
              id: params.issueId,
            },
          },
          projectTargets: true,
          projectMembers: {
            include: {
              workspaceMember: {
                include: {
                  profile: true,
                  department: true,
                },
              },
            },
          },
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
      <div className="p-5">Issue {project.projectIssues[0].name}</div>
    </div>
  );
}

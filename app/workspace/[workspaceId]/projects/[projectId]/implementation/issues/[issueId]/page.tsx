import { IssueDiscutionComponent } from "@/components/projects/implementation/issue-discution-component";
import { ProjectMemberItem } from "@/components/projects/project-member-item";
import { Separator } from "@/components/ui/separator";
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
            include: {
              projectIssueComments: {
                include: {
                  projectMember: {
                    include: {
                      workspaceMember: {
                        include: {
                          department: true,
                          profile: true,
                        },
                      },
                    },
                  },
                },
              },
              applicant: {
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

  const projectIssue = project.projectIssues[0];

  if (!projectIssue) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-5 pb-20 h-full">
        <div className="w-full pb-5">
          <h2 className="font-light text-2xl">
            Project issue:{" "}
            <span className="font-normal">{projectIssue.name}</span>
          </h2>
        </div>

        <Separator className="bg-stone-300" />
        <div className="py-5 space-x-5 flex w-full h-full">
          <div className="space-y-5 flex flex-col w-1/3">
            <div className="border p-2 bg-white shadow-md">
              <h3 className="whitespace-nowrap text-xl">Reported by</h3>
              <ProjectMemberItem member={projectIssue.applicant} />
            </div>
            <div className="border p-2 bg-white shadow-md">
              <h3 className="whitespace-nowrap text-xl">Issue description</h3>
              <p className="text-lg font-light">{projectIssue.description}</p>
            </div>
          </div>
          <div className="space-y-5 flex flex-col w-2/3">
            <IssueDiscutionComponent
              profileId={profile.id}
              workspaceId={workspace.id}
              projectId={project.id}
              projectIssueId={projectIssue.id}
              projectIssueComments={projectIssue.projectIssueComments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

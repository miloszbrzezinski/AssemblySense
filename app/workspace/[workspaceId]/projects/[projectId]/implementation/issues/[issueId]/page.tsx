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
              assemblyGroup: true,
              process: true,
              component: {
                include: {
                  component: true,
                },
              },
              componentEvent: true,
              AddressIO: true,
              network: true,
              connection: true,
              sequence: true,
              sequenceStep: true,
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
            <span className="font-medium text-red-600 px-2">
              {"!".repeat(projectIssue.priority)}
            </span>
            Project issue:{" "}
            <span className="font-normal">{projectIssue.name}</span>
          </h2>
        </div>

        <Separator className="bg-stone-300" />
        <div className="py-5 space-x-5 flex w-full h-full">
          <div className="space-y-5 flex flex-col w-1/3">
            <div className="border p-2 bg-white shadow-md">
              <div>
                {projectIssue.assemblyGroup ? (
                  <p className="text-xl">
                    {projectIssue.assemblyGroup?.name}
                    {": "}
                    {projectIssue.process?.processId}{" "}
                    {projectIssue.process?.name}
                  </p>
                ) : (
                  <p className="text-xl">General</p>
                )}

                <p>
                  {projectIssue.component?.component.manufacturer}{" "}
                  {projectIssue.component?.component.name}{" "}
                  {projectIssue.component?.name}
                </p>
                <p>{projectIssue.componentEvent?.name}</p>
                <p>{projectIssue.AddressIO?.symbol}</p>
                <p>{projectIssue.sequence?.name}</p>
                <p>{projectIssue.sequenceStep?.name}</p>
                <p>{projectIssue.network?.name}</p>
                <p>{projectIssue.connection?.name}</p>
              </div>
              <ProjectMemberItem member={projectIssue.applicant} />
              <p className="font-light text-sm w-full text-end">
                {projectIssue.createdAt.getDay()}/
                {projectIssue.createdAt.getMonth()}/
                {projectIssue.createdAt.getFullYear()}
              </p>
            </div>
            <div className="border h-full p-2 bg-white shadow-md overflow-y-scroll">
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

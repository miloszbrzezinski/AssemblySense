import { ProjectComponentSidebar } from "@/components/projects/design/io-list/project-components-sidebar";
import { IOTable } from "@/components/projects/design/io-list/table/io-table";
import { TitleBar } from "@/components/projects/design/titlebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function IOListPage({
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
      componentCategories: {
        include: {
          components: true,
        },
      },
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
          projectComponents: {
            include: {
              component: true,
              assemblyGroup: true,
              assemblyProcess: true,
              componentEvents: {
                include: {
                  addressIO: true,
                  projectComponent: {
                    include: {
                      assemblyGroup: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              name: "asc",
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
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="min-w-[50%] h-full" defaultSize={80}>
          <TitleBar title="I/O list" />
          <div className="flex flex-col h-screen pb-52">
            <IOTable
              profileId={profile.id}
              workspaceId={workspace.id}
              projectComponents={project.projectComponents}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="shadow-lg shadow-black bg-stone-300" />
        <ResizablePanel className="min-w-72 h-full" defaultSize={20}>
          <ProjectComponentSidebar
            profileId={profile.id}
            projectId={params.projectId}
            projectComponents={project.projectComponents}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

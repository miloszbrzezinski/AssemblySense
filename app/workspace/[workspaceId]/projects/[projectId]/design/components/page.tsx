import { ComponentsTable } from "@/components/projects/design/components/components-table/components-table";
import { DesignLibrarySidebar } from "@/components/projects/design/components/library-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectDesignComponentsPage({
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
              componentEvents: true,
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
          <div className="border-b text-xl font-light items-center p-2 bg-white shadow-md">
            <p>Project components</p>
          </div>
          <div className="flex flex-col h-screen pb-52">
            <ComponentsTable
              profileId={profile.id}
              workspaceId={workspace.id}
              assemblyGroups={project.assemblyGroups}
              projectComponents={project.projectComponents}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="shadow-lg shadow-black bg-stone-300" />
        <ResizablePanel className="min-w-72 h-full" defaultSize={20}>
          <DesignLibrarySidebar
            profileId={profile.id}
            workspaceId={workspace.id}
            componentCategories={workspace.componentCategories}
            projectId={params.projectId}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

import { IOTable } from "@/components/projects/design/io-table/table/io-table";
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
            <p>I/O List</p>
          </div>
          <div className="p-2">
            <IOTable
              profileId={profile.id}
              workspaceId={workspace.id}
              assemblyGroups={project.assemblyGroups}
              projectComponents={project.projectComponents}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="shadow-lg shadow-black bg-stone-300" />
        <ResizablePanel
          className="min-w-72 h-full"
          defaultSize={20}
        ></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

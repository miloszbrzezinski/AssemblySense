import { EnableTable } from "@/components/projects/design/action-enables/table/enable-table";
import { ProjectComponentSidebar } from "@/components/projects/design/io-list/project-components-sidebar";
import { IOTable } from "@/components/projects/design/io-list/table/io-table";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function DesignEnablesPage({
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
      <div className="border-b text-xl font-light items-center p-2 bg-white shadow-md">
        <p>Action enables</p>
      </div>
      <div className="flex flex-col h-screen pb-52">
        <EnableTable
          profileId={profile.id}
          workspaceId={workspace.id}
          projectComponents={project.projectComponents}
        />
      </div>
    </div>
  );
}

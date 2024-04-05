import { DesignSidebar } from "@/components/projects/design/design-sidebar";
import ProjectNavbar from "@/components/projects/project-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Navbar } from "@/components/workspace/navbar";
import Sidebar from "@/components/workspace/sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectDesignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
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
              assemblyProcesses: true,
            },
            orderBy: {
              name: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  return (
    <div className="h-full flex bg-stone-100 dark:bg-zinc-800">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
          <DesignSidebar
            profileId={profile.id}
            workspaceId={params.workspaceId}
            projectId={params.projectId}
            assemblyGroups={workspace.projects[0].assemblyGroups}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="min-w-[50%] h-full" defaultSize={85}>
          <div className="w-full h-full transition-all bg-stone-100 dark:bg-zinc-800">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

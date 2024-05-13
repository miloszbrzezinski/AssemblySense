import { DesignSidebar } from "@/components/projects/design/design-sidebar";
import { DocumentationSidebar } from "@/components/projects/documentation/sidebar/documentation-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectDocumentationLayout({
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
    return <h1>Loading PL</h1>;
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
          projectComponents: true,
          projectMembers: true,
          projectNetworks: true,
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
    return <h1>Loading WL</h1>;
  }

  const project = workspace.projects[0];

  if (!project) {
    return <p>No project</p>;
  }

  return (
    <div className="h-full flex bg-stone-100 dark:bg-zinc-800">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
          <DocumentationSidebar projectId={params.projectId} />
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

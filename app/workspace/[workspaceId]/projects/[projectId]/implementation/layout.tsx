import { DesignSidebar } from "@/components/projects/design/design-sidebar";
import { ImplementationSidebar } from "@/components/projects/implementation/implementation-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectImplementatioLayout({
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
          projectIssues: true,
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
    return;
  }

  const project = workspace.projects[0];

  if (!project) {
    return <p>No project</p>;
  }

  return (
    <div className="h-full flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
          <ImplementationSidebar
            profileId={profile.id}
            workspaceId={params.workspaceId}
            projectId={params.projectId}
            assemblyGroups={project.assemblyGroups}
            projectMembers={project.projectMembers}
            projectComponents={project.projectComponents}
            projectNetworks={project.projectNetworks}
            projectProblems={project.projectIssues}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="min-w-[50%] h-full" defaultSize={85}>
          <div className="w-full h-full transition-all">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

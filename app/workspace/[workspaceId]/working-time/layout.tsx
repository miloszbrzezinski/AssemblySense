import { DesignSidebar } from "@/components/projects/design/design-sidebar";
import { ImplementationSidebar } from "@/components/projects/implementation/implementation-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkingHoursSidebar } from "@/components/working-hours/sidebar";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
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
    <div className="h-full w-full flex flex-col bg-stone-100 dark:bg-zinc-800">
      <SpaceNavbar spaceName="Working time"></SpaceNavbar>
      <div className="flex h-full w-full">
        <WorkingHoursSidebar
          profileId={profile.id}
          workspaceId={params.workspaceId}
          projectId={params.projectId}
          assemblyGroups={project.assemblyGroups}
          projectMembers={project.projectMembers}
          projectComponents={project.projectComponents}
          projectNetworks={project.projectNetworks}
          projectProblems={project.projectIssues}
        />
        {children}
      </div>
    </div>
  );
}

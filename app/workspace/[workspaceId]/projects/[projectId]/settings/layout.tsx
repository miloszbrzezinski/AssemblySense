import { DesignSidebar } from "@/components/projects/design/design-sidebar";
import { ProjectSettingsSidebar } from "@/components/projects/settings/project-settings-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
          projectTargets: true,
          projectMembers: true,
          projectNetworks: true,
          projectStages: true,
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
    <div className="h-full flex bg-stone-100 dark:bg-zinc-800">
      <ProjectSettingsSidebar
        profileId={profile.id}
        workspaceId={params.workspaceId}
        projectId={params.projectId}
        projectTargets={project.projectTargets}
        projectMembers={project.projectMembers}
        projectStages={project.projectStages}
      />
      <div className="w-full h-full transition-all bg-stone-100 dark:bg-zinc-800">
        {children}
      </div>
    </div>
  );
}

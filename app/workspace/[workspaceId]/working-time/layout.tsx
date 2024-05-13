import { DesignSidebar } from "@/components/projects/design/design-sidebar";
import { ImplementationSidebar } from "@/components/projects/implementation/implementation-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkingHoursSidebar } from "@/components/working-hours/sidebar";
import { WorkingHoursProjectsSidebar } from "@/components/working-hours/sidebar-projects";
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
  });

  if (!workspace) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col bg-stone-100 dark:bg-zinc-800">
      <SpaceNavbar spaceName="Working time"></SpaceNavbar>
      <div className="flex h-full w-full">
        <WorkingHoursSidebar />
        {children}
        <WorkingHoursProjectsSidebar
          profileId={profile.id}
          workspaceId={workspace.id}
        />
      </div>
    </div>
  );
}

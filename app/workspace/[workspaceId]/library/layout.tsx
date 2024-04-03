import { LibrarySidebar } from "@/components/library/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectDesignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    workspaceId: string;
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
          components: {
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
    <div className="h-full w-full bg-stone-100 dark:bg-zinc-800">
      <div className="absolute z-20 w-full left-0 md:pl-14 transition-all">
        <SpaceNavbar spaceName="Library" />
      </div>
      <div className="h-full flex pt-16">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
            <LibrarySidebar
              profileId={profile.id}
              workspaceId={params.workspaceId}
              componentCategories={workspace.componentCategories}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-w-[50%]" defaultSize={85}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

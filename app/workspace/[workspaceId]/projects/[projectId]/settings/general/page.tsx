import { AssetMembersSidebar } from "@/components/projects/design/members/asset-members-sidebar";
import { ProjectMembersList } from "@/components/projects/design/members/project-members-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ProjectMemberWithProfile } from "@/types";

export default async function ProjectDesignNetworkPage({
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
      projects: {
        where: {
          id: params.projectId,
        },
        include: {
          projectMembers: {
            include: {
              workspaceMember: {
                include: {
                  department: true,
                  profile: true,
                },
              },
            },
          },
        },
      },
      members: {
        include: {
          profile: true,
          projectMembers: true,
        },
      },
      departments: {
        include: {
          members: {
            include: {
              projectMembers: true,
              profile: true,
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

  const projectMembers = project.projectMembers as ProjectMemberWithProfile[];

  return <div className="h-full w-full flex">General</div>;
}

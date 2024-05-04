import { AssetMembersSidebar } from "@/components/projects/design/members/asset-members-sidebar";
import { ProjectMembersList } from "@/components/projects/design/members/project-members-list";
import { EditProjectIdForm } from "@/components/projects/edit-project-id-form";
import { EditProjectNameForm } from "@/components/projects/edit-project-name-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className="h-full w-full flex flex-col space-y-8 p-5 select-none overflow-y-scroll">
      <div className="w-full space-y-3">
        <h3 className="text-2xl font-normal">General</h3>
        <Separator className="bg-stone-500" />
        <EditProjectIdForm
          profileId={profile.id}
          workspaceId={workspace.id}
          project={project}
        />
        <EditProjectNameForm
          profileId={profile.id}
          workspaceId={workspace.id}
          project={project}
        />
      </div>
      <div className="w-full space-y-3">
        <h3 className="text-2xl font-normal">Features</h3>
        <Separator className="bg-stone-500" />
        <div className="w-full space-y-1 pl-2">
          <div className="flex items-center space-x-2">
            <Checkbox className="w-5 h-5" />
            <h4 className="text-lg">Documentation</h4>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox className="w-5 h-5" />
            <h4 className="text-lg">Project targets</h4>
          </div>
        </div>
      </div>
      <div className="w-full space-y-3">
        <h3 className="text-2xl font-normal">Danger zone</h3>
        <div className="w-1/2 space-y-1 border-2 border-red-800 bg-red-900/5 rounded-md">
          <div className="flex items-center justify-between p-3 w-full">
            <div>
              <h4>Change visibility</h4>
              <p className="font-light">
                Currently everyone can see this project.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-red-700 border-2 text-red-800"
            >
              Change visibility
            </Button>
          </div>
          <Separator className="bg-stone-900" />
          <div className="flex items-center justify-between p-3 w-full">
            <div>
              <h4>Change ownership</h4>
              <p className="font-light">Set owners of this project.</p>
            </div>
            <Button
              variant="outline"
              className="border-red-700 border-2 text-red-800"
            >
              Change
            </Button>
          </div>
          <Separator className="bg-stone-900" />
          <div className="flex items-center justify-between p-3 w-full">
            <div>
              <h4>Delete project</h4>
              <p className="font-light">Be aware. This can not be undone.</p>
            </div>
            <Button
              variant="outline"
              className="border-red-700 border-2 text-red-800"
            >
              Delete this project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

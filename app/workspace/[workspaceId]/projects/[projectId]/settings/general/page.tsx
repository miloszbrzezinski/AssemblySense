import { AssetMembersSidebar } from "@/components/projects/design/members/asset-members-sidebar";
import { ProjectMembersList } from "@/components/projects/design/members/project-members-list";
import { EditProjectCustomerForm } from "@/components/projects/edit-project-customer";
import { EditProjectIdForm } from "@/components/projects/edit-project-id-form";
import { EditProjectNameForm } from "@/components/projects/edit-project-name-form";
import { ProjectSettingsDangerZone } from "@/components/projects/settings/project-settings-danger-zone";
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
      customers: true,
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
        <EditProjectCustomerForm
          profileId={profile.id}
          workspaceId={workspace.id}
          project={project}
          customers={workspace.customers}
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
      <ProjectSettingsDangerZone
        profileId={profile.id}
        workspaceId={workspace.id}
        projectId={project.id}
      />
    </div>
  );
}

import { NetworkTable } from "@/components/projects/design/network/network-table/network-table";
import ProjectItem from "@/components/projects/project-item";
import ProjectNavbar from "@/components/projects/project-navbar";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import Image from "next/image";

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
      componentCategories: {
        include: {
          components: true,
        },
      },
      projects: {
        where: {
          id: params.projectId,
        },
        include: {
          projectNetworks: {
            include: {
              assemblyGroup: true,
              componentConnections: {
                include: {
                  projectComponent: {
                    include: {
                      component: true,
                      assemblyGroup: true,
                      assemblyProcess: true,
                      componentEvents: true,
                    },
                  },
                  projectNetwork: true,
                },
              },
            },
          },
          assemblyGroups: {
            include: {
              assemblyProcesses: true,
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
  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b text-xl font-light items-center p-2 bg-white shadow-md">
        <p>Network</p>
      </div>
      <div className="flex flex-col h-screen pb-52">
        <NetworkTable
          profileId={profile.id}
          workspaceId={params.workspaceId}
          projectId={params.projectId}
          projectNetworks={project.projectNetworks}
          assemblyGroups={project.assemblyGroups}
        />
      </div>
    </div>
  );
}

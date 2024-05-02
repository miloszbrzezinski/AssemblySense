import { ProjectComponentNavbar } from "@/components/projects/design/components/component-navbar";
import { ComponentConnectionList } from "@/components/projects/design/components/connections-list/connection-list";
import { ComponentEventList } from "@/components/projects/design/components/events-list/events-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProjectDesignComponentsPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
    componentId: string;
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
          projectNetworks: {

          },
          projectComponents: {
            where: {
              id: params.componentId,
            },
            include: {
              component: true,
              assemblyGroup: true,
              assemblyProcess: true,
              componentConnections: {
                include: {
                  projectNetwork: true,
                  projectComponent: {
                    include: {
                      component: true,
                      assemblyGroup: true,
                      assemblyProcess: true,
                      componentEvents: true,
                    },
                  },
                },
              },
              componentEvents: {
                include: {
                  projectComponent: {
                    include: {
                      assemblyGroup: true,
                    },
                  },
                  addressIO: true,
                },
              },
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

  const component = project.projectComponents[0];

  if (!component) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <ProjectComponentNavbar
        profileId={profile.id}
        workspaceId={workspace.id}
        projectComponent={component}
      />
      <div className="p-2 w-full h-full flex space-x-2">
        <ComponentEventList
          profileId={profile.id}
          workspaceId={workspace.id}
          projectComponent={component}
          events={component.componentEvents}
        />
        <ComponentConnectionList
          profileId={profile.id}
          workspaceId={workspace.id}
          projectComponent={component}
          projectNetworks={project.projectNetworks}
          connections={component.componentConnections}
        />
      </div>
    </div>
  );
}

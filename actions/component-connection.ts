"use server";

import { db } from "@/lib/db";
import { MemberRole, ProjectComponent, ProjectNetwork } from "@prisma/client";

export const addProjectComponentConnection = async (
  profileId: string,
  workspaceId: string,
  projectNetworks: ProjectNetwork,
  projectComponent: ProjectComponent,
) => {
  const workspace = await db.workspace.update({
    where: {
      id: workspaceId,
      members: {
        some: {
          profileId,
          role: {
            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
          },
        },
      },
    },
    data: {
      projects: {
        update: {
          where: {
            id: projectComponent.projectId,
          },
          data: {
            projectComponents: {
              update: {
                where: {
                  id: projectComponent.id,
                },
                data: {
                  componentConnections: {
                    create: {
                      name: "new connection",
                      hostPortion: "1",
                      description: "",
                      projectNetworkId: projectNetworks.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Connection added!` };
};

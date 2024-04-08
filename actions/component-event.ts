"use server";

import { db } from "@/lib/db";
import { MemberRole, ProjectComponent } from "@prisma/client";
import { z } from "zod";

export const addProjectComponentEvent = async (
  profileId: string,
  workspaceId: string,
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
                  componentEvents: {
                    create: {
                      name: "new event",
                      addressIO: {
                        create: {
                          symbol: "I0.0",
                          byteAdress: "0",
                          bitAdress: "0",
                        },
                      },
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

  return { success: `Event added!` };
};

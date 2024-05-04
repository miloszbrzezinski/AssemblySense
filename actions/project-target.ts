"use server";

import { db } from "@/lib/db";
import { CreateProjectTargetSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createProjectTarget = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  values: z.infer<typeof CreateProjectTargetSchema>
) => {
  const validatedFields = CreateProjectTargetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { targetName, targetValue, targetDescription, targetType } =
    validatedFields.data;

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
            id: projectId,
          },
          data: {
            projectTargets: {
              create: {
                name: targetName,
                target: targetValue,
                description: targetDescription,
                projectTargetType: targetType,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project target ${targetName} created` };
};

export const editProjectTarget = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  projectTargetId: string,
  values: z.infer<typeof CreateProjectTargetSchema>
) => {
  const validatedFields = CreateProjectTargetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { targetName, targetValue, targetDescription, targetType } =
    validatedFields.data;

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
            id: projectId,
          },
          data: {
            projectTargets: {
              update: {
                where: {
                  id: projectTargetId,
                },
                data: {
                  name: targetName,
                  target: targetValue,
                  description: targetDescription,
                  projectTargetType: targetType,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project target ${targetName} changed` };
};

export const removeProjectTarget = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  projectTargetId: string
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
            id: projectId,
          },
          data: {
            projectTargets: {
              delete: {
                id: projectTargetId,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project target removed` };
};

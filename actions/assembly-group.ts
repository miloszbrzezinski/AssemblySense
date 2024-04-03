"use server";

import { db } from "@/lib/db";
import { CreateAssemblyGroupSchema, CreateProjectSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createAssemblyGroup = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupName: string,
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
            assemblyGroups: {
              create: {
                name: assemblyGroupName,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Assembly group ${assemblyGroupName} created` };
};

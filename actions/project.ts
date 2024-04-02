"use server";

import { db } from "@/lib/db";
import { CreateProjectSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createProject = async (
  profileId: string,
  workspaceId: string,
  values: z.infer<typeof CreateProjectSchema>,
) => {
  const validatedFields = CreateProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { projectId, projectName, projectCustomer, customerDescription } =
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
        create: {
          projectNo: projectId,
          name: projectName,
          description: "",
          customerId: projectCustomer,
        },
      },
    },
  });

  return { success: `Project ${projectName} created` };
};

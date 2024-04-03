"use server";

import { db } from "@/lib/db";
import { CreateDepartmentSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const getWorkspaceByUser = async (profileId: string) => {
  const workspace = await db.workspace.findFirst({
    where: {
      members: {
        some: {
          profileId,
        },
      },
    },
  });

  return workspace;
};

export const getAllWorkspaceByUser = async (profileId: string) => {
  const workspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          profileId,
        },
      },
    },
  });

  return workspaces;
};

export const createWorkspace = async (
  profileId: string,
  workspaceName: string,
) => {
  const workspace = await db.workspace.create({
    data: {
      profileId,
      name: workspaceName,
      imageUrl: "",
      inviteCode: uuidv4(),
      members: {
        create: [{ profileId, role: MemberRole.ADMIN }],
      },
    },
  });

  return workspace;
};

export const createDepartment = async (
  profileId: string,
  workspaceId: string,
  values: z.infer<typeof CreateDepartmentSchema>,
) => {
  const validatedFields = CreateDepartmentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { departmentName } = validatedFields.data;

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
      departments: {
        create: {
          name: departmentName,
        },
      },
    },
  });

  return workspace;
};

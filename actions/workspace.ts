"use server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

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

"use server";

import { db } from "@/lib/db";
import { CreateProjectStageSchema } from "@/schemas";
import { MemberRole, ProjectTargetType } from "@prisma/client";
import { z } from "zod";

export const createProjectStage = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  values: z.infer<typeof CreateProjectStageSchema>
) => {
  const validatedFields = CreateProjectStageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { stageName, stageDescription } = validatedFields.data;

  // workspace access?
  const workspace = await db.workspace.findFirst({
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
  });

  if (!workspace) {
    return { error: "Workspace access denied!" };
  }

  //project member?
  const projectMember = await db.projectMember.findFirst({
    where: {
      project: {
        workspaceId: workspace.id,
      },
      projectId: projectId,
      workspaceMember: {
        profileId,
      },
    },
  });

  if (!projectMember) {
    return { error: "Project member not found!" };
  }

  //check existing stages
  const stages = await db.projectStage.findMany({
    where: {
      projectId,
    },
  });

  const nextStageOrder = stages.length;

  //create stage
  const projectStage = await db.projectStage.create({
    data: {
      name: stageName,
      description: stageDescription,
      order: nextStageOrder,
      projectId,
    },
  });

  return { success: `Project stage created` };
};

export const setActiveProjectStage = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  projectStageId: string
) => {
  // workspace access?
  const workspace = await db.workspace.findFirst({
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
  });

  if (!workspace) {
    return { error: "Workspace access denied!" };
  }

  //project member?
  const projectMember = await db.projectMember.findFirst({
    where: {
      project: {
        workspaceId: workspace.id,
      },
      projectId: projectId,
      workspaceMember: {
        profileId,
      },
    },
  });

  if (!projectMember) {
    return { error: "Project member not found!" };
  }

  //deactivate old stage
  const oldActivestage = await db.projectStage.findFirst({
    where: {
      projectId,
      active: true,
    },
  });

  if (oldActivestage) {
    await db.projectStage.update({
      where: {
        id: oldActivestage.id,
      },
      data: {
        active: false,
      },
    });
  }

  //activate new
  await db.projectStage.update({
    where: {
      id: projectStageId,
    },
    data: {
      active: true,
    },
  });

  return { success: `Project stage activated` };
};

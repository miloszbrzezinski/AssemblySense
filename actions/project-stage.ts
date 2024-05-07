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

  const { stageName, stageDescription, stageStartDate, stageDeadline } =
    validatedFields.data;

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
      startDate: new Date(stageStartDate),
      deadline: new Date(stageDeadline),
    },
  });

  //activate if first
  if (stages.length === 0) {
    await db.projectStage.update({
      where: {
        id: projectStage.id,
      },
      data: {
        active: true,
      },
    });
  }

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

export const removeProjectStage = async (
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

  //deactivate old stage and reorder
  const oldProjectStage = await db.projectStage.findUnique({
    where: {
      id: projectStageId,
    },
  });

  if (!oldProjectStage) {
    return { error: "Project stage not found!" };
  }

  const allProjectStages = await db.projectStage.findMany({
    where: {
      projectId,
    },
    orderBy: {
      order: "asc",
    },
  });

  //Active project stage reassigning
  if (oldProjectStage.active && allProjectStages.length > 1) {
    if (oldProjectStage.order === 0) {
      const newActivate = await db.projectStage.findFirst({
        where: {
          projectId,
          order: 1,
        },
      });
      if (newActivate) {
        await db.projectStage.update({
          where: {
            id: newActivate.id,
          },
          data: {
            active: true,
          },
        });
      }
    }
    if (oldProjectStage.order > 0) {
      const newActivate = await db.projectStage.findFirst({
        where: {
          projectId,
          order: oldProjectStage.order - 1,
        },
      });
      if (newActivate) {
        await db.projectStage.update({
          where: {
            id: newActivate.id,
          },
          data: {
            active: true,
          },
        });
      }
    }
  }

  //remove project stage
  await db.projectStage.delete({
    where: {
      id: projectStageId,
    },
  });

  //reordering stages
  await db.projectStage.updateMany({
    where: {
      projectId,
      order: {
        gt: oldProjectStage.order,
      },
    },
    data: {
      order: {
        decrement: 1,
      },
    },
  });

  return { success: `Project stage removed` };
};

"use server";

import { EditProjectNameForm } from "@/components/projects/edit-project-name-form";
import { db } from "@/lib/db";
import {
  CreateProjectSchema,
  EditProjectIdSchema,
  EditProjectNameSchema,
} from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createProject = async (
  profileId: string,
  workspaceId: string,
  values: z.infer<typeof CreateProjectSchema>
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

export const editProjectId = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  values: z.infer<typeof EditProjectIdSchema>
) => {
  const validatedFields = EditProjectIdSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { projectNo } = validatedFields.data;

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
            projectNo,
          },
        },
      },
    },
  });

  return { success: `Project ID changed` };
};

export const editProjectName = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  values: z.infer<typeof EditProjectNameSchema>
) => {
  const validatedFields = EditProjectNameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { projectName } = validatedFields.data;

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
            name: projectName,
          },
        },
      },
    },
  });

  return { success: `Project name changed` };
};

export const editProjectCustomer = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  customerId: string
) => {
  if (!customerId) {
    return { error: "Invalid fields!" };
  }

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
            customerId,
          },
        },
      },
    },
  });

  return { success: `Project customer changed` };
};

export const editProjectDescription = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  description: string
) => {
  if (!description) {
    return { error: "Invalid fields!" };
  }

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
            description,
          },
        },
      },
    },
  });

  return { success: `Project description changed` };
};

export const removeProject = async (
  profileId: string,
  workspaceId: string,
  projectId: string
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
        delete: {
          id: projectId,
        },
      },
    },
  });

  return { success: `Project removed` };
};

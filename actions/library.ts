"use server";

import { db } from "@/lib/db";
import { CreateComponentSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createComponentCategory = async (
  profileId: string,
  workspaceId: string,
  categoryName: string,
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
      componentCategories: {
        create: {
          name: categoryName,
        },
      },
    },
  });

  return { success: `Component category ${categoryName} created` };
};

export const createComponent = async (
  profileId: string,
  workspaceId: string,
  componentCategoryId: string,
  values: z.infer<typeof CreateComponentSchema>,
) => {
  const validatedFields = CreateComponentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { componentName, componentManufacturer } = validatedFields.data;

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
      componentCategories: {
        update: {
          where: {
            id: componentCategoryId,
          },
          data: {
            components: {
              create: {
                name: componentName,
                manufacturer: componentManufacturer,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Component category ${componentName} created` };
};

"use server";

import { db } from "@/lib/db";
import { CreateCustomerSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createCustomer = async (
  profileId: string,
  workspaceId: string,
  values: z.infer<typeof CreateCustomerSchema>,
) => {
  const validatedFields = CreateCustomerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { customerName, customerDescription } = validatedFields.data;

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
      customers: {
        create: {
          name: customerName,
          description: customerDescription,
        },
      },
    },
  });

  return { success: `Customer ${customerName} created` };
};

"use server";
import { db } from "@/lib/db";
import { WORKSPACE_ROLE } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const createWage = async (
  userId: string,
  workspaceId: string,
  wagesName: string,
  budgetRate: string,
  salesRate: string,
) => {
  const workspace = await db.workspace.update({
    where: {
      id: workspaceId,
      workspaceMembers: {
        some: {
          userId,
          role: {
            in: [WORKSPACE_ROLE.ADMIN, WORKSPACE_ROLE.MANAGER],
          },
        },
      },
    },
    data: {
      wages: {
        create: {
          name: wagesName,
          budgetRate,
          salesRate,
        },
      },
    },
  });

  return { success: `Wage ${wagesName} created` };
};

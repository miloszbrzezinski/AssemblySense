"use server";

import { db } from "@/lib/db";
import { BUDGET_RECORD_TYPE, WORKSPACE_ROLE, Wages } from "@prisma/client";

export const createProject = async (
  userId: string,
  workspaceId: string,
  projectNo: string,
  projectName: string,
  projectCustomer: string,
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
      projects: {
        create: {
          projectNo,
          name: projectName,
          customer: projectCustomer,
        },
      },
    },
  });

  return { success: `Project ${projectName} created` };
};

export const createBudgetGroup = async (
  userId: string,
  workspaceId: string,
  projectId: string,
  budgetGroupName: string,
  budgetGroupColor: string,
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
      projects: {
        update: {
          where: {
            id: projectId,
          },
          data: {
            budgetGroups: {
              create: {
                name: budgetGroupName,
                color: budgetGroupColor,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project ${budgetGroupName} created` };
};

export const addBudgetRecord = async (
  userId: string,
  workspaceId: string,
  projectId: string,
  budgetGroupId: string,
  selectedType: BUDGET_RECORD_TYPE,
  budgetRecordName: string,
  budgetWageId: string,
  budgetValue: string,
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
      projects: {
        update: {
          where: {
            id: projectId,
          },
          data: {
            budgetGroups: {
              update: {
                where: {
                  id: budgetGroupId,
                },
                data: {
                  budgetRecords: {
                    create: {
                      name: budgetRecordName,
                      type: selectedType,
                      value: budgetValue,
                      wagesId: budgetWageId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project ${budgetRecordName} created` };
};

"use server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export const addProcessSequence = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
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
        update: {
          where: {
            id: projectId,
          },
          data: {
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          create: {
                            name: "new_sequence",
                            sequenceStep: {
                              create: {
                                name: "Initial step",
                                stepNextReqFormula: "",
                              },
                            },
                          },
                        },
                      },
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

  return { success: `New sequence added!` };
};

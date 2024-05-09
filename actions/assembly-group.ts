"use server";

import { db } from "@/lib/db";
import {
  CreateAssemblyGroupSchema,
  CreateProcessSchema,
  CreateProjectSchema,
} from "@/schemas";
import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const createAssemblyGroup = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupName: string
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
              create: {
                name: assemblyGroupName,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Assembly group ${assemblyGroupName} created` };
};

export const setAssemblyGroupName = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupId: string,
  assemblyGroupName: string
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
                  id: assemblyGroupId,
                },
                data: {
                  name: assemblyGroupName,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Assembly group name changed` };
};

export const createProcess = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupId: string,
  values: z.infer<typeof CreateProcessSchema>
) => {
  const validatedFields = CreateProcessSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { processId, processName } = validatedFields.data;

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
                  id: assemblyGroupId,
                },
                data: {
                  assemblyProcesses: {
                    create: {
                      processId: processId,
                      name: processName,
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

  return { success: `Process ${processName} created` };
};

export const removeProcess = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupId: string,
  processId: string
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
                  id: assemblyGroupId,
                },
                data: {
                  assemblyProcesses: {
                    delete: {
                      id: processId,
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

  return { success: `Process removed!` };
};

export const setProcessNo = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupId: string,
  processId: string,
  processNo: string
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
                  id: assemblyGroupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        processId: processNo,
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

  return { success: `Process ID changed!` };
};

export const setProcessName = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  assemblyGroupId: string,
  processId: string,
  name: string
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
                  id: assemblyGroupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        name,
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

  return { success: `Process name changed!` };
};

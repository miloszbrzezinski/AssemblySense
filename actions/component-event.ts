"use server";

import { db } from "@/lib/db";
import { MemberRole, ProjectComponent } from "@prisma/client";
import { z } from "zod";

export const addProjectComponentEvent = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
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
            id: projectComponent.projectId,
          },
          data: {
            projectComponents: {
              update: {
                where: {
                  id: projectComponent.id,
                },
                data: {
                  componentEvents: {
                    create: {
                      name: "new event",
                      addressIO: {
                        create: {
                          symbol: "I0.0",
                          byteAdress: "0",
                          bitAdress: "0",
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

  return { success: `Event added!` };
};

export const setComponentEventName = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
  name: string,
  projectId: string,
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
            projectComponents: {
              update: {
                where: {
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
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

  return { success: `Component event changed!` };
};

export const setComponentEventDescription = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
  description: string,
  projectId: string,
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
            projectComponents: {
              update: {
                where: {
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
                      },
                      data: {
                        description,
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

  return { success: `Component event description changed!` };
};

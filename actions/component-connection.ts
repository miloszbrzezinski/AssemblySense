"use server";

import { db } from "@/lib/db";
import { MemberRole, ProjectComponent, ProjectNetwork } from "@prisma/client";

export const addProjectComponentConnection = async (
  profileId: string,
  workspaceId: string,
  projectNetworks: ProjectNetwork,
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
                  componentConnections: {
                    create: {
                      name: "new connection",
                      hostPortion: "1",
                      description: "",
                      projectNetworkId: projectNetworks.id,
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

  return { success: `Connection added!` };
};


export const removeProjectComponentConnection = async (
  profileId: string,
  workspaceId: string,
  componentConnectionId: string,
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
                  componentConnections: {
                    delete:{
                      id: componentConnectionId
                    }
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Connection removed!` };
};

export const setProjectComponentConnectionDescription = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
  componentConnectionId: string,
  description: string
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
                  componentConnections: {
                    update:{
                      where: {
                        id: componentConnectionId
                      },
                      data: {
                        description
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Connection description changed!` };
};


export const setProjectComponentConnectionNetwork = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
  componentConnectionId: string,
  projectNetworkId: string
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
                  componentConnections: {
                    update:{
                      where: {
                        id: componentConnectionId
                      },
                      data: {
                        projectNetworkId
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Connection network changed!` };
};
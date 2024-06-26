"use server";

import { db } from "@/lib/db";
import { MemberRole, ProjectNetwork } from "@prisma/client";
import { z } from "zod";

export const addProjectNetwork = async (
  profileId: string,
  workspaceId: string,
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
            projectNetworks: {
              create: {
                name: "new network",
                subnetMask: "255.255.255.0",
                networkPortion: "192.168.1",
              },
            },
          },
        },
      },
    },
  });

  return { success: `Network added` };
};

export const setProjectNetworkAssembyGroup = async (
  profileId: string,
  workspaceId: string,
  projectNetwork: ProjectNetwork,
  assemblyGroupId: string | null,
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
            projectNetworks: {
              update: {
                where: {
                  id: projectNetwork.id,
                },
                data: {
                  assemblyGroupId,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Network control group changed!` };
};

export const setProjectNetworkName = async (
  profileId: string,
  workspaceId: string,
  projectNetwork: ProjectNetwork,
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
            projectNetworks: {
              update: {
                where: {
                  id: projectNetwork.id,
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
  });

  return { success: `Network name changed!` };
};

export const setProjectNetworkAddress = async (
  profileId: string,
  workspaceId: string,
  projectNetwork: ProjectNetwork,
  projectId: string,
  subnetMask: string,
  networkPortion: string,
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
            projectNetworks: {
              update: {
                where: {
                  id: projectNetwork.id,
                },
                data: {
                  subnetMask,
                  networkPortion,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Network address changed!` };
};

export const setProjectNetworkDescription = async (
  profileId: string,
  workspaceId: string,
  projectNetwork: ProjectNetwork,
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
            projectNetworks: {
              update: {
                where: {
                  id: projectNetwork.id,
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
  });

  return { success: `Network description changed!` };
};


export const removeProjectNetwork = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  projectNetworkId: string,
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
            projectNetworks: {
              delete: {
                id: projectNetworkId,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Network removed!` };
};
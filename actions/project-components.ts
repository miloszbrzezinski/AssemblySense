"use server";

import { db } from "@/lib/db";
import { ProjectMemberWithProfile } from "@/types";
import {
  AssemblyProcess,
  Component,
  Member,
  MemberRole,
  ProjectComponent,
  ProjectMember,
} from "@prisma/client";

export const addProjectComponent = async (
  profileId: string,
  workspaceId: string,
  component: Component,
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
              create: {
                name: "new_component",
                componentId: component.id,
                status: "",
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project component added!` };
};

export const setComponentsAssemblyGroup = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
  assemblyGroupId: string | null | undefined,
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
                  id: projectComponent.id,
                },
                data: {
                  assemblyGroupId: assemblyGroupId,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project component group changed!` };
};

export const setComponentsAssemblyProcess = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
  assemblyProcess: AssemblyProcess | null | undefined,
  projectId: string,
) => {
  const workspace = await db.workspace.findUnique({
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
    include: {
      projects: {
        where: { id: projectId },
        include: {
          projectComponents: {
            where: {
              id: projectComponent.id,
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return { error: `Workspace not found!` };
  }

  if (!workspace.projects[0]) {
    return { error: `Project not found!` };
  }

  if (!workspace.projects[0].projectComponents[0]) {
    return { error: `Project component not found!` };
  }

  let groupId = workspace.projects[0].projectComponents[0].assemblyGroupId;

  if (assemblyProcess) {
    groupId = assemblyProcess.assemblyGroupId;
  }

  await db.projectComponent.update({
    where: {
      id: projectComponent.id,
    },
    data: {
      assemblyGroupId: groupId,
      assemblyProcessId: assemblyProcess?.id,
    },
  });

  return { success: `Project component process changed!` };
};

export const setProjectComponentsName = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
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
                  id: projectComponent.id,
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

  return { success: `Project component symbol changed!` };
};

export const setProjectComponentDescription = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
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
                  id: projectComponent.id,
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

  return { success: `Project component comment changed!` };
};

export const setProjectComponentStatus = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
  status: string,
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
                  id: projectComponent.id,
                },
                data: {
                  status,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project component status changed!` };
};

export const removeProjectComponent = async (
  profileId: string,
  projectMember: ProjectMemberWithProfile,
) => {
  const workspace = await db.workspace.update({
    where: {
      id: projectMember.workspaceMember.workspaceId,
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
            id: projectMember.projectId,
          },
          data: {
            projectMembers: {
              delete: {
                id: projectMember.id,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project component removed!` };
};

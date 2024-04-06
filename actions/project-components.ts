"use server";

import { db } from "@/lib/db";
import { ProjectMemberWithProfile } from "@/types";
import {
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

  return { success: `Project component added!` };
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

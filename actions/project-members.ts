"use server";

import { db } from "@/lib/db";
import { ProjectMemberWithProfile } from "@/types";
import { Member, MemberRole, ProjectMember } from "@prisma/client";

export const addProjectMember = async (
  profileId: string,
  member: Member,
  projectId: string,
) => {
  const workspace = await db.workspace.update({
    where: {
      id: member.workspaceId,
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
            projectMembers: {
              create: {
                workspaceMemberId: member.id,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project member added!` };
};

export const setProjectMemberLeader = async (
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
              update: {
                where: {
                  id: projectMember.id,
                },
                data: {
                  isLeader: !projectMember.isLeader,
                },
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project member status changed!` };
};

export const removeProjectMember = async (
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

  return { success: `Project member removed!` };
};

"use server";

import { db } from "@/lib/db";
import { Member, MemberRole } from "@prisma/client";

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

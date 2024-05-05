"use server";

import { db } from "@/lib/db";
import { ReportProjectIssueSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { constants } from "http2";
import { z } from "zod";

export const reportProjectNetworkIssue = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  values: z.infer<typeof ReportProjectIssueSchema>,
  networkId: string
) => {
  const validatedFields = ReportProjectIssueSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { problemName, problemDescription } = validatedFields.data;

  const projectMember = await db.projectMember.findFirst({
    where: {
      projectId: projectId,
      workspaceMember: {
        profileId,
      },
    },
  });

  if (!projectMember) {
    return { error: "Project member not found" };
  }

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
            projectIssues: {
              create: {
                name: problemName,
                description: problemDescription,
                applicantId: projectMember.id,
                networkId,
              },
            },
          },
        },
      },
    },
  });

  return { success: `Project problem reported` };
};
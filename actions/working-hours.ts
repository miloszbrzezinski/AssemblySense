"use server";

import { db } from "@/lib/db";
import { MemberRole, WorkingHours } from "@prisma/client";

export const reportWorkingHours = async (
  profileId: string,
  workspaceId: string,
  projectId: string
) => {
  // workspace access?
  const workspace = await db.workspace.findFirst({
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
  });

  if (!workspace) {
    return { error: "Workspace access denied!" };
  }

  //project member?
  const projectMember = await db.projectMember.findFirst({
    where: {
      project: {
        workspaceId: workspace.id,
      },
      projectId: projectId,
      workspaceMember: {
        profileId,
      },
    },
  });

  if (!projectMember) {
    return { error: "Project member not found!" };
  }

  //report working hours
  const workingHours = await db.workingHours.create({
    data: {
      value: 0,
      description: "",
      projectMemberId: projectMember.id,
    },
  });

  return { success: "Working hours reported" };
};

export const setWorkingHoursProject = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  workingHours: WorkingHours
) => {
  // workspace access?
  const workspace = await db.workspace.findFirst({
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
  });

  if (!workspace) {
    return { error: "Workspace access denied!" };
  }

  //project member?
  const projectMember = await db.projectMember.findFirst({
    where: {
      project: {
        workspaceId: workspace.id,
      },
      projectId: projectId,
      workspaceMember: {
        profileId,
      },
    },
  });

  if (!projectMember) {
    return { error: "Project member not found!" };
  }

  //set project
  await db.workingHours.update({
    where: {
      id: workingHours.id,
    },
    data: {
      projectMemberId: projectMember.id,
    },
  });

  return { success: "Working hours updated" };
};

export const setWorkingHoursProjectAssemblyGroup = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  workingHours: WorkingHours,
  assemblyGroupId: string | null
) => {
  // workspace access?
  const workspace = await db.workspace.findFirst({
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
  });

  if (!workspace) {
    return { error: "Workspace access denied!" };
  }

  //project member?
  const projectMember = await db.projectMember.findFirst({
    where: {
      project: {
        workspaceId: workspace.id,
      },
      projectId: projectId,
      workspaceMember: {
        profileId,
      },
    },
  });

  if (!projectMember) {
    return { error: "Project member not found!" };
  }

  //set project
  await db.workingHours.update({
    where: {
      id: workingHours.id,
    },
    data: {
      assemblyGroupId,
    },
  });

  return { success: "Working hours updated" };
};

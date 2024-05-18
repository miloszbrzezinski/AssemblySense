"use server";

import { db } from "@/lib/db";
import { MemberRole, WorkingHours } from "@prisma/client";

export const reportWorkingHours = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  date: Date
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
      date,
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

export const setWorkingHoursTime = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  workingHours: WorkingHours,
  time: number
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
      value: time,
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

export const setWorkingHoursProjectAssemblyGroupProcess = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  workingHours: WorkingHours,
  processId: string | null
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
      processId,
    },
  });

  return { success: "Working hours updated" };
};

export const setWorkingHoursSource = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  workingHours: WorkingHours,
  componentId: string | null,
  targetId: string | null,
  sequenceId: string | null,
  projectIssueId: string | null
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
      componentId,
      targetId,
      sequenceId,
      projectIssueId,
    },
  });

  return { success: "Working hours updated" };
};

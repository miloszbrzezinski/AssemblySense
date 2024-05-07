"use server";

import { db } from "@/lib/db";
import { ReportProjectIssueSchema } from "@/schemas";
import {
  AddressIO,
  AssemblyGroup,
  AssemblyProcess,
  ComponentConnection,
  ComponentEvent,
  MemberRole,
  ProjectComponent,
  ProjectNetwork,
  Sequence,
  SequenceStep,
} from "@prisma/client";
import { constants } from "http2";
import { z } from "zod";

export const reportProblem = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  values: z.infer<typeof ReportProjectIssueSchema>,
  priority: number,
  assemblyGroupId?: string,
  assemblyProcessId?: string,
  network?: ProjectNetwork,
  networkConnection?: ComponentConnection,
  projectComponent?: ProjectComponent,
  projectComponentEvent?: ComponentEvent,
  projectComponentEventAddressIO?: AddressIO,
  sequence?: Sequence,
  sequenceStep?: SequenceStep
) => {
  const validatedFields = ReportProjectIssueSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { problemName, problemDescription } = validatedFields.data;

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

  //report problem
  const projectIssue = await db.projectIssue.create({
    data: {
      name: problemName,
      description: problemDescription,
      applicantId: projectMember.id,
      projectId,
      priority,
    },
  });

  if (assemblyGroupId) {
    assignAssembyGroup(projectIssue.id, assemblyGroupId);
  }
  if (assemblyProcessId) {
    assignAssembyProcess(projectIssue.id, assemblyProcessId);
  }

  if (network) {
    assignNetwork(projectIssue.id, network.id);
    return { success: `Project problem reported` };
  }
  if (networkConnection) {
    assignNetworkConnection(projectIssue.id, networkConnection.id);
    return { success: `Project problem reported` };
  }
  if (projectComponent) {
    assignProjectComponent(projectIssue.id, projectComponent.id);
    return { success: `Project problem reported` };
  }
  if (projectComponentEvent) {
    assignProjectComponentEvent(projectIssue.id, projectComponentEvent.id);
    return { success: `Project problem reported` };
  }
  if (projectComponentEventAddressIO) {
    assignProjectComponentEventAddress(
      projectIssue.id,
      projectComponentEventAddressIO.id
    );
    return { success: `Project problem reported` };
  }
  if (sequence) {
    assignSequence(projectIssue.id, sequence.id);
    return { success: `Project problem reported` };
  }
  if (sequenceStep) {
    assignSequenceStep(projectIssue.id, sequenceStep.id);
    return { success: `Project problem reported` };
  }
};

const assignAssembyGroup = async (
  projectIssueId: string,
  assemblyGroupId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      assemblyGroupId,
    },
  });
};

const assignAssembyProcess = async (
  projectIssueId: string,
  processId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      processId,
    },
  });
};

const assignNetwork = async (projectIssueId: string, networkId: string) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      networkId,
    },
  });
};

const assignNetworkConnection = async (
  projectIssueId: string,
  connectionId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      connectionId,
    },
  });
};

const assignProjectComponent = async (
  projectIssueId: string,
  componentId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      componentId,
    },
  });
};

const assignProjectComponentEvent = async (
  projectIssueId: string,
  componentEventId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      componentEventId,
    },
  });
};

const assignProjectComponentEventAddress = async (
  projectIssueId: string,
  addressIOId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      addressIOId,
    },
  });
};

const assignSequence = async (projectIssueId: string, sequenceId: string) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      sequenceId,
    },
  });
};

const assignSequenceStep = async (
  projectIssueId: string,
  sequenceStepId: string
) => {
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      sequenceStepId,
    },
  });
};

export const addComment = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  projectIssueId: string,
  content: string
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

  //add comment
  await db.projectIssue.update({
    where: {
      id: projectIssueId,
    },
    data: {
      projectIssueComments: {
        create: {
          content,
          projectMemberId: projectMember.id,
        },
      },
    },
  });
  return { success: "Comment added" };
};

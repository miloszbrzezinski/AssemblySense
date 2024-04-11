"use server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export const addProcessSequence = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          create: {
                            name: "new_sequence",
                            sequenceStep: {
                              create: {
                                name: "Initial step",
                                stepNextReqFormula: "",
                              },
                            },
                          },
                        },
                      },
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

  return { success: `New sequence added!` };
};

export const removeProcessSequence = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          delete: {
                            id: sequenceId,
                          },
                        },
                      },
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

  return { success: `New sequence added!` };
};

export const setProcessSequenceName = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  name: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
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
              },
            },
          },
        },
      },
    },
  });

  return { success: `Name sequence changed!` };
};

export const setProcessSequenceDescription = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  description: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
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
              },
            },
          },
        },
      },
    },
  });

  return { success: `Description sequence changed!` };
};

export const addSequenceStep = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                create: {
                                  name: "New step",
                                  stepNextReqFormula: "",
                                },
                              },
                            },
                          },
                        },
                      },
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

  return { success: `New sequence step added!` };
};

export const rmoveSequenceStep = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  stepId: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                delete: {
                                  id: stepId,
                                },
                              },
                            },
                          },
                        },
                      },
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

  return { success: `New sequence step added!` };
};

export const setSequenceStepName = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  stepId: string,
  name: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                update: {
                                  where: {
                                    id: stepId,
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

  return { success: `Step name changed!` };
};

export const setSequenceStepNote = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  stepId: string,
  description: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                update: {
                                  where: {
                                    id: stepId,
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

  return { success: `Step sequence note changed!` };
};

export const setSequenceStepCondition = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  stepId: string,
  stepNextReqFormula: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                update: {
                                  where: {
                                    id: stepId,
                                  },
                                  data: {
                                    stepNextReqFormula,
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
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

  return { success: `Next step condition changed!` };
};

export const addSequenceStepAction = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  stepId: string,
  eventId: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                update: {
                                  where: {
                                    id: stepId,
                                  },
                                  data: {
                                    componentsEvents: {
                                      connect: {
                                        id: eventId,
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
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

  return { success: `Step action added!` };
};

export const removeSequenceStepAction = async (
  profileId: string,
  workspaceId: string,
  projectId: string,
  groupId: string,
  processId: string,
  sequenceId: string,
  stepId: string,
  eventId: string,
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
            assemblyGroups: {
              update: {
                where: {
                  id: groupId,
                },
                data: {
                  assemblyProcesses: {
                    update: {
                      where: {
                        id: processId,
                      },
                      data: {
                        sequences: {
                          update: {
                            where: {
                              id: sequenceId,
                            },
                            data: {
                              sequenceStep: {
                                update: {
                                  where: {
                                    id: stepId,
                                  },
                                  data: {
                                    componentsEvents: {
                                      disconnect: {
                                        id: eventId,
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
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

  return { success: `Step action added!` };
};

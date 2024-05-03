"use server";

import { db } from "@/lib/db";
import { EventType, MemberRole, ProjectComponent } from "@prisma/client";
import { z } from "zod";

export const addProjectComponentEvent = async (
  profileId: string,
  workspaceId: string,
  projectComponent: ProjectComponent,
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
            id: projectComponent.projectId,
          },
          data: {
            projectComponents: {
              update: {
                where: {
                  id: projectComponent.id,
                },
                data: {
                  componentEvents: {
                    create: {
                      name: "new event",
                      eventEnableFormula: "",
                      addressIO: {
                        create: {
                          symbol: "I0.0",
                          byteAdress: "0",
                          bitAdress: "0",
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

  return { success: `Event added!` };
};

export const setComponentEventName = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
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
  });

  return { success: `Component event changed!` };
};

export const setComponentEventEnable = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
  eventEnableFormula: string,
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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
                      },
                      data: {
                        eventEnableFormula,
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

  return { success: `Component action enabled changed!` };
};

export const setComponentEventEnableComment = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
  eventEnableComment: string,
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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
                      },
                      data: {
                        eventEnableComment,
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

  return { success: `Comment changed!` };
};

export const setComponentEventDescription = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
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
  });

  return { success: `Component event description changed!` };
};

export const setComponentEventSymbol = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
  symbol: string,
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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
                      },
                      data: {
                        addressIO: {
                          update: {
                            data: {
                              symbol,
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

  return { success: `Component event symbol changed!` };
};

export const setComponentEventAddress = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
  address: string,
  projectId: string,
) => {
  const eventType = address[0] === "I" ? EventType.STATUS : EventType.ACTION;
  const byteAdress = address.split(".")[0].substring(1);
  const bitAdress = address.split(".")[1];

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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    update: {
                      where: {
                        id: componentEventId,
                      },
                      data: {
                        eventType: eventType,
                        addressIO: {
                          update: {
                            data: {
                              byteAdress,
                              bitAdress,
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

  return { success: `Component event address changed!` };
};



export const removeProjectComponentEvent = async (
  profileId: string,
  workspaceId: string,
  projectComponentId: string,
  componentEventId: string,
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
                  id: projectComponentId,
                },
                data: {
                  componentEvents: {
                    delete: {
                        id: componentEventId,
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

  return { success: `Component event removed!` };
};
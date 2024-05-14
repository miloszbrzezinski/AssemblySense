import {
  AddressIO,
  AssemblyGroup,
  AssemblyProcess,
  Component,
  ComponentCategory,
  ComponentConnection,
  ComponentEvent,
  Customer,
  Department,
  Member,
  Profile,
  Project,
  ProjectComponent,
  ProjectIssueComment,
  ProjectMember,
  ProjectNetwork,
  ProjectStage,
  ProjectTarget,
  Sequence,
  SequenceStep,
  WorkingHours,
} from "@prisma/client";

export type ProjectWithCustomer = Project & {
  customer: Customer;
} & { projectStages: ProjectStage[] };

export type ComponentCategoryWithComponents = ComponentCategory & {
  components: Component[];
};

export type AssemblyGroupWithProcesses = AssemblyGroup & {
  assemblyProcesses: AssemblyProcess[];
};

export type AssemblyProcessWithGroup = AssemblyProcess & {
  assemblyGroup: AssemblyGroup;
};

export type MemberWithProfile = Member & {
  profile: Profile;
};

export type MemberWithProfileWithProjects = MemberWithProfile & {
  projectMembers: ProjectMember[];
};

export type ProjectMemberWithProfile = ProjectMember & {
  workspaceMember: MemberWithProfile & {
    department: Department | null;
  };
};

export type WokrspaceMemberWithData = Member & {
  profile: Profile;
} & { department: Department | null } & { projectMembers: ProjectMember[] };

export type DepartmentWithMembers = Department & {
  members: MemberWithProfile[];
};

export type DepartmentWithMembersWithProjects = Department & {
  members: MemberWithProfileWithProjects[];
};

export type ProjectComponentWithData = ProjectComponent & {
  component: Component;
} & { assemblyGroup: AssemblyGroup | null } & {
  assemblyProcess: AssemblyProcess | null;
} & { componentEvents: ComponentEvent[] };

export type ProjectWithComponents = Project & {
  projectComponents: ProjectComponentWithComponentWithAssemblyGroups[];
};

export type ProjectNetworkWithData = ProjectNetwork & {
  componentConnections: ComponentConnectionWithData[];
} & { assemblyGroup: AssemblyGroup | null };

export type ComponentConnectionWithData = ComponentConnection & {
  projectComponent: ProjectComponentWithData;
} & {
  projectNetwork: ProjectNetwork;
};

export type ComponentConnectionWithNetwork = ComponentConnection & {
  projectNetwork: ProjectNetwork;
};

export type ComponentEventWithData = ComponentEvent & {
  addressIO: AddressIO | null;
} & {
  projectComponent: ProjectComponentWithGroup;
};

export type ProjectComponentWithGroup = ProjectComponent & {
  assemblyGroup: AssemblyGroup | null;
};

//new types

export type ProjectComponentWithComponentWithAssemblyGroups =
  ProjectComponent & {
    component: Component;
  } & { assemblyGroup: AssemblyGroup | null } & {
    assemblyProcess: AssemblyProcess | null;
  };

export type ActionEnableTableData = ProjectComponent & {
  componentEvents: ComponentEventWithData[];
};

export type ComponentsEventsTableData = ProjectComponent & {
  componentEvents: ComponentEventWithData[];
};

export type SequenceStepWithEvents = SequenceStep & {
  componentsEvents: ComponentEvent[];
};

export type SequenceWithSteps = Sequence & {
  sequenceStep: SequenceStepWithEvents[];
};

export type ProjectIssueCommentWithData = ProjectIssueComment & {
  projectMember: ProjectMemberWithProfile;
};

export type WorkingHoursWithData = WorkingHours & {
  projectMember: ProjectMember;
} & {
  assemblyGroup: AssemblyGroup | null;
} & {
  process: AssemblyGroup | null;
} & {
  target: ProjectTarget | null;
} & {
  component: ProjectComponent | null;
} & {
  sequence: Sequence | null;
};

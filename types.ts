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
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";

export type ProjectWithCustomer = Project & {
  customer: Customer;
};

export type ComponentCategoryWithComponents = ComponentCategory & {
  components: Component[];
};

export type AssemblyGroupWithProcesses = AssemblyGroup & {
  assemblyProcesses: AssemblyProcess[];
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
  projectComponents: ProjectComponentWithData[];
};

export type ProjectNetworkWithData = ProjectNetwork & {
  componentConnections: ComponentConnectionWithData[];
};

export type ComponentConnectionWithData = ComponentConnection & {
  projectComponent: ProjectComponentWithData;
} & {
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

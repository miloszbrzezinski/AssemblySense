import {
  AssemblyGroup,
  AssemblyProcess,
  Component,
  ComponentCategory,
  Customer,
  Department,
  Member,
  Profile,
  Project,
  ProjectMember,
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

// export type ProjectMemberWithProfile = ProjectMember & {
//   workSpaceMember: Member & { profile: Profile } & {
//     department?: Department;
//   };
// };

export type ProjectMemberWithProfile = ProjectMember & {
  workSpaceMember: MemberWithProfile & {
    department?: Department;
  };
};

export type WokrspaceMemberWithData = Member & {
  profile: Profile;
} & { department?: Department } & { ProjectMember: ProjectMember[] };

export type DepartmentWithMembers = Department & {
  members: MemberWithProfile[];
};

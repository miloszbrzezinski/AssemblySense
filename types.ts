import {
  AssemblyGroup,
  AssemblyProcess,
  Component,
  ComponentCategory,
  Customer,
  Member,
  Profile,
  Project,
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

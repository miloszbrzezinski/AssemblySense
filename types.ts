import {
  AssemblyGroup,
  AssemblyProcess,
  Component,
  ComponentCategory,
  Customer,
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

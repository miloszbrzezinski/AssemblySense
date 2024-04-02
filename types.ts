import { Customer, Project } from "@prisma/client";

export type ProjectWithCustomer = Project & {
  customer: Customer;
};

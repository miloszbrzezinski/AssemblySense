import * as z from "zod";
//import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateWorkspaceSchema = z.object({
  workspaceName: z.string().min(1, {
    message: "Name is required",
  }),
});

export const JoinWorkspaceSchema = z.object({
  invitationCode: z.string().min(1, {
    message: "Invitation code is required",
  }),
});

export const CreateCustomerSchema = z.object({
  customerName: z.string().min(1, {
    message: "Customer name is required",
  }),
  customerDescription: z.string(),
});

export const CreateProjectSchema = z.object({
  projectId: z.string().min(1, {
    message: "Project ID is required",
  }),
  projectName: z.string().min(1, {
    message: "Project name is required",
  }),
  projectCustomer: z.string().min(1, {
    message: "Project customer is required",
  }),
  customerDescription: z.string(),
});

export const CreateComponentSchema = z.object({
  componentName: z.string().min(1, {
    message: "Component name is required",
  }),
  componentManufacturer: z.string().min(1, {
    message: "Component manufacturer is required",
  }),
});

export const CreateAssemblyGroupSchema = z.object({
  assemblyGroupName: z.string().min(1, {
    message: "Assembly group name is required",
  }),
});

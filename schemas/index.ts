import { ProjectTargetType } from "@prisma/client";
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
    }
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
    }
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

export const EditProjectIdSchema = z.object({
  projectNo: z.string().min(1, {
    message: "Project ID is required",
  }),
});

export const EditProjectNameSchema = z.object({
  projectName: z.string().min(1, {
    message: "Project name is required",
  }),
});

export const EditProjectCustomerSchema = z.object({
  projectCustomer: z.string().min(1, {
    message: "Project customer is required",
  }),
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

export const CreateProcessSchema = z.object({
  processId: z.string().min(1, {
    message: "Project ID is required",
  }),
  processName: z.string().min(1, {
    message: "Project name is required",
  }),
});

export const CreateDepartmentSchema = z.object({
  departmentName: z.string().min(1, {
    message: "Department name is required",
  }),
});

export const CreateProjectTargetSchema = z.object({
  targetName: z.string().min(1, {
    message: "Target name is required",
  }),
  targetValue: z.string().min(1, {
    message: "Target value is required",
  }),
  targetDescription: z.string(),
  targetType: z.nativeEnum(ProjectTargetType),
});

export const ReportProjectIssueSchema = z.object({
  problemName: z.string().min(1, {
    message: "Problem name is required",
  }),
  problemDescription: z.string(),
});

export const SolveProjectIssueSchema = z.object({
  projectIssueSolution: z.string().min(1, {
    message: "Problem solution is required",
  }),
});

export const CreateProjectStageSchema = z.object({
  stageName: z.string().min(1, {
    message: "Stage name is required",
  }),
  stageStartDate: z.string().min(1, {
    message: "Stage start date is required",
  }),
  stageDeadline: z.string().min(1, {
    message: "Stage deadline is required",
  }),
  stageDescription: z.string(),
});

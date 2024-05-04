import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";
import {
  AssemblyGroup,
  ComponentCategory,
  Member,
  Project,
  ProjectTarget,
  Workspace,
} from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addWorkspace"
  | "inviteUser"
  | "removeWorkspaceMember"
  | "addAssemblyGroup"
  | "addProcess"
  | "removeProcess"
  | "removeSequence"
  | "addComponent"
  | "removeProjectComponent"
  | "addDepartment"
  | "addProjectMember"
  | "removeNetwork"
  | "commitChanges"
  | "addProjectTarget"
  | "removeProjectTarget"
  | "editProjectTarget";

interface ModalData {
  projectMembersWithProfile?: ProjectMemberWithProfile[];
  workspaceMembersWithData?: WokrspaceMemberWithData[];
  profileId?: string;
  workspaceId?: string;
  projectId?: string;
  projectComponentId?: string;
  projectNetworkId?: string;
  projectTargetId?: string;
  projectTarget?: ProjectTarget;
  groupId?: string;
  processId?: string;
  sequenceId?: string;
  workspace?: Workspace;
  workspaceMember?: Member;
  componentCategory?: ComponentCategory;
  assemblyGroup?: AssemblyGroup;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";
import {
  AddressIO,
  AssemblyGroup,
  AssemblyProcess,
  ComponentCategory,
  ComponentConnection,
  ComponentEvent,
  Member,
  Project,
  ProjectComponent,
  ProjectIssue,
  ProjectNetwork,
  ProjectTarget,
  Sequence,
  SequenceStep,
  Workspace,
} from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addWorkspace"
  | "inviteUser"
  | "removeWorkspaceMember"
  | "removeProject"
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
  | "editProjectTarget"
  | "reportProjectProblem"
  | "solveIssue"
  | "addProjectStage";

interface ModalData {
  projectMembersWithProfile?: ProjectMemberWithProfile[];
  workspaceMembersWithData?: WokrspaceMemberWithData[];
  profileId?: string;
  workspaceId?: string;
  projectId?: string;
  projectIssue?: ProjectIssue;
  projectComponentId?: string;
  projectComponent?: ProjectComponent;
  projectNetworkId?: string;
  projectNetwork?: ProjectNetwork;
  projectConnection?: ComponentConnection;
  projectTargetId?: string;
  projectTarget?: ProjectTarget;
  groupId?: string;
  processId?: string;
  sequenceId?: string;
  sequence?: Sequence;
  sequenceStep?: SequenceStep;
  componentEvent?: ComponentEvent;
  addressIO?: AddressIO;
  workspace?: Workspace;
  workspaceMember?: Member;
  componentCategory?: ComponentCategory;
  assemblyGroupId?: string;
  assemblyGroup?: AssemblyGroup;
  assemblyProcessId?: string;
  assemblyProcess?: AssemblyProcess;
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

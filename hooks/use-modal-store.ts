import {
  AssemblyGroup,
  ComponentCategory,
  Member,
  Project,
  Workspace,
} from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addWorkspace"
  | "inviteUser"
  | "removeWorkspaceMember"
  | "addAssemblyGroup"
  | "addProcess"
  | "addComponent"
  | "addDepartment";

interface ModalData {
  projectId?: string;
  profileId?: string;
  workspace?: Workspace;
  workspaceMember?: Member;
  componentCategory?: ComponentCategory;
  assemblyGroup?: AssemblyGroup;
  workspaceId?: string;
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

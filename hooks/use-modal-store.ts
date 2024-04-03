import { ComponentCategory, Project } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addWorkspace"
  | "addAssemblyGroup"
  | "addProcess"
  | "addComponent";

interface ModalData {
  projectId?: string;
  profileId?: string;
  componentCategory?: ComponentCategory;
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

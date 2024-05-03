"use client";

import { useEffect, useState } from "react";
import { AddComponentModal } from "../modals/add-component-modal";
import { AddProcessModal } from "../modals/add-process-modal";
import { InviteUsersModal } from "../modals/invite-modal";
import { AddDepartmentModal } from "../modals/add-department-modal";
import { RemoveSequenceModal } from "../modals/remove-sequence";
import { RemoveProcessModal } from "../modals/remove-process";
import { RemoveProjectComponentModal } from "../modals/remove-project-component";
import { RemoveNetowrkModal } from "../modals/remove-network";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddComponentModal />
      <AddProcessModal />
      <InviteUsersModal />
      <AddDepartmentModal />
      <RemoveSequenceModal />
      <RemoveProcessModal />
      <RemoveProjectComponentModal />
      <RemoveNetowrkModal />
    </>
  );
};

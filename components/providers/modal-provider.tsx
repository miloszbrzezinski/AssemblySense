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
import { CommitChangesModal } from "../modals/commit-changes";
import { AddProjectTargetModal } from "../modals/add-project-target-modal";
import { RemoveProjectTargetModal } from "../modals/remove-project-target-modal";
import { EditProjectTargetModal } from "../modals/edit-project-target-modal";
import { RemoveProjectModal } from "../modals/remove-project";
import { ReportProjectModal } from "../modals/report-project-problem-modal";
import { SolveIssueModal } from "../modals/solve-issue-modal";

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
      <CommitChangesModal />
      <AddProjectTargetModal />
      <RemoveProjectTargetModal />
      <EditProjectTargetModal />
      <RemoveProjectModal />
      <ReportProjectModal />
      <SolveIssueModal />
    </>
  );
};

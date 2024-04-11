"use client";
import {
  ComponentEventWithData,
  SequenceStepWithEvents,
  SequenceWithSteps,
} from "@/types";
import { StepItem } from "./step-item";
import { startTransition } from "react";
import { addSequenceStep } from "@/actions/process-sequence";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SequenceTitle } from "./sequence-title";

interface ProcessSequenceProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  sequence: SequenceWithSteps;
  componentEvents: ComponentEventWithData[];
}

export const ProcessSequence = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  sequence,
  componentEvents,
}: ProcessSequenceProps) => {
  const router = useRouter();

  const addStep = () => {
    startTransition(() => {
      addSequenceStep(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        sequence.id,
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="w-full flex flex-col bg-white border shadow-lg">
      <SequenceTitle
        profileId={profileId}
        workspaceId={workspaceId}
        projectId={projectId}
        groupId={groupId}
        processId={processId}
        sequence={sequence}
      />
      <div className="flex flex-col overflow-y-scroll  p-5  w-full">
        {sequence.sequenceStep.map((step, i) => (
          <StepItem
            key={step.id}
            index={i + 1}
            profileId={profileId}
            workspaceId={workspaceId}
            projectId={projectId}
            groupId={groupId}
            processId={processId}
            step={step}
            componentEvents={componentEvents}
          />
        ))}

        <div className="flex w-full space-x-5 items-center h-20">
          <div className="w-1/5 flex" />
          <div className="w-4/5 flex h-full">
            <button
              onClick={addStep}
              className="h-full w-2/6 border shadow-md font-light hover:bg-sky-900/20"
            >
              New Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

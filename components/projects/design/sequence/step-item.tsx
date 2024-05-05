import { Separator } from "@/components/ui/separator";
import { Circle, Flag, OctagonPause, StickyNote } from "lucide-react";
import { StepNote } from "./step-note-item";
import { StepActions } from "./step-actions-item";
import { StepSeparator } from "./step-separator";
import { NextStepConditionItem } from "./next-step-condition-item";
import { ComponentEventWithData, SequenceStepWithEvents } from "@/types";
import { group } from "console";
import { ComponentEvent } from "@prisma/client";
import { HintButton } from "@/components/ui/hint-button";
import { useModal } from "@/hooks/use-modal-store";

interface StepItemProps {
  index: number;
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  step: SequenceStepWithEvents;
  componentEvents: ComponentEvent[];
}

export const StepItem = ({
  index,
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
  componentEvents,
}: StepItemProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex space-x-5">
      <div className="flex w-1/5">
        <StepNote
          index={index}
          profileId={profileId}
          workspaceId={workspaceId}
          projectId={projectId}
          groupId={groupId}
          processId={processId}
          step={step}
        />
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex w-full justify-between">
          <StepActions
            index={index}
            profileId={profileId}
            workspaceId={workspaceId}
            projectId={projectId}
            groupId={groupId}
            processId={processId}
            step={step}
            componentEvents={componentEvents}
          />
          <HintButton
            onClick={() => {
              onOpen("reportProjectProblem", {
                profileId,
                workspaceId,
                projectId,
                sequenceStep: step,
              });
            }}
            description="Report problem"
          >
            <Flag strokeWidth={1} />
          </HintButton>
        </div>
        <div className="flex w-full h-48">
          <StepSeparator />
          <NextStepConditionItem
            profileId={profileId}
            workspaceId={workspaceId}
            projectId={projectId}
            groupId={groupId}
            processId={processId}
            step={step}
            componentEvents={componentEvents}
          />
        </div>
      </div>
    </div>
  );
};

import { Separator } from "@/components/ui/separator";
import { ComponentEventWithData, SequenceStepWithEvents } from "@/types";
import { Plus, Trash, X } from "lucide-react";
import { StepActionTitle } from "./step-action-title";
import { ComponentEvent, EventType } from "@prisma/client";
import { StepActionItem } from "./step-action-item";
import { ActionsPopover } from "./actions-popover";

interface StepActionsProps {
  index: number;
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  step: SequenceStepWithEvents;
  componentEvents: ComponentEvent[];
}

export const StepActions = ({
  index,
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
  componentEvents,
}: StepActionsProps) => {
  const actions = componentEvents.filter(
    (event) => event.eventType === EventType.ACTION,
  );

  return (
    <div className="flex w-2/6 min-h-48  transition-all">
      <div className="flex w-full flex-col border border-stone-400 bg-stone-50 shadow-md">
        <StepActionTitle
          index={index}
          profileId={profileId}
          workspaceId={workspaceId}
          projectId={projectId}
          groupId={groupId}
          processId={processId}
          step={step}
        />
        <Separator className="bg-stone-400" />
        <div className="flex flex-col space-y-[1px] w-full bg-stone-300">
          {step.componentsEvents.map((event) => (
            <StepActionItem
              key={event.id}
              profileId={profileId}
              workspaceId={workspaceId}
              projectId={projectId}
              groupId={groupId}
              processId={processId}
              step={step}
              componentEvent={event}
            />
          ))}
          <ActionsPopover
            profileId={profileId}
            workspaceId={workspaceId}
            projectId={projectId}
            groupId={groupId}
            processId={processId}
            step={step}
            componentEvents={actions}
          />
        </div>
      </div>
    </div>
  );
};

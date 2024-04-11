import { ComponentEventWithData, SequenceStepWithEvents } from "@/types";
import { ComponentEvent, EventType } from "@prisma/client";
import { EnableFormulaPopover } from "./enable-formula-popover";

interface NextStepConditionItemProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  processId: string;
  groupId: string;
  step: SequenceStepWithEvents;
  componentEvents: ComponentEvent[];
}

export const NextStepConditionItem = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
  componentEvents,
}: NextStepConditionItemProps) => {
  const statuses = componentEvents.filter(
    (event) => event.eventType === EventType.STATUS,
  );

  return (
    <div className="flex items-center w-4/6 h-48">
      <div className="text-base h-10 w-full flex items-center justify-start border border-sky-500 bg-white shadow-md hover:bg-slate-200">
        <EnableFormulaPopover
          profileId={profileId}
          workspaceId={workspaceId}
          projectId={projectId}
          groupId={groupId}
          processId={processId}
          step={step}
          componentStatuses={statuses}
        />
      </div>
    </div>
  );
};

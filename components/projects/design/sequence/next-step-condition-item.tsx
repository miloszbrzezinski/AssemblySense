import { ComponentEventWithData, SequenceStepWithEvents } from "@/types";

interface NextStepConditionItemProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  processId: string;
  step: SequenceStepWithEvents;
  componentEvents: ComponentEventWithData[];
}

export const NextStepConditionItem = ({
  profileId,
  workspaceId,
  projectId,
  processId,
  step,
  componentEvents,
}: NextStepConditionItemProps) => {
  return (
    <div className="flex items-center w-4/6 h-48">
      <div className="text-base h-10 w-full flex items-center justify-start border border-sky-500 bg-white shadow-md hover:bg-slate-200"></div>
    </div>
  );
};

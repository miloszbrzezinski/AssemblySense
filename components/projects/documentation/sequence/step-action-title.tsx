import { SequenceStepWithEvents } from "@/types";

interface StepActionProps {
  index: number;
  step: SequenceStepWithEvents;
}

export const StepActionTitleDocs = ({ index, step }: StepActionProps) => {
  return (
    <div className="group flex w-full h-8 items-center justify-between pl-2 bg-white dark:bg-neutral-950">
      <div className="flex w-full space-x-1">
        <p className="whitespace-nowrap">
          Step {index}: {step.name}
        </p>
      </div>
    </div>
  );
};

import { Separator } from "@/components/ui/separator";
import { SequenceStepWithEvents } from "@/types";
import { StepActionTitleDocs } from "./step-action-title";
import { StepActionItemDocs } from "./step-action-item";

interface StepActionsProps {
  index: number;
  step: SequenceStepWithEvents;
}

export const StepActionsDocs = ({ index, step }: StepActionsProps) => {
  return (
    <div className="flex w-2/6 min-h-48  transition-all">
      <div className="flex w-full flex-col border border-stone-400 dark:border-white bg-stone-50 dark:bg-neutral-900 shadow-md">
        <StepActionTitleDocs index={index} step={step} />
        <Separator className="bg-stone-400" />
        <div className="flex flex-col space-y-[1px] w-full bg-stone-300 dark:bg-neutral-400">
          {step.componentsEvents.map((event) => (
            <StepActionItemDocs
              key={event.id}
              step={step}
              componentEvent={event}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

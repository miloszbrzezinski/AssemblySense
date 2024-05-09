import { SequenceStepWithEvents } from "@/types";
import { StepNoteDocs } from "./step-note-item";
import { StepSeparatorDocs } from "./step-separator";
import { NextStepConditionItemDocs } from "./next-step-condition-item";
import { StepActionItemDocs } from "./step-action-item";
import { StepActionsDocs } from "./step-actions-item";

interface StepItemProps {
  index: number;
  step: SequenceStepWithEvents;
}

export const StepItemDocs = ({ index, step }: StepItemProps) => {
  return (
    <div className="flex space-x-5">
      <div className="flex w-1/5">
        <StepNoteDocs index={index} step={step} />
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex w-full justify-between">
          <StepActionsDocs index={index} step={step} />
        </div>
        <div className="flex w-full h-48">
          <StepSeparatorDocs />
          <NextStepConditionItemDocs step={step} />
        </div>
      </div>
    </div>
  );
};

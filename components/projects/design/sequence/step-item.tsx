import { Separator } from "@/components/ui/separator";
import { Circle, OctagonPause, StickyNote } from "lucide-react";
import { StepNote } from "./step-note-item";
import { StepActions } from "./step-actions-item";
import { StepSeparator } from "./step-separator";
import { NextStepConditionItem } from "./next-step-condition-item";

export const StepItem = () => {
  return (
    <div className="flex space-x-5">
      <div className="flex w-1/5">
        <StepNote />
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex w-full h-48">
          <StepActions />
        </div>
        <div className="flex w-full h-48">
          <StepSeparator />
          <NextStepConditionItem />
        </div>
      </div>
    </div>
  );
};

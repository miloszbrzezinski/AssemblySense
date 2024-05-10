import { SequenceStepWithEvents } from "@/types";
import { StickyNote } from "lucide-react";

interface StepNoteProps {
  index: number;
  step: SequenceStepWithEvents;
}

export const StepNoteDocs = ({ index, step }: StepNoteProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex border border-stone-600 h-min p-1 items-center space-x-1 justify-start">
        <StickyNote strokeWidth={1} className="text-stone-600" />
        <p className="font-extralight text-stone-600">Step {index} Note</p>
      </div>
      <p className="flex w-full resize-none min-h-80 max-h-80 border border-stone-600 p-1 focus:outline-none focus:rounded-none dark:bg-neutral-900 dark:focus:bg-slate-900 text-stone-600">
        {step.description}
      </p>
    </div>
  );
};

"use client";
import { SequenceWithSteps } from "@/types";
import { StepItemDocs } from "./step-item";

interface ProcessSequenceProps {
  sequence: SequenceWithSteps;
}

export const ProcessSequenceDocs = ({ sequence }: ProcessSequenceProps) => {
  return (
    <div className="flex flex-col overflow-y-scroll  p-5  w-full">
      {sequence.sequenceStep.map((step, i) => (
        <StepItemDocs key={step.id} index={i + 1} step={step} />
      ))}
      <div className="flex w-full space-x-5 items-center h-20">
        <div className="w-1/5 flex" />
        <div className="w-4/5 flex h-full">
          <div className="h-full w-2/6  font-light  items-start flex justify-center">
            <div className="w-20 h-20 rounded-full border flex items-center justify-center border-stone-400">
              <p>End</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

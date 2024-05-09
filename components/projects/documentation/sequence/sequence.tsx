"use client";
import {
  ComponentEventWithData,
  SequenceStepWithEvents,
  SequenceWithSteps,
} from "@/types";
import { startTransition } from "react";
import { addSequenceStep } from "@/actions/process-sequence";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ComponentEvent } from "@prisma/client";
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
    </div>
  );
};

import { setSequenceStepNote } from "@/actions/process-sequence";
import { SequenceStepWithEvents } from "@/types";
import { StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface StepNoteProps {
  index: number;
  step: SequenceStepWithEvents;
}

export const StepNoteDocs = ({ index, step }: StepNoteProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex border h-min p-1 items-center space-x-1 justify-start">
        <StickyNote strokeWidth={1} className="text-stone-300" />
        <p className="font-extralight text-stone-300">Step {index} Note</p>
      </div>
      <p className="flex w-full resize-none min-h-80 max-h-80 border p-1 focus:outline-none focus:rounded-none dark:bg-neutral-900 dark:focus:bg-slate-900 focus:bg-slate-200 focus:text-slate-500 text-stone-400/80">
        {step.description}
      </p>
    </div>
  );
};

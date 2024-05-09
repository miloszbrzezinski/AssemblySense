import {
  addSequenceStepAction,
  removeSequenceStepAction,
} from "@/actions/process-sequence";
import { SequenceStepWithEvents } from "@/types";
import { ComponentEvent } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

interface StepActionItemProps {
  step: SequenceStepWithEvents;
  componentEvent: ComponentEvent;
}

export const StepActionItemDocs = ({
  step,
  componentEvent,
}: StepActionItemProps) => {
  return (
    <div className="flex w-full h-8 bg-stone-50 dark:bg-neutral-900 pl-2 items-center justify-between font-light group">
      <p>{componentEvent.name}</p>
    </div>
  );
};

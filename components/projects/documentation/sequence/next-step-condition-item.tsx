import { cn } from "@/lib/utils";
import { ComponentEventWithData, SequenceStepWithEvents } from "@/types";
import { ComponentEvent, EventType } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { EnableFormula } from "../../design/action-enables/table/enable-formula";

interface NextStepConditionItemProps {
  step: SequenceStepWithEvents;
}

export const NextStepConditionItemDocs = ({
  step,
}: NextStepConditionItemProps) => {
  return (
    <div className="flex items-center w-4/6 h-48">
      <div className="text-base h-10 w-full flex items-center justify-start border border-sky-500 bg-white dark:bg-neutral-950 shadow-md hover:bg-slate-200">
        <AlertTriangle
          strokeWidth={1}
          className={cn("ml-4", step.stepNextReqFormula.length > 2 && "hidden")}
        />
        <h3 className="text-sm font-light pl-2">
          {step.stepNextReqFormula.length > 1 ? (
            <EnableFormula formula={step.stepNextReqFormula} />
          ) : (
            "No condition"
          )}
        </h3>
      </div>
    </div>
  );
};

import { SequenceStepWithEvents } from "@/types";
import { EnableFormula } from "../../design/action-enables/table/enable-formula";

interface NextStepConditionItemProps {
  step: SequenceStepWithEvents;
}

export const NextStepConditionItemDocs = ({
  step,
}: NextStepConditionItemProps) => {
  return (
    <div className="flex items-center w-4/6 h-48">
      <div className="text-base h-10 w-full flex items-center justify-start border border-sky-500 bg-white dark:bg-neutral-950 shadow-md">
        <h3 className="text-sm font-light pl-2">
          {step.stepNextReqFormula.length > 1 ? (
            <EnableFormula
              formula={step.stepNextReqFormula}
              type="transparent"
            />
          ) : (
            "No condition"
          )}
        </h3>
      </div>
    </div>
  );
};

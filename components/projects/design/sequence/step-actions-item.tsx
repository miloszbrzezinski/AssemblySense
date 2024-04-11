import { Separator } from "@/components/ui/separator";
import { ComponentEventWithData, SequenceStepWithEvents } from "@/types";
import { Plus, Trash, X } from "lucide-react";

interface StepActionsProps {
  index: number;
  profileId: string;
  workspaceId: string;
  projectId: string;
  processId: string;
  step: SequenceStepWithEvents;
  componentEvents: ComponentEventWithData[];
}

export const StepActions = ({
  index,
  profileId,
  workspaceId,
  projectId,
  processId,
  step,
  componentEvents,
}: StepActionsProps) => {
  return (
    <div className="flex w-2/6 min-h-48  transition-all">
      <div className="flex w-full flex-col border border-stone-400 bg-white shadow-md">
        <div className="group flex w-full h-8 items-center justify-between pl-2">
          <p>
            Step {index}: <span className="font-light">{step.name}</span>
          </p>
          <button className="hover:bg-red-500/30 text-red-900 h-8 w-8 items-center justify-center group-hover:flex hidden">
            <Trash strokeWidth={1} />
          </button>
        </div>
        <Separator className="bg-stone-400" />
        <div className="flex flex-col space-y-[1px] w-full bg-stone-300">
          <div className="flex w-full h-8 bg-white pl-2 items-center justify-between font-light group">
            <p>Z2000 to Home</p>
            <button className="hover:bg-red-500/30 text-red-900 h-8 w-8 items-center justify-center group-hover:flex hidden">
              <X strokeWidth={1} />
            </button>
          </div>
          <button className="flex bg-white hover:bg-stone-100 w-full items-center justify-start pl-2 h-8 font-light">
            <Plus strokeWidth={1} />
            <span>New action</span>
          </button>
        </div>
      </div>
    </div>
  );
};

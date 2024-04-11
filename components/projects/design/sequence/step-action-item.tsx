import { SequenceStepWithEvents } from "@/types";
import { ComponentEvent } from "@prisma/client";
import { X } from "lucide-react";

interface StepActionItemProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  step: SequenceStepWithEvents;
  componentEvent: ComponentEvent;
}

export const StepActionItem = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
  componentEvent,
}: StepActionItemProps) => {
  return (
    <div className="flex w-full h-8 bg-stone-50 pl-2 items-center justify-between font-light group">
      <p>{componentEvent.name}</p>
      <button className="hover:bg-red-500/30 text-red-900 h-8 w-8 items-center justify-center group-hover:flex hidden">
        <X strokeWidth={1} />
      </button>
    </div>
  );
};

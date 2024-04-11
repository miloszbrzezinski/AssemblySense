import { SequenceStepWithEvents } from "@/types";
import { StickyNote } from "lucide-react";

interface StepNoteProps {
  index: number;
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  step: SequenceStepWithEvents;
}

export const StepNote = ({
  index,
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
}: StepNoteProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex border h-min p-1 items-center space-x-1 justify-start">
        <StickyNote strokeWidth={1} className="text-stone-300" />
        <p className="font-extralight text-stone-300">Step {index} Note</p>
      </div>
      <textarea className="flex w-full resize-none min-h-80 max-h-80 border p-1 focus:outline-none focus:rounded-none focus:bg-slate-200 focus:text-slate-500 text-stone-400" />
    </div>
  );
};

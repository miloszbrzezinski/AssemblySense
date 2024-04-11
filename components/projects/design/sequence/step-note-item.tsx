import { setSequenceStepNote } from "@/actions/process-sequence";
import { SequenceStepWithEvents } from "@/types";
import { StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

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
  const router = useRouter();
  const [note, setNote] = useState("");

  useEffect(() => {
    if (step.description) {
      setNote(step.description);
    }
  }, [step.description]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      saveNote();
    }
    if (event.key === "Escape") {
      if (step.description) {
        setNote(step.description);
      }
    }
  };

  const saveNote = () => {
    startTransition(() => {
      setSequenceStepNote(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        step.sequencepId,
        step.id,
        note,
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex border h-min p-1 items-center space-x-1 justify-start">
        <StickyNote strokeWidth={1} className="text-stone-300" />
        <p className="font-extralight text-stone-300">Step {index} Note</p>
      </div>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={saveNote}
        className="flex w-full resize-none min-h-80 max-h-80 border p-1 focus:outline-none focus:rounded-none dark:bg-neutral-900 dark:focus:bg-slate-900 focus:bg-slate-200 focus:text-slate-500 text-stone-400/80"
      />
    </div>
  );
};

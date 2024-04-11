import {
  rmoveSequenceStep,
  setSequenceStepName,
} from "@/actions/process-sequence";
import { SequenceStepWithEvents } from "@/types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface StepActionProps {
  index: number;
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  step: SequenceStepWithEvents;
}

export const StepActionTitle = ({
  index,
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
}: StepActionProps) => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    if (step.name) {
      setName(step.name);
    }
  }, [step.name]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveName();
    }
    if (event.key === "Escape") {
      if (step.name) {
        setName(step.name);
      }
    }
  };

  const saveName = () => {
    startTransition(() => {
      setSequenceStepName(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        step.sequencepId,
        step.id,
        name,
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

  const onDelete = () => {
    startTransition(() => {
      rmoveSequenceStep(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        step.sequencepId,
        step.id,
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
    <div className="group flex w-full h-8 items-center justify-between pl-2 bg-white dark:bg-neutral-950">
      <div className="flex w-full space-x-1">
        <p className="whitespace-nowrap">Step {index}:</p>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={saveName}
          className="group-hover:bg-slate-100 dark:group-hover:bg-neutral-900 dark:bg-neutral-950 w-full text-sm font-light focus:outline-none focus:bg-slate-200 dark:focus:bg-slate-900 focus:rounded-none pl-2"
        />
      </div>
      <button
        onClick={onDelete}
        className="hover:bg-red-500/30 text-red-900 h-8 w-8 items-center justify-center group-hover:flex hidden"
      >
        <Trash strokeWidth={1} />
      </button>
    </div>
  );
};

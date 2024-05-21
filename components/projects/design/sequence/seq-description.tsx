import { setProcessSequenceDescription } from "@/actions/process-sequence";
import { SequenceWithSteps } from "@/types";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface SequenceDescriptionProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  sequence: SequenceWithSteps;
}

export const SequenceDescription = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  sequence,
}: SequenceDescriptionProps) => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (sequence.description) {
      setDescription(sequence.description);
    }
  }, [sequence.description]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      saveDescription();
    }
    if (event.key === "Escape") {
      if (sequence.description) {
        setDescription(sequence.description);
      }
    }
  };

  const saveDescription = () => {
    startTransition(() => {
      setProcessSequenceDescription(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        sequence.id,
        description
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
    <textarea
      value={description}
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      onBlur={saveDescription}
      className="p-2 pl-1 text-lg font-extralight flex w-full resize-none focus:outline-none focus:rounded-none dark:bg-neutral-950 focus:bg-slate-200 focus:text-slate-500 text-stone-400/80"
    />
  );
};

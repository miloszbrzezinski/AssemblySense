import { setProcessSequenceName } from "@/actions/process-sequence";
import { SequenceWithSteps } from "@/types";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";
import { SequenceDescription } from "./seq-description";
import { Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface SequenceTitleProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  sequence: SequenceWithSteps;
}

export const SequenceTitle = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  sequence,
}: SequenceTitleProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { onOpen } = useModal();

  useEffect(() => {
    if (sequence.name) {
      setName(sequence.name);
    }
  }, [sequence.name]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveName();
    }
    if (event.key === "Escape") {
      if (sequence.name) {
        setName(sequence.name);
      }
    }
  };

  const saveName = () => {
    startTransition(() => {
      setProcessSequenceName(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        sequence.id,
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
    onOpen("removeSequence", {
      profileId,
      workspaceId,
      projectId,
      groupId,
      processId,
      sequenceId: sequence.id,
    });
  };

  return (
    <>
      <div className="flex w-full border-b group h-10">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={saveName}
          className="group-hover:bg-slate-100 w-full text-lg font-medium focus:outline-none focus:bg-slate-200 focus:rounded-none p-2"
        />
        <button
          onClick={onDelete}
          className="hover:bg-red-500/30 text-red-900 h-10 w-10 items-center justify-center group-hover:flex hidden"
        >
          <Trash strokeWidth={1} />
        </button>
      </div>
      <div className="flex w-full border-b ">
        <p className="p-2 text-lg font-light">Description</p>
        <SequenceDescription
          profileId={profileId}
          workspaceId={workspaceId}
          projectId={projectId}
          groupId={groupId}
          processId={processId}
          sequence={sequence}
        />
      </div>
    </>
  );
};

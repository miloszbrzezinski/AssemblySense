"use client";
import { setProcessDescription } from "@/actions/assembly-group";
import { setProcessSequenceDescription } from "@/actions/process-sequence";
import { SequenceWithSteps } from "@/types";
import { AssemblyProcess } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ProcessDescriptionProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  process: AssemblyProcess;
}

export const ProcessDescription = ({
  profileId,
  workspaceId,
  projectId,
  process,
}: ProcessDescriptionProps) => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (process.description) {
      setDescription(process.description);
    }
  }, [process.description]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      saveDescription();
    }
    if (event.key === "Escape") {
      if (process.description) {
        setDescription(process.description);
      }
    }
  };

  const saveDescription = () => {
    startTransition(() => {
      setProcessDescription(
        profileId,
        workspaceId,
        projectId,
        process.assemblyGroupId,
        process.id,
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
      className="p-2 pl-1 text-lg font-extralight flex w-full h-full resize-none focus:outline-none focus:rounded-none dark:bg-neutral-900 focus:bg-slate-200 focus:text-slate-500 text-stone-400/80"
    />
  );
};

"use client";

import { setProcessName, setProcessNo } from "@/actions/assembly-group";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { AssemblyProcess } from "@prisma/client";
import { Flag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface TitleBarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  process: AssemblyProcess;
}

export const TitleBar = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  process,
}: TitleBarProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const [processNo, setProcessNoState] = useState("");
  const [processName, setProcessNameState] = useState("");
  const [idEditing, setIdEditing] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);

  useEffect(() => {
    if (process.processId) {
      setProcessNoState(process.processId);
    }
    if (process.name) {
      setProcessNameState(process.name);
    }
  }, [process.name, process.processId]);

  const handleKeyDownNO = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveNo();
    }
    if (event.key === "Escape") {
      if (process.processId) {
        setProcessNoState(process.processId);
        setIdEditing(false);
      }
    }
  };

  const handleKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveName();
    }
    if (event.key === "Escape") {
      if (process.name) {
        setProcessNameState(process.name);
        setNameEditing(false);
      }
    }
  };

  const saveNo = () => {
    startTransition(() => {
      setProcessNo(
        profileId,
        workspaceId,
        projectId,
        groupId,
        process.id,
        processNo
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          setIdEditing(false);
          router.refresh();
        }
      });
    });
  };

  const saveName = () => {
    startTransition(() => {
      setProcessName(
        profileId,
        workspaceId,
        projectId,
        groupId,
        process.id,
        processName
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          setNameEditing(false);
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex space-x-3">
        {idEditing ? (
          <input
            value={processNo}
            onChange={(e) => {
              setProcessNoState(e.target.value);
            }}
            onKeyDown={handleKeyDownNO}
            onBlur={saveNo}
            className="group-hover:bg-slate-100 dark:group-hover:bg-neutral-900 dark:bg-neutral-950 bg-slate-200 text-4xl font-light max-w-40 focus:outline-none focus:bg-slate-300 dark:focus:bg-slate-900 focus:rounded-none pl-2"
          />
        ) : (
          <h3
            onClick={() => setIdEditing(true)}
            className="text-4xl font-light"
          >
            {processNo}
          </h3>
        )}
        {nameEditing ? (
          <input
            value={processName}
            onChange={(e) => {
              setProcessNameState(e.target.value);
            }}
            onKeyDown={handleKeyDownName}
            onBlur={saveName}
            className="group-hover:bg-slate-100 dark:group-hover:bg-neutral-900 dark:bg-neutral-950 bg-slate-200 text-4xl font-extralight focus:outline-none focus:bg-slate-300 dark:focus:bg-slate-900 focus:rounded-none pl-2"
          />
        ) : (
          <h3
            onClick={() => setNameEditing(true)}
            className="text-4xl font-extralight"
          >
            {processName}
          </h3>
        )}
      </div>
      <div className="flex items-center h-full">
        <Button
          onClick={() => {
            onOpen("reportProjectProblem", {
              profileId,
              workspaceId,
              projectId,
              groupId,
              assemblyProcess: process,
              assemblyGroupId: groupId,
              assemblyProcessId: process.id,
            });
          }}
          variant="ghost"
          className="hover:bg-stone-300 hover:text-stone-900"
        >
          <Flag strokeWidth={1} />
        </Button>
        <Button
          onClick={() => {
            onOpen("removeProcess", {
              profileId,
              workspaceId,
              projectId,
              groupId,
              processId: process.id,
            });
          }}
          variant="ghost"
          className="hover:bg-red-900 hover:text-red-200"
        >
          <Trash strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

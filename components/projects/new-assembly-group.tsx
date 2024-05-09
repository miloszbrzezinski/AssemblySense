"use client";

import { createAssemblyGroup } from "@/actions/assembly-group";
import { createComponentCategory } from "@/actions/library";
import { Folder } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface NewAssemblyGroupProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  hide: () => void; // Function to hide the child component
}

export const NewAssemblyGroup = ({
  profileId,
  workspaceId,
  projectId,
  hide,
}: NewAssemblyGroupProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newAssemblyGroupName, setNewAssemblyGroupName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        createAssemblyGroup(
          profileId,
          workspaceId,
          projectId,
          newAssemblyGroupName
        ).then((data) => {
          // setError(data.error);
          if (data) {
            toast(data.success, {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
            hide();
          }
        });
      });
    }
    if (event.key === "Escape") {
      hide();
    }
  };

  return (
    <div className="justify-start items-center space-x-1 flex px-2 bg-slate-200 py-1">
      <Folder strokeWidth={1} className="w-5 h-5" />
      <input
        ref={inputRef}
        type="text"
        value={newAssemblyGroupName}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setNewAssemblyGroupName(e.target.value);
        }}
        className="h-min w-full text-md px-2"
        onBlur={() => {
          newAssemblyGroupName.length === 0 && hide();
        }}
      />
    </div>
  );
};

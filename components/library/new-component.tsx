"use client";

import { createComponentCategory } from "@/actions/library";
import { File, Folder } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

interface NewCatalogProps {
  profileId: string;
  workspaceId: string;
  hide: () => void; // Function to hide the child component
}

export const NewComponent = ({
  profileId,
  workspaceId,
  hide,
}: NewCatalogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newComponentName, setNewComponentName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        createComponentCategory(profileId, workspaceId, newComponentName).then(
          (data) => {
            // setError(data.error);
            if (data.success) {
              hide();
              router.refresh();
            }
          },
        );
      });
    }
    if (event.key === "Escape") {
      hide();
    }
  };

  return (
    <div className="justify-start items-center space-x-1 flex px-2 bg-slate-200 py-1">
      <File strokeWidth={1} className="w-5 h-5" />
      <input
        ref={inputRef}
        type="text"
        value={newComponentName}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setNewComponentName(e.target.value);
        }}
        className="h-min w-full text-md px-2"
        onBlur={() => {
          newComponentName.length === 0 && hide();
        }}
      />
    </div>
  );
};

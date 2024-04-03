"use client";

import { createComponentCategory } from "@/actions/library";
import { Folder } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

interface NewCatalogProps {
  profileId: string;
  workspaceId: string;
  hide: () => void; // Function to hide the child component
}

export const NewCategory = ({
  profileId,
  workspaceId,
  hide,
}: NewCatalogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        createComponentCategory(profileId, workspaceId, newCategoryName).then(
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
      <Folder strokeWidth={1} className="w-5 h-5" />
      <input
        ref={inputRef}
        type="text"
        value={newCategoryName}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setNewCategoryName(e.target.value);
        }}
        className="h-min w-full text-md px-2"
        onBlur={() => {
          newCategoryName.length === 0 && hide();
        }}
      />
    </div>
  );
};

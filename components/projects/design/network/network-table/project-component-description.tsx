"use client";
import {
  setProjectComponentDescription,
  setProjectComponentsName,
} from "@/actions/project-components";
import { ProjectComponentWithData } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectComponentDescriptionProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentDescription = ({
  profileId,
  workspaceId,
  projectComponent,
}: ProjectComponentDescriptionProps) => {
  const [componentDescription, setComponentDescription] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentDescription(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    if (projectComponent.description) {
      setComponentDescription(projectComponent.description);
    }
  }, [projectComponent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setProjectComponentDescription(
          profileId,
          workspaceId,
          projectComponent,
          componentDescription,
          projectComponent.projectId,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `New comment: ${componentDescription}`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        });
      });
    }
    if (event.key === "Escape") {
      if (projectComponent.description) {
        setComponentDescription(projectComponent.description);
      }
    }
  };

  return (
    <input
      onChange={handleInput}
      value={componentDescription}
      onKeyDown={handleKeyDown}
      className="group-hover:bg-slate-100 w-full h-10 text-sm font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
    />
  );
};

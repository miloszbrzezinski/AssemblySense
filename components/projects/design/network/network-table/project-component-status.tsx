"use client";
import {
  setProjectComponentDescription,
  setProjectComponentsName,
  setProjectComponentStatus,
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

export const ProjectComponentStatus = ({
  profileId,
  workspaceId,
  projectComponent,
}: ProjectComponentDescriptionProps) => {
  const [componentStatus, setComponentStatus] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentStatus(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    if (projectComponent.status) {
      setComponentStatus(projectComponent.status);
    }
  }, [projectComponent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setProjectComponentStatus(
          profileId,
          workspaceId,
          projectComponent,
          componentStatus,
          projectComponent.projectId,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `New status: ${componentStatus}`,
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
      if (projectComponent.status) {
        setComponentStatus(projectComponent.status);
      }
    }
  };

  return (
    <input
      onChange={handleInput}
      value={componentStatus}
      onKeyDown={handleKeyDown}
      className="group-hover:bg-slate-100 w-full h-10 text-sm font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
    />
  );
};

"use client";
import { setProjectComponentsName } from "@/actions/project-components";
import { ProjectComponentWithData } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectComponentNameProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentName = ({
  profileId,
  workspaceId,
  projectComponent,
}: ProjectComponentNameProps) => {
  const [componentName, setComponentName] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentName(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    setComponentName(projectComponent.name);
  }, [projectComponent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setProjectComponentsName(
          profileId,
          workspaceId,
          projectComponent,
          componentName,
          projectComponent.projectId,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `New name: ${componentName}`,
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
      setComponentName(projectComponent.name);
    }
  };

  return (
    <input
      onChange={handleInput}
      value={componentName}
      onKeyDown={handleKeyDown}
      className="group-hover:bg-slate-100 w-full h-10 text-sm font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
    />
  );
};
